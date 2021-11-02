'use strict';
const Staff = require('../models/staff.model');
exports.findAll = function (req, res) {
    Staff.findAll(function (err, staff) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', staff);
        res.send(staff);
    });
};
exports.create = function (req, res) {
    const new_person = new Staff(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Staff.create(new_person, function (err, staff) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Staff added successfully!",
                data: staff
            });
        });
    }
};
exports.findById = function (req, res) {
    Staff.findById(req.params.id, function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        Staff.update(req.params.id, new Staff(req.body), function (err, staff) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Staff successfully updated'
            });
        });
    }
};
exports.delete = function (req, res) {
    Staff.delete(req.params.id, function (err, staff) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Staff successfully deleted'
        });
    });
};