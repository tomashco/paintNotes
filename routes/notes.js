var express = require("express"),
  router = express.Router(),
  helpers = require("../helpers/notes");

router.route("/").get(helpers.getNotes).post(helpers.createNotes);

router
  .route("/:noteId")
  .get(helpers.getNote)
  .put(helpers.updateNote)
  .delete(helpers.deleteNote);

module.exports = router;
