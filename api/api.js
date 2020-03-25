const express = require('express');
const router = express.Router();
const API_KEY = "8e21ddf9674f198702f947e8665956cc";
const TMDB_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + API_KEY;
const axios = require('axios');


/**
 * route /api
 */
router.get('/movies', function (req, res, next) {
    axios.get(TMDB_URL)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});




module.exports = router;



