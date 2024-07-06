const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");

router.use(verifyJWT)
const { noteController } = require("../controllers/note.controller");

router.get("/getNotes",noteController);
module.exports = router;
