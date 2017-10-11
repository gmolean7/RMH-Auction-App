var express = require('express');
var router = express.Router();

var count = 0;

router.get('/', function(req, res, next) {
    var round = 1500; // TODO: Get round from admin service
    res.render('clicker', { round, count });
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