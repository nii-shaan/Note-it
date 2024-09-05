const asyncHandler = require("../utils/asyncHandler");

const postNote= asyncHandler((req, res) => {
	return res.json({
		test: "passed",
		success: true
	});
});

module.exports = {
	postNote,
};
