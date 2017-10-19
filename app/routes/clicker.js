var express = require('express');
var router = express.Router();
var accounting = require('../libs/service-accounting');

var count = 0;
var currentTotal = 13000;
var round = accounting.getCurrentRound(); // TODO: Get round from database

router.get('/', function(req, res, next) {
    res.render('clicker', { round, count });
});

router.get('/currentTotal', function(req, res, next) {
    res.send({currentTotal: accounting.getCurrentTotal()})
});

router.post('/addOne', function(req, res, next) {
    count++;
    accounting.increaseTotal();
    res.send({count});
});

router.post('/subtractOne', function(req, res, next) {
    if(count != 0) {
        count--;
    }
    res.send({count});
});

module.exports = router;