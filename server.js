// require dependencies
const express = require("express");
const logger = require("morgan");
const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/posts");

// initialize express application
const app = express();

//configure application settings
app.set("view engine", "ejs");
// expose environment variables
require("dotenv").config();
// require an execute database config code
require("./config/database");

// mount middleware
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// mount routes
app.use("/", indexRoutes);
app.use("/posts", postRoutes);

// "fallback" or "catch all" route for serving 404 page
app.use("*", (req, res) => {
  res.render("404", { title: "404 - Page Not Found" });
});

// tell the application to listen for requests
app.listen(4000, () => {
  console.log("express is listening on port: 4000");
});
