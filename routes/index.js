const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.get('/profile',passport.checkAuthentication,homeController.profile);
router.get('/profile-info/:id',passport.checkAuthentication,homeController.profileInfo);
router.post('/update-aboutMe/:id',passport.checkAuthentication,homeController.updateAboutMe);
router.post('/sign-Up',homeController.signUp);
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
router.use('/user',require('./users'));
//Use passport as middleware
router.post('/sign-in',passport.authenticate(
    'local',
    {failureRedirect: '/'},
    
),homeController.signIn);
router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/'}),homeController.signIn);
router.get('/sign-out',homeController.signOut);
module.exports = router;
