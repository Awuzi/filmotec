const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');

// route to login page
router.get('/', function (req, res) {
    res.render('security/login');
});

// route for login action
router.post('/', (req, res) => {
    if (!req.body) {
        res.redirect('/');
    } else {
        User.count({
            username: req.body.username,
            password: crypto.createHash('sha256').update(req.body.password).digest('base64')
        }, (err, result) => {
            if (result === 1) {
                req.session.username = req.body.username;
                res.redirect('/')
            } else {
                res.render('security/login', {error: 'Identifiants incorrects.'})
            }
        });
    }
});


module.exports = router;
