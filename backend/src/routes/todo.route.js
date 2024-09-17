const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const { createTodo, deleteTodo, getAllTodos } = require("../controllers/todo.controller.js")

router.use(verifyJWT);

router.post("/createTodo", createTodo);
router.delete("/deleteTodo/:title", deleteTodo)
router.get("/getAllTodos", getAllTodos)

module.exports = router;
