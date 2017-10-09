var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var round = 1500; // TODO: Get round from admin service
    res.render('clicker', { round: round });
});

module.exports = router;