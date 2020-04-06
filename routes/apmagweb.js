const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/Movie');
const _ = require('lodash');


router.get('/', function (req, res) {
    const movie_comments = [],
        bestComment = [],
        worstComment = [],
        intermediate = [],
        calls = [],
        movie_infos = [];

    Movie.find({}, (err, result) => {
        result.forEach(comment => movie_comments.push(comment));

        const groupedComments = _.chain(movie_comments).groupBy('movie_id')
            .map((value, key) => ({movie_id: key, comment: value})).value();

        groupedComments.forEach(obj => {
            if (obj.comment.length === 1) {
                bestComment.push(_.maxBy(obj.comment, 'eval'));
            } else {
                bestComment.push(_.maxBy(obj.comment, 'eval'));
                worstComment.push(_.minBy(obj.comment, 'eval'));
            }
        });

        // push best and worst comment in an intermediate array
        bestComment.forEach(obj => obj != null ? intermediate.push(obj) : null);
        worstComment.forEach(obj => obj != null ? intermediate.push(obj) : null);

        let sortedComments = _.chain(intermediate)
            .groupBy('movie_id')
            .map((value, key) => ({movie_id: key, comment: value}))
            .value();

        sortedComments.forEach(c => calls.push(axios.get(`http://localhost:3000/api/movie/infos/${c.movie_id}`)));

        Movie.aggregate([{
            $group: {
                _id: '$movie_id',
                evalAvg: {$avg: '$eval'},
            }
        }], (err, result) => {
            result.forEach(r => {
                sortedComments.forEach(comment => {
                    if (parseInt(comment.movie_id) === r._id) {
                        Object.assign(comment, {
                            //avoid notation like '2,66666/5' -> prefer '2,6/5'
                            evalAvg: Math.round(r.evalAvg * 10) / 10
                        });
                    }
                });
            });

            axios.all(calls).then(axios.spread((...responses) => {
                responses.forEach(response => {
                    movie_infos.push({
                        movie_id: response.data.id.toString(),
                        title: response.data.title,
                        overview: response.data.overview,
                        poster_path: response.data.poster_path,
                    });
                });

                let mergedMovieComments = _.map(sortedComments, (item) => {
                    return _.extend(item, _.find(movie_infos, {movie_id: item.movie_id}));
                });
                res.send(mergedMovieComments);
            }));
        });
    });
});


module.exports = router;