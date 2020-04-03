const express = require('express');
const router = express.Router();



router.get('/', function (req, res, next) {
    res.render('index', {
        user: req.session.username
    })
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy((err) =>{
            if(err) {
                return next(err);
            } else {
                return res.redirect("/apnotpan")
            }
        });
    }
});

module.exports = router;
