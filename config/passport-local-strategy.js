const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User =  require('../models/user');

// authentication using passport

passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    User.findOne({email:email})
    .then((user)=>{
        if(!user || user.password != password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }
        return done(null,user); 
    })
    .catch((err)=>{
        console.log("Error in finding user --> passport");
        return done(err);
    })
}
));

// serializing the user to decide which key is to be kept in the cookies or set the userid in the cookie
  passport.serializeUser(function(user,done){
    done(null,user.id); //store the userid in encrypted format
  })



// deserializing the user from the key in the cookie

passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{
         return done(null,user);
    })
    .catch((err)=>{
        console.log("Error in finding user --> passport")
        return done(err);
    })
})

module.exports = passport;