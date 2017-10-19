var express = require('express');
var router = express.Router();
var currencyFormmatter = require('currency-formatter');
var _ = require('lodash');
var accounting = require('../libs/service-accounting');

const rounds = [10000, 5000, 2500, 1000, 500, 145];

router.get('/', function(req, res, next) {
    var totalDonations = 50000; // get total donations
    res.render('admin', { 
        title: 'Admin Page', 
        rounds, 
        currRound: accounting.getCurrentRound(), 
        totalDonations, // change this to total for round?
        currencyFormmatter
    });
});

router.get('/currentRound', function(req,res, next){
    res.send({currRound: accounting.getCurrentRound()});
});

router.post('/resetAll', function(req,res, next){
    accounting.resetAll();
    res.send({currRound: accounting.getCurrentRound()});
});

router.post('/nextRound', function(req, res, next) {
    var currRound = accounting.getCurrentRound();
    var index = _.indexOf(rounds, currRound);
    if(index >= 0 && index < rounds.length - 1) {
        index++; //get next
        currRound = rounds[index];
    }
    accounting.changeRound(currRound);
    res.send({currRound: accounting.getCurrentRound()});
});

router.post('/prevRound', function(req, res, next) {
    var currRound = accounting.getCurrentRound();
    var index = _.indexOf(rounds, currRound);
    if(index > 0 && index <= rounds.length - 1) {
        index--; //get previous
        currRound = rounds[index];
    }
    accounting.changeRound(currRound);
    res.send({currRound: accounting.getCurrentRound()});
});

module.exports = router;