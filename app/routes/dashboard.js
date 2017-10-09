var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var totalDonations = 50000; // get total donations
    res.render('dashboard', { title: 'Dashboard', totalDonations: totalDonations });
});

module.exports = router;