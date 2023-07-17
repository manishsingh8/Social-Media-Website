
const User = require('../models/user');


// renders users profile page
module.exports.profile = function (req, res) {
  // console.log(req.cookies.user_id);
  // if(req.cookies.user_id){
  //   User.findById(req.cookies.user_id)
  //    .then((dbUser)=>{
  //         return res.render("profile", {
  //           title: "Profile",
  //           user:dbUser
  //         });
  //       }).catch((err)=>{
  //         return res.redirect('/users/signin');
  //    })
  // }else{
  //  return res.redirect('/users/signin');
  // }
  return res.render('profile',{
    title:'User Profile ' 
  })
};

//  renders users signup page
module.exports.signup = function (req, res) {
   console.log(req.body);
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
  // handle password match
    if(req.body.password != req.body.confirm_password){
      return res.redirect("back");
    }
    // find the user
    User.findOne({email:req.body.email})// compare the useremail to db email
    .then((user)=>{
       if(!user){
        // handle create user
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
        return res.redirect('back');
    })
}

// get the signin and create the session using passport
module.exports.createSession =  function(req,res){
     return res.redirect("/");// after user get signind we will redirect user to home page
}



// // signout
// module.exports.signout = function(req,res){
//       //  cleare the user_id after user click on signout
//       console.log(req.cookies.user_id);
//       res.clearCookie('user_id'); 
//       console.log("user_id is removed from cookie");
//     return res.redirect('/users/signin');
// }