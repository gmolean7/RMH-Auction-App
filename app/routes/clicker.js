var express = require('express');
var router = express.Router();

var count = 0;
var currentTotal = 13000;
var round = 10000; // TODO: Get round from database

router.get('/', function(req, res, next) {
    res.render('clicker', { round, count });
});

router.get('/currentTotal', function(req, res, next) {
    res.send({currentTotal: currentTotal})
});

router.post('/addOne', function(req, res, next) {
    count++;
    currentTotal = currentTotal + round;
    res.send({count});
});

router.post('/subtractOne', function(req, res, next) {
    if(count != 0) {
        count--;
    }
    res.send({count});
});

module.exports = router;