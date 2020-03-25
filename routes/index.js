const express = require('express');
const router = express.Router();
let Movies = require('../models/Movie');


router.get('/', function (req, res, next) {
    res.render('index')
});

router.get('/movies', async function (req, res, next) {
    await Movies.find({}, (error, movie) => {
        console.log(movie);
        res.render('movies');
    });
});

module.exports = router;
