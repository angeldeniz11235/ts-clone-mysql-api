'use strict'

var dbConn = require('../config/db_config');

var Person = function (person) {
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.email = person.email;
    this.address = person.address;
    this.phone = person.phone;
    this.dateOfBirth = person.dateOfBirth;
};

Person.create = function (newPerson, result) {
    dbConn.query("INSERT INTO persons set ?", newPerson, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Person.findById = function (id, result) {
    dbConn.query("Select * from persons where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Person.findAll = function (result) {
    dbConn.query("Select * from persons", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('persons : ', res);
            result(null, res);
        }
    });
};
Person.update = function (id, person, result) {
    dbConn.query("UPDATE persons SET firstName=?,lastName=?,email=?,address=?,phone=?,dateOfBirth=? WHERE id = ?", [person.firstName, person.lastName, person.email, person.address, person.phone, person.dateOfBirth, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Person.delete = function (id, result) {
    dbConn.query("DELETE FROM persons WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Person;