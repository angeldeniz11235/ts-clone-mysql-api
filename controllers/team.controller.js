'use strict';
const Team = require('../models/team.model');
exports.findAll = function (req, res) {
    Team.findAll(function (err, team) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', team);
        res.send(team);
    });
};

//find all players in a team
exports.findPlayers = function (req, res) {
    Team.findPlayers(req.params.team_id, function (err, team) {
        if (err)
            res.send(err);
        res.send(team);
    });
};

exports.create = function (req, res) {
    const new_team = new Team(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        Team.create(new_team, function (err, teamID) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Team added successfully!",
                teamID: teamID
            });
        });
    }
};
exports.findById = function (req, res) {
    Team.findById(req.params.id, function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        Team.update(req.params.id, new Team(req.body), function (err, team) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Team successfully updated'
            });
        });
    }
};
exports.delete = function (req, res) {
    Team.delete(req.params.id, function (err, team) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Team successfully deleted'
        });
    });
};