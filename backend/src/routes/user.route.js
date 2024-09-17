const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  verifyUser,
  getCurrentUser
} = require("../controllers/user.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/verifyUser", verifyJWT, verifyUser);
router.get("/getCurrentUser", verifyJWT, getCurrentUser)

module.exports = router;
