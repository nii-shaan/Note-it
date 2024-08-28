const asyncHandler = require("../utils/asyncHandler");

const noteController = asyncHandler((req, res) => {
  return res.json({
    test: "passed",
  });
});

module.exports = {
  noteController,
};
