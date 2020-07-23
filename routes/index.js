const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.get('/profile',passport.checkAuthentication,homeController.profile);
router.post('/sign-Up',homeController.signUp);
//Use passport as middleware
router.post('/sign-in',passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
    
),homeController.signIn);

router.get('/sign-out',homeController.signOut);
module.exports = router;
