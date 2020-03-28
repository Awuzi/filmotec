const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');



router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000/api/movies")
        .then(response => {
            const movies = response.data;
            res.render("apmagweb", {
                movies: movies
            });
        })
        .catch(error => {
            console.log(error);
        });
});


module.exports = router;