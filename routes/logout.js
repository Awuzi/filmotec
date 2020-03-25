const express = require('express');
const router = express.Router();


// route for logout action
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;