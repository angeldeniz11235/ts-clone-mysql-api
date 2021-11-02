'use strict';
const League = require('../models/league.model');
exports.findAll = function (req, res) {
    League.findAll(function (err, league) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', league);
        res.send(league);
    });
};
exports.create = function (req, res) {
    const new_person = new League(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        League.create(new_person, function (err, league) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "League added successfully!",
                data: league
            });
        });
    }
};
exports.findById = function (req, res) {
    League.findById(req.params.id, function (err, league) {
        if (err)
            res.send(err);
        res.json(league);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        League.update(req.params.id, new League(req.body), function (err, league) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'League successfully updated'
            });
        });
    }
};
exports.delete = function (req, res) {
    League.delete(req.params.id, function (err, league) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'League successfully deleted'
        });
    });
};