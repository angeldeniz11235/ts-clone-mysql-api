'use strict';
const Person = require('../models/person.model');
exports.findAll = function (req, res) {
    Person.findAll(function (err, person) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', person);
        res.send(person);
    });
};
exports.create = function (req, res) {
    const new_person = new Person(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Person.create(new_person, function (err, person) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Person added successfully!",
                data: person
            });
        });
    }
};
exports.findById = function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (err)
            res.send(err);
        res.json(person);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        Person.update(req.params.id, new Person(req.body), function (err, person) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Person successfully updated'
            });
        });
    }
};
exports.delete = function (req, res) {
    Person.delete(req.params.id, function (err, person) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Person successfully deleted'
        });
    });
};