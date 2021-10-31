'use strict';
const Address = require('../models/address.model');
exports.findAll = function (req, res) {
    Address.findAll(function (err, address) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', address);
        res.send(address);
    });
};
exports.create = function (req, res) {
    const new_address = new Address(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Address.create(new_address, function (err, address) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Address added successfully!",
                data: address
            });
        });
    }
};
exports.findById = function (req, res) {
    Address.findById(req.params.id, function (err, address) {
        if (err)
            res.send(err);
        res.json(address);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Address.update(req.params.id, new Address(req.body), function (err, address) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Address successfully updated'
            });
        });
    }
};
exports.delete = function (req, res) {
    Address.delete(req.params.id, function (err, address) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Address successfully deleted'
        });
    });
};