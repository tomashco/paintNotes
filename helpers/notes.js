db = require("../models");

exports.getNotes = (req, res) => {
  db.Note.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.createNotes = (req, res) => {
  db.Note.create(req.body)
    .then((newNote) => {
      res.status(201).json(newNote);
    })
    .catch((err) => {
      res.send(err);
    });
  console.log(req.body);
};

exports.getNote = (req, res) => {
  db.Note.findById(req.params.noteId)
    .then((foundNote) => {
      res.json(foundNote);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateNote = (req, res) => {
  db.Note.findOneAndUpdate({ _id: req.params.noteId }, req.body, { new: true })
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteNote = (req, res) => {
  db.Note.remove({ _id: req.params.noteId })
    .then(() => {
      res.json({ message: "Note deleted!" });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = exports;
