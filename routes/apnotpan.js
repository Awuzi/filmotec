const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_KEY = "8e21ddf9674f198702f947e8665956cc";
const Movie = require('../models/Movie')

router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000/api/movies/10")
        .then(response => {
            res.render("apnotpan", {
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
});

router.get('/:id', function (req, res) {
    const casting = axios.get("http://localhost:3000/api/movie/casting/" + req.params.id + "?api_key=" + API_KEY);
    const movie_infos = axios.get("http://localhost:3000/api/movie/infos/" + req.params.id + "?api_key=" + API_KEY);
    axios.all([casting, movie_infos]).then(axios.spread((...responses) => {
        const casting = responses[0].data;
        const movie_infos = responses[1].data;
        let movie = Movie.find({"movie_id" : req.params.id }, function(err, result) {
        });
        console.log(movie)
        //console.log(casting);
        res.render('movie', {
            casting: casting,
            movie_infos: movie_infos,
            movie: movie
        })
    }))
});

router.post('/:id', function (req, res) {
    firstname = req.body.firstname;
    lastname = req.body.lastname;
    comment = req.body.comment;
    note = req.body.eval;
    curID = req.params.id;
    Movie.insertMany(new Movie({user_firstname : firstname, user_lastname: lastname, movie_id: curID, comment: comment, eval: note}))
    res.redirect("/apnotpan/" + req.params.id);
})


module.exports = router;