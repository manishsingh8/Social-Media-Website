const express = require('express');

const router = express.Router();


const profileController = require('../controllers/profile_controller');
const aboutController = require('../controllers/about_controller');
router.get('/profile',profileController.profile);
router.get('/about',aboutController.about);


module.exports = router;