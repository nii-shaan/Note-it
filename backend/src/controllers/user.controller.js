const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = async (userId) => {
	const user = await User.findById(userId);

	return await jwt.sign(
		{ id: user._id, username: user.username, email: user.email },
		process.env.AUTH_ACCESS_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY,
		}
	);
};

const generateRefreshToken = async (userId) => {
	const user = await User.findById(userId);
	return await jwt.sign(
		{ id: user._id },
		process.env.AUTH_REFRESH_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY,
		}
	);
};

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
		.json(new ApiResponse(200, user, "User created Sucessfully", true, false));
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const query = await User.findOne({ email: email });

	if (!query) {
		return res
			.status(404)
			.json(new ApiResponse(404, null, "User not found", false, false));
	}

	const passwordValidCheck = await bcrypt.compare(password, query.password);

	if (!passwordValidCheck) {
		return res
			.status(406)
			.json(new ApiResponse(406, null, "Invalid Credentials", false, false));
	}

	const accessToken = await generateAccessToken(query._id);
	const refreshToken = await generateRefreshToken(query._id);

	query.refreshToken = refreshToken;
	await query.save();

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: "None",
	};

	const userData = await User.findById(query._id).select(
		"-password -refreshToken"
	);

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{ userData, accessToken, refreshToken },
				"User Logged in",
				true,
				true
			)
		);
});

const logout = asyncHandler((req, res) => {
	res.clearCookie("accessToken", {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "None",
	});
	res.clearCookie("refreshToken", {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "None",
	});
	res.status(200).send(new ApiResponse(200, null, "Logout success", true));
});

const verifyUser = asyncHandler(async (req, res) => {
	res
		.status(200)
		.json(new ApiResponse(200, null, "User verified success", true, true));
});

module.exports = {
	registerUser,
	loginUser,
	logout,
	generateAccessToken,
	verifyUser,
};
