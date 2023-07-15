const express = require('express');

const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');


router.get('/profile',userController.profile);
router.get('/signup',userController.signup);
router.get('/signin',userController.signin);


router.post('/create',userController.create);
router.post('/signout',userController.signout);

// use passport as a middleware to authenticate
router.post('/create-session',
passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
) ,userController.createSession);


module.exports = router;