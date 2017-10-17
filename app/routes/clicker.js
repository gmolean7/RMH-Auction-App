var express = require('express');
var router = express.Router();

var count = 0;

router.get('/', function(req, res, next) {
    var round = 10000; // TODO: Get round from database using service
    res.render('clicker', { round });
});

router.post('/addOne', function(req, res, next) {
    count++;
    res.send({count});
});

router.post('/subtractOne', function(req, res, next) {
    if(count != 0) {
        count--;
    }
    res.send({count});
});

module.exports = router;