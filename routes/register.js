const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// route to register page
router.get('/', function (req, res) {
    res.render('security/register');
});

// route for register action
router.post('/', function (req, res) {
    User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function (err, user) {
        if (err) {
            return res.render("security/register", { user: user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});


module.exports = router;
