'use strict';
const Player = require('../models/player.model');
exports.findAll = function (req, res) {
    Player.findAll(function (err, player) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', player);
        res.send(player);
    });
};
exports.create = function (req, res) {
    const new_person = new Player(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Player.create(new_person, function (err, player) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Player added successfully!",
                data: player
            });
        });
    }
};
exports.findById = function (req, res) {
    Player.findById(req.params.id, function (err, player) {
        if (err)
            res.send(err);
        res.json(player);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        Player.update(req.params.id, new Player(req.body), function (err, player) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Player successfully updated'
            });
        });
    }
};
exports.delete = function (req, res) {
    Player.delete(req.params.id, function (err, player) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Player successfully deleted'
        });
    });
};