const serverless = require("serverless-http");

var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser");

var paintNotesRoutes = require("../routes/notes.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/.netlify/routes/index/notes", paintNotesRoutes);

app.listen(port, () => {
  console.log("Server has started on port" + port);
});

module.exports.handler = serverless(app);
