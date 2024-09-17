const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Todo = require("../model/todo.model.js")



const createTodo = asyncHandler(async (req, res) => {

  const { title } = req.body
  const owner = req.user

  if (!title) {
    return res
      .status(406)
      .json(new ApiResponse(406, null, "title not provided", false, true))
  }

  const todo = await Todo.create({ title, owner })

  return res
    .status(201)
    .json(new ApiResponse(200, todo, "todo created", true, true))

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










