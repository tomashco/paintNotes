var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/paintnotes-api"
);

mongoose.Promise = Promise;

module.exports.Note = require("./Note");
