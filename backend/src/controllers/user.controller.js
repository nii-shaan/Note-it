const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const User = require("../model/user.model.js");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  if (username.trim() === "") {
    throw new ApiError(300, "Username is missing");
  }
  if (email.trim() === "") {
    throw new ApiError(300, "Email address is missing");
  }
  if (password.trim() === "") {
    throw new ApiError(300, "Password is missing");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User created Sucessfully"));
});

module.exports = {
  registerUser,
};
