'use strict'

var dbConn = require('../config/db_config');

var Team = function (team) {
    this.league = team.league;
    this.name = team.name;
    this.hqAddress = team.hqAddress;
    this.mascot = team.mascot;
};

Team.create = function (newTeam, result) {
    dbConn.query("INSERT INTO teams set ?", newTeam, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Team.findById = function (id, result) {
    dbConn.query("Select * from teams where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Team.findAll = function (result) {
    dbConn.query("Select * from teams", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('teams : ', res);
            result(null, res);
        }
    });
};
Team.update = function (id, team, result) {
    dbConn.query("UPDATE teams SET league=?,name=?,hqAddress=?,mascot=? WHERE id = ?", [team.league, team.name, team.hqAddress,  team.mascot, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Team.delete = function (id, result) {
    dbConn.query("DELETE FROM teams WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

//find all players on a team
Team.findPlayers = function (id, result) {
    dbConn.query("Select * from players WHERE players.team = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('players : ', res);
            result(null, res);
        }
    });
};

//find player's personal info on a team using team id
Team.findPlayersPesonalInfo = function (id, result) {
    dbConn.query("select persons.* from (select p.* from teams t join players p on t.id = p.team where t.id = ?) r join persons on r.personalInfo = persons.ID",
     [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('players : ', res);
            result(null, res);
        }
    });
};

module.exports = Team;