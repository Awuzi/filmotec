const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_KEY = "8e21ddf9674f198702f947e8665956cc";

router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000/api/movies")
        .then(response => {
            res.render("apnotpan", {
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
});

router.get('/:id', function (req, res, next) {
    const casting = axios.get("http://localhost:3000/api/movie/casting/" + req.params.id + "?api_key=" + API_KEY);
    const movie_infos = axios.get("http://localhost:3000/api/movie/infos/" + req.params.id + "?api_key=" + API_KEY);
    axios.all([casting, movie_infos]).then(axios.spread((...responses) => {
        const casting = responses[0].data;
        const movie_infos = responses[1].data;
        //console.log(casting);
        res.render('movie', {
            casting: casting,
            movie_infos: movie_infos,
        }).catch(error => {
            console.log(error);
        });
    }))
});


module.exports = router;