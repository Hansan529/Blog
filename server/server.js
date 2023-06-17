const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");

const app = express();
const logger = morgan("dev");

app.use(logger);
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1800000,
//     },
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

export default app;
