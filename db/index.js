var pgp = require('pg-promise')({ promiseLib: require('bluebird') });

var cn = process.env['DATABASE_URL'];
var db = pgp(cn);

module.exports = db;