const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const jwtVerifier = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "User verified", true));
});
module.exports = jwtVerifier;
