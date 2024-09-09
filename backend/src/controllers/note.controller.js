const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Note = require("../model/note.model.js")

const postNote = asyncHandler(async (req, res) => {
	console.log("received on postNote")
	console.log(req.body)

	const { title, content } = req.body;
	const owner = req.user


	if (!title || title.trim() === "") {
		return res
			.status(400)
			.json(new ApiResponse(400, null, "title not provided", false, true))
	}

	//validating [ title  should not match ]
	const exists = await Note.findOne({ title: title, owner: owner })
	if (exists) {
		return res
			.status(406)
			.json(new ApiResponse(406, null, "Note title already exists!", false, true))

	}
	const note = await Note.create({
		title,
		content: content || "",
		owner

	})
	return res
		.status(200)
		.json(new ApiResponse(200, note, "Note posted", true, true))
});

const getAllNotes = asyncHandler(async (req, res) => {

	const user = req.user
	const notes = await Note.find({ owner: user })

	return res
		.status(200)
		.json(new ApiResponse(200, notes, `${user.email} All Notes retrieved`, true, true))

})

const getNoteByTitle = asyncHandler(async (req, res) => {

	const { title } = req.params
	const owner = req.user


	const note = await Note.findOne({ title, owner })

	if (!note) {
		return res
			.status(404)
			.json(new ApiResponse(404, null, "Note not found!", true, true))
	}

	return res
		.status(200)
		.json(new ApiResponse(200, note, `title: ${title}`, true, true))

})
module.exports = {
	postNote,
	getAllNotes,
	getNoteByTitle
};
