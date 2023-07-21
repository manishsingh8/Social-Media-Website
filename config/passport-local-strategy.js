const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user --> passport");
          return done(err);
        });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies or set the userid in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id); //store the userid in encrypted format
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding user --> passport");
      return done(err);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    //it's a passport method to check weather the user is logged in or not
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;  
}
next();
};

module.exports = passport;
