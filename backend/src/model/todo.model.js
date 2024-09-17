const { model, Schema } = require("mongoose")

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true })

const Todo = model("Todo", todoSchema)
module.exports = Todo
