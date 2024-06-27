const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");

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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const query = await User.findOne({ email: email });

  if (!query) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "User not found", false));
  }

  const passwordValidCheck = await bcrypt.compare(password, query.password);

  if (!passwordValidCheck) {
    return res
      .status(406)
      .json(new ApiResponse(406, null, "Invalid Credentials", false));
  }
  if (passwordValidCheck) {
    return res.status(200).json(new ApiResponse(200, query, "User Logged in"));
  }
});

module.exports = {
  registerUser,
  loginUser,
};
