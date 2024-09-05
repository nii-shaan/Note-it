const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const { postNote } = require("../controllers/note.controller.js");

router.use(verifyJWT);

router.post("/postNote", postNote);


module.exports = router;
