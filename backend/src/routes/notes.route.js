const express = require("express");
const router = express.Router();

const { noteController } = require("../controllers/note.controller");

router.get("/getNotes", noteController);

module.exports = router;
