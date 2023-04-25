const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const passport = require('passport');

router.get('/', indexController.home);
router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email'],
        prompt: "select_account"
    }
    
));
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/posts',
        failureRedirect: '/posts'
    }
))

module.exports = router;