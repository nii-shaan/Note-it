const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");
const { generateAccessToken } = require("../controllers/user.controller.js");

const verifyJWT = asyncHandler(async (req, res, next) => {
  // console.log("JWT middleware test")
  try {
    console.log(" RECEIVED on verifyJWT Middleware");
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization"?.replace("Bearer", ""));

    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Tokens not provided", false, false));
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.AUTH_ACCESS_TOKEN_SECRET_KEY
    );

    const user = await User.findById(decodedToken.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid access token", false, false));
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

      if (!incommingRefreshToken) {
        return res
          .status(401)
          .json(
            new ApiResponse(
              401,
              null,
              "Refresh token is not provided",
              false,
              false
            )
          );
      }

      try {
        const decodedRefreshToken = await jwt.verify(
          incommingRefreshToken,
          process.env.AUTH_REFRESH_TOKEN_SECRET_KEY
        );

        const user = await User.findById(decodedRefreshToken.id);

        if (!user) {
          return res
            .status(400)
            .json(
              new ApiResponse(400, null, "Invalid refresh token", false, false)
            );
        }
        if (incommingRefreshToken !== user?.refreshToken) {
          return res
            .status(401)
            .json(
              new ApiResponse(
                401,
                null,
                "Refresh token is expired or used",
                false,
                false
              )
            );
        }

        const options = {
          httpOnly: true,
          secure: false,
        };

        const newAccessToken = await generateAccessToken(user._id);
        console.log(newAccessToken);

        res
          .status(200)
          .cookie("accessToken", newAccessToken, options)
          .json(
            new ApiResponse(
              200,
              { newAccessToken: newAccessToken },
              "Access token refreshed",
              false,
              false
            )
          );
        next();
      } catch (refreshErr) {
        if (refreshErr.message === "jwt expired") {
          return res
            .status(400)
            .clearCookie("accessToken", {
              path: "/",
              httpOnly: true,
              secure: false,
            })
            .clearCookie("refreshToken", {
              path: "/",
              httpOnly: true,
              secure: false,
            })
            .json(
              new ApiResponse(
                403,
                null,
                "Refresh token is expired",
                false,
                false
              )
            );
        }
        return res
          .status(400)
          .json(new ApiResponse(403, null, refreshErr.message, false, false));
      }
    }
  }
});

module.exports = verifyJWT;
