// const serverless = require("serverless-http");

// var express = require("express"),
//   app = express(),
//   port = process.env.PORT || 3000,
//   bodyParser = require("body-parser");

// var paintNotesRoutes = require("../routes/notes.js");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/views"));

// app.get("/", (req, res) => {
//   res.sendFile("index.html");
// });

// app.use("/notes/", paintNotesRoutes);

// app.listen(port, () => {
//   console.log("Server has started on port" + port);
// });

// module.exports.handler = serverless(app);

const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
