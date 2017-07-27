const request = require('request');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');


router.get('/brewery-api/breweries-by-location', (req, res, next) => {
    request ({
        url: "http://api.brewerydb.com/v2/search/geo/point/?lat="+req.query.lat+"&lng="+req.query.lng+"&radius="+req.query.radius+"&key="+req.query.key,
        method: 'GET'
    }, (err,response,body) => {
       res.json(body);
    })
 
});

module.exports = router;