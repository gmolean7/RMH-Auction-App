var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var round = 1500; // get current round
    var totalDonations = 50000; // get total donations
    res.render('admin', { title: 'Admin Page', round, totalDonations });
});

module.exports = router;