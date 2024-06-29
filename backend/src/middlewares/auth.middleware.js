const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const verifyJWT = asyncHandler((req, res, next) => {
  // console.log("JWT middleware test")
  try {
      
      console.log("REQUEST RECEIVED");
   console.log(req.cookies)   



    next();
  } catch (err) {
    return res
      .status(401)
      .json(
        new ApiResponse(500, err.message, "Failed to verify tokens", false)
      );
  }
});

module.exports = verifyJWT;
