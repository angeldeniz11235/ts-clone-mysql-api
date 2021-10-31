'use strict'

var dbConn = require('../config/db_config');

var Address = function (address) {
    this.streetAddress = address.streetAddress;
    this.zip = address.zip;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
};

Address.create = function (newAddress, result) {
    dbConn.query("INSERT INTO addresses set ?", newAddress, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Address.findById = function (id, result) {
    dbConn.query("Select * from addresses where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Address.findAll = function (result) {
    dbConn.query("Select * from addresses", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('addresses : ', res);
            result(null, res);
        }
    });
};
Address.update = function (id, address, result) {
    dbConn.query("UPDATE addresses SET streetAddress=?,zip=?,city=?,state=?,country=? WHERE id = ?", [address.streetAddress,address.zip,address.city,address.state,address.country, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Address.delete = function (id, result) {
    dbConn.query("DELETE FROM addresses WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Address;