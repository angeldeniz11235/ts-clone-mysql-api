'use strict'

var dbConn = require('../config/db_config');

var League = function (league) {
    this.name = league.name;
    this.hqAddress = league.hqAddress;
    this.foundationDate = league.foundationDate;
    this.sport = league.sport;
};

League.create = function (newLeague, result) {
    dbConn.query("INSERT INTO leagues set ?", newLeague, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
League.findById = function (id, result) {
    dbConn.query("Select * from leagues where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
League.findAll = function (result) {
    dbConn.query("Select * from leagues", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('leagues : ', res);
            result(null, res);
        }
    });
};
League.update = function (id, league, result) {
    dbConn.query("UPDATE leagues SET name=?,hqAddress=?,foundationDate=?, sport=?, WHERE id = ?", [league.name, league.hqAddress, league.foundationDate, league.sport, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
League.delete = function (id, result) {
    dbConn.query("DELETE FROM leagues WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = League;