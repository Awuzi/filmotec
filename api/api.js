const express = require('express');
const router = express.Router();
const API_KEY = "8e21ddf9674f198702f947e8665956cc";
const TMDB_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + API_KEY;
const fetch = require('node-fetch');
const axios = require('axios');


router.get('/', function (req, res, next) {
    res.redirect("/api/movies");
});


router.get('/movies', function (req, res, next) {
    const url = TMDB_URL;
    fetch(url).then(response => response.json()).then(data => {
        res.send(data.results);
    })
});

router.get('/movies/:page', function (req, res, next) {
    let calls = [];
    const movies_tab = [];
    for (let i = 1; i <= req.params.page; ++i) {
        calls.push(axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+ i));
    }
    Promise.all(calls).then(function (responses) {
        responses.forEach(response => {
            response.data.results.forEach(item => {
                movies_tab.push(item);
            });
        });
        res.send(movies_tab);
    });
});

router.get('/movie/infos/:id', function (req, res, next) {
    const url = "https://api.themoviedb.org/3/movie/" + req.params.id + "?api_key=" + API_KEY;
    fetch(url).then(response => response.json()).then(data => {
        res.send(data);
    })
});

router.get('/movie/casting/:id', function (req, res, next) {
    const url = "https://api.themoviedb.org/3/movie/" + req.params.id + "/credits?api_key=" + API_KEY;
    fetch(url).then(response => response.json()).then(data => {
        res.send(data.crew);
    })
});

module.exports = router;



