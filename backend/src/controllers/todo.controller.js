const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Todo = require("../model/todo.model.js")



const createTodo = asyncHandler(async (req, res) => {


})

const deleteTodo = asyncHandler(async (req, res) => {


})

const getAllTodos = asyncHandler(async (req, res) => {

  return res
    .status(200)
    .json(new ApiResponse(200, null, "yes done", true, true))

})


module.exports = {
  createTodo,
  deleteTodo,
  getAllTodos
}










