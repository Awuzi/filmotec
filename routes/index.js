const express = require('express');
const router = express.Router();
let Movies = require('../models/Movie');


router.get('/', function (req, res, next) {
    res.render('index')
});

/*router.route('/api/movies').get((res,req) =>{
    console.log(req.query);
    res.json({
        id : req.query.id
    });
});*/

router.get('/movies', async function (req, res, next) {
    await Movies.find({}, (error, movie) => {
        console.log(movie);
        res.render('movies');
    });
});


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
