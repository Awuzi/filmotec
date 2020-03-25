const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");


// route to login page
router.get('/', function (req, res) {
    res.render('security/login');
});

// route for login action
router.post('/', function (req, res) {
    passport.authenticate('local')(req, res, function () {
        req.session.passport.user = req.user;
        res.render('movies', {
            user : req.user
        });
    });
});



module.exports = router;
