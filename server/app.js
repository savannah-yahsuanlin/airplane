const path = require("path");
const express = require("express");
const morgan = require("morgan");
const passport = require('passport');

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));


//route
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));


require("./auth/google")(passport);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  console.error(error.stack);
  res
    .status(error.status || 500)
    .send(error.message || "Internal server error");
});

module.exports = app;
