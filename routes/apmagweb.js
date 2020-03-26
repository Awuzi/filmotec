const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');



//http://localhost:3000/api/movies
/*fetch("http://localhost:3000/api/movies").then(response => response.json()).then(data => {
    //console.log(data.results);
    const movies = data.results;
    //console.log(movies);
})*/

router.get('/', function (req, res, next) {
/*
    const movies = fetch('http://localhost:3000/api/movies');
    console.log(movies);


    res.render('apmagweb', {
        movies : movies
    });
*/
    axios.get("http://localhost:3000/api/movies")
        .then(response => {
            console.log(response.data);
            const movies = response.data;
            res.render("apmagweb", {
                movies: movies
            });
        })
        .catch(error => {
            console.log(error);
        });
/*    Twig.renderFile('./path/to/someFile.twig', {foo:'bar'}, (err, html) => {
        html; // compiled string
    });*/
});


module.exports = router;