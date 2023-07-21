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
const MongoStore = require('connect-mongo'); 


// cookie
app.use(cookieParser());

// middleware
app.use(express.urlencoded());

// reading static file
app.use(express.static("assets"));


// setup view engin
app.set("view engine", "ejs");
app.set("views", "./views");



// mongo store is used to store the session cookie
app.use(
  session({
    name: "social",
    // TODO change the secret before deployment in production mode
    secret: "somethig",
    saveUninitialized: false, //if user not logged in don't save any data in session cookie
    resave: false, // user logged in and already the user data present in session cookie so don't save or rewrite the data
    cookie: {
      maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/User',
      autoRemove: 'disabled'
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));



app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }
  console.log(`Server is running on port : ${port}`);
});
