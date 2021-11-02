'use strict'

var dbConn = require('../config/db_config');

var Player = function (player) {
    this.personalInfo = player.personalInfo;
    this.team = player.team;
    this.position = player.position;
    this.guardian1 = player.guardian1;
    this.guardian2 = player.guardian2;
};

Player.create = function (newPerson, result) {
    dbConn.query("INSERT INTO players set ?", newPerson, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Player.findById = function (id, result) {
    dbConn.query("Select * from players where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Player.findAll = function (result) {
    dbConn.query("Select * from players", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('players : ', res);
            result(null, res);
        }
    });
};
Player.update = function (id, player, result) {
    dbConn.query("UPDATE players SET personalInfo=?,team=?,position=?,guardian1=?,guardian2=? WHERE id = ?", [player.personalInfo, player.team, player.position, player.guardian1, player.guardian2, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Player.delete = function (id, result) {
    dbConn.query("DELETE FROM players WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Player;