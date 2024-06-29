const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");

const verifyJWT = asyncHandler(async (req, res, next) => {
  // console.log("JWT middleware test")
  try {
    console.log(" RECEIVED on verifyJWT Middleware");

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization"?.replace("Bearer", ""));

    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Tokens not provided", false));
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
        .json(new ApiResponse(400, null, "Invalid access token", false));
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json(
        new ApiResponse(500, null, err.message || "Invalid access token", false)
      );
  }
});

module.exports = verifyJWT;
