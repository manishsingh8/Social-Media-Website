const express = require("express");
const app = express();
const port = 8000;
// require cookie
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// cookie
app.use(cookieParser());

// middleware
app.use(express.urlencoded());

// setup view engin
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "social",
    // TODO change the secret before deployment in production mode
    secret: "somethig",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use("/", require("./routes"));

// reading static file
app.use(express.static("assets"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }
  console.log(`Server is running on port : ${port}`);
});
