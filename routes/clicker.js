var express = require('express');
var router = express.Router();
var db = require('../db/index');

var count = 0;
var currentTotal = 13000;
var round = db.getCurrentRound();

router.get('/', function(req, res, next) {
    res.render('clicker', { round, count });
});

router.get('/currentTotal', function(req, res, next) {
    res.send({currentTotal: db.getCurrentTotal()})
});

router.post('/addOne', function(req, res, next) {
    count++;
    db.increaseTotal();
    res.send({count});
});

router.post('/subtractOne', function(req, res, next) {
    if(count != 0) {
        count--;
    }
    res.send({count});
});

module.exports = router;