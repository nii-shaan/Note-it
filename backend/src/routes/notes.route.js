const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");

router.use(verifyJWT);
const { postNote } = require("../controllers/note.controller");

router.post("/post-note", postNote);


module.exports = router;
