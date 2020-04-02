const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/Movie');


router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000/api/movies/6")
        .then(responses => {
            const movie_magazine = [];
            //data from api
            Movie.aggregate([{
                $group: {
                    _id: "$movie_id",
                    evalAvg: {$avg: "$eval"},
                    bestEval: {$max: "$eval"},
                    bestComment: {$max: "$comment"},
                    worstComment: {$min: "$comment"},
                    worstEval: {$min: "$eval"},
                }
            }], (err, result) => {
                result.forEach(r => {
                    responses.data.forEach(movie => {
                        if (r._id === movie.id)
                            movie_magazine.push({
                                id: movie.id,
                                title: movie.title,
                                overview: movie.overview,
                                poster_path: movie.poster_path,
                                release_date: movie.release_date,
                                avgEval: r.evalAvg,
                                bestEval: r.bestEval,
                                bestComment: r.bestComment,
                                worstEval: r.worstEval,
                                worstComment: r.worstComment,
                            });

                    });
                });
                //console.log(movie_magazine);
                res.render('apmagweb', {movie_magazine: movie_magazine});
            });
        })
        .catch(error => {
            console.log(error);
        });
});


module.exports = router;