var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title cannot be blank!",
  },
  image: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
