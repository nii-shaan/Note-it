const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const Note = require("../model/note.model.js")

const postNote = asyncHandler(async (req, res) => {
	console.log("received on postNote")

	const { title, content } = req.body;
	const owner = req.user


	if (!title || title.trim() === "") {
		return res
			.status(400)
			.json(new ApiResponse(400, null, "title not provided", false, true))
	}
	const note = await Note.create({
		title,
		content,
		owner

	})
	return res
		.status(200)
		.json(new ApiResponse(200, note, "Note posted", true, true))
});

module.exports = {
	postNote,
};
