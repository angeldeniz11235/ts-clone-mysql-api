'use strict'

var dbConn = require('../config/db_config');

var Staff = function (staff) {
    this.personalInfo = staff.personalInfo;
    this.team = staff.team;
    this.title = staff.title;
};

Staff.create = function (newPerson, result) {
    dbConn.query("INSERT INTO staff set ?", newPerson, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Staff.findById = function (id, result) {
    dbConn.query("Select * from staff where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Staff.findAll = function (result) {
    dbConn.query("Select * from staff", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('staff : ', res);
            result(null, res);
        }
    });
};
Staff.update = function (id, staff, result) {
    dbConn.query("UPDATE staff SET personalInfo=?,team=?,title=? WHERE id = ?", [staff.personalInfo, staff.team, staff.title, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Staff.delete = function (id, result) {
    dbConn.query("DELETE FROM staff WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Staff;