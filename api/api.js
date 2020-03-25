const express = require('express');
const router = express.Router();
const API_KEY = "8e21ddf9674f198702f947e8665956cc";
const TMDB_URI = "https://api.themoviedb.org/3/movie/550?api_key=" + API_KEY;


/**
 * route /api
 */
router.get('/', function (req, res, next) {
    console.log("ici l'api");
});




module.exports = router;



