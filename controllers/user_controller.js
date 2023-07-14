
const User = require('../models/user');

// renders users profile page
module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Profile",
  });
};

//  renders users signup page
module.exports.signup = function (req, res) {
  return res.render("signup", {
    title: "SignUp",
  });
};

//    render users signin page
module.exports.signin = function (req, res) {
  return res.render("signin", {
    title: "SignIn",
  });
};

// get the signup data
module.exports.create =  function(req,res){
    
  console.log(req.body);
    if(req.body.password != req.body.confirm_password){
      return res.redirect("back");
    }
    User.findOne({email:req.body.email})
    .then((user)=>{
       if(!user){
        User.create(req.body)
        .then((user)=>{
          return res.redirect('/users/signin');
        }).catch((err)=>{
          console.log("Error in creating the user while signing up");
          return;
        })
       }else{
        return res.redirect('back');
       }
    })
    .catch((err)=>{
      console.log("Error while finding the user to signup");
        return;
    })
    // {
    //   if(err){
    //     console.log("Error while finding the user to signup");
    //     return;
    //   }
    //   if(!user){
    //     User.create(req.body,function(err,user){
    //       if(err){
    //         console.log("Error in creating the user while singing up ");
    //         return;
    //       }
    //       return res.redirect('/users/signin')
    //     })
    //   }
    //   else{
    //     return res.redirect('back');
    //   }

    // })

}

// get the signin and create the session
module.exports.createSession =  function(req,res){

}