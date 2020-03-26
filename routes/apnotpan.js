const express = require('express');
const router = express.Router();
const axios = require('axios');

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


module.exports = router;