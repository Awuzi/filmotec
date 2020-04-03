const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const crypto = require('crypto');

// route to register page
router.get('/', function (req, res) {
    res.render('security/register');
});

// route for register action
router.post('/', function (req, res) {
    User.insertMany(new User({
        username: req.body.username,
        name: req.body.name,
        password: crypto.createHash('sha256').update(req.body.password).digest('base64')
    }), (err, user) => {
        if (err) {
            res.render("security/register", {user: user});
        }
        res.redirect('/apnotpan');
        /*passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });*/
    });
});


module.exports = router;
