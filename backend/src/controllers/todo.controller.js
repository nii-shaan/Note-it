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

  const { id } = req.params

  if (!id) {
    return res
      .status(406)
      .json(new ApiResponse(406, null, "id not provided", false, true))
  }

  const todo = await Todo.findByIdAndDelete(id)

  if (!todo) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "todo not found", false, true))
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todo, `${todo.title} deleted`, true, true))

})

const getAllTodos = asyncHandler(async (req, res) => {

  const owner = req.user

  const todos = await Todo.find({ owner })

  return res
    .status(200)
    .json(new ApiResponse(200, todos, `${owner.username}'s all todos fetched`, true, true))

})


module.exports = {
  createTodo,
  deleteTodo,
  getAllTodos
}










