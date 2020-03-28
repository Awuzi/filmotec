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
        console.log(req.user);
        res.render('apmagweb', {
            user : req.user
        });
    });
});



module.exports = router;
