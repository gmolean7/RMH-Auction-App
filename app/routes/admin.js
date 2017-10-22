var express = require('express');
var router = express.Router();
var currencyFormmatter = require('currency-formatter');
var _ = require('lodash');
var db = require('../db/index');
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

router.post('/startEvent', function(req, res, next) {
    db.tx(function(t) {
        var stmts = _.map(rounds, function(round, idx) {
            var isActive = (idx === 0);
            return t.none('INSERT INTO rounds (dollar_value, count, is_active) VALUES($1, $2, $3)', [round, 0, isActive]);
        });

        return t.batch([
            t.none('DROP TABLE rounds'), 
            t.none('CREATE TABLE rounds (dollar_value int primary key, count int, is_active bool)')
        ].concat(stmts));
    })
    .catch(function(error) {
        // return error and forward
    });
});

module.exports = router;
