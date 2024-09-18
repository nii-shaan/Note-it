const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  verifyUser,
  getCurrentUser,
  updateUsername,
  updateEmail,
  updatePassword

} = require("../controllers/user.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/verifyUser", verifyJWT, verifyUser);
router.get("/getCurrentUser", verifyJWT, getCurrentUser)
router.put("/updateUsername", verifyJWT, updateUsername)
router.put("/updateEmail", verifyJWT, updateEmail)
router.put("/updatePassword", verifyJWT, updatePassword)

module.exports = router;
