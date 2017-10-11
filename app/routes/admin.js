var express = require('express');
var router = express.Router();
var currencyFormmatter = require('currency-formatter');
var _ = require('lodash');
var http = require('http');

const rounds = [10000, 5000, 2500, 2000, 1500, 1000, 500];
var currRound = rounds[0];

router.get('/', function(req, res, next) {
    var totalDonations = 50000; // get total donations
    res.render('admin', { 
        title: 'Admin Page', 
        rounds, 
        currRound, 
        totalDonations, 
        currencyFormmatter
    });
});

router.get('/currentRound', function(req,res, next){
    res.send({currRound});
});

router.post('/nextRound', function(req, res, next) {
    var index = _.indexOf(rounds, currRound);
    if(index >= 0 && index < rounds.length - 1) {
        index++; //get next
        currRound = rounds[index];
    }
    res.send({currRound});
});

router.post('/prevRound', function(req, res, next) {
    var index = _.indexOf(rounds, currRound);
    if(index > 0 && index <= rounds.length - 1) {
        index--; //get previous
        currRound = rounds[index];
    }
    res.send({currRound});
});

module.exports = router;