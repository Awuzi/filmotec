const express = require('express');
const router = express.Router();
const API_KEY = "8e21ddf9674f198702f947e8665956cc";
const TMDB_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + API_KEY;
const axios = require('axios');
const fetch = require('node-fetch');


router.get('/movies', function (req, res, next) {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=8e21ddf9674f198702f947e8665956cc&language=en-US&sort_by=popularity.desc&page=1&primary_release_date.gte=2020-03-01&primary_release_date.lte=2020-03-31";
    fetch(url).then(response => response.json()).then(data => {
            console.log(data);
            res.send(data.results);
        })
});




module.exports = router;



