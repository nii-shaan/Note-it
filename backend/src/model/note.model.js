const { Schema, model } = require("mongoose")


const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true })

const Note = model("Note", noteSchema);
module.exports = Note
