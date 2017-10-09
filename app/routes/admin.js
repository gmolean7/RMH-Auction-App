var express = require('express');
var router = express.Router();
var currencyFormmatter = require('currency-formatter');
var _ = require('lodash');
var http = require('http');

const rounds = [10000, 5000, 2500, 2000, 1500, 1000, 500];
var currRound = rounds[0];

/* GET users listing. */
router.get('/', function(req, res, next) {
    var totalDonations = 50000; // get total donations
    res.render('admin', { 
        title: 'Admin Page', 
        rounds, 
        currRound, 
        totalDonations, 
        currencyFormmatter,
        nextRound: nextRound 
    });
});

router.get('/currentRound', function(req,res, next){
    res.send(currRound);
});

router.get('/nextRound', function(req, res, next) {
    var index = _.indexOf(rounds, currRound);
    if(index >= 0 && index < rounds.length - 1) {
        index++; //get next
        currRound = rounds[index];
    }
    var totalDonations = 50000; // get total donations
    res.render('admin', { 
        title: 'Admin Page', 
        rounds, 
        currRound, 
        totalDonations, 
        currencyFormmatter,
        nextRound 
    });
});

router.get('/prevRound', function(req, res, next) {
    var index = _.indexOf(rounds, currRound);
    console.log("currRound", currRound);
    console.log('index', index);
    if(index > 0 && index <= rounds.length - 1) {
        console.log('IN IF');
        index--; //get previous
        currRound = rounds[index];
    }
    console.log("currRound", currRound);
    var totalDonations = 50000; // get total donations
    res.render('admin', { 
        title: 'Admin Page', 
        rounds, 
        currRound, 
        totalDonations, 
        currencyFormmatter,
        nextRound 
    });
});

function nextRound() {
    console.log('in nextRound()!')
    const options = {
        hostname: 'http://localhost',
        port: 3000,
        path: '/admin/nextRound',
        method: 'POST'
    }
    const req = http.request(options, (res) => {
        // do nothing
    });
    req.end();
}

module.exports = router;