'use strict';
const mysql = require('mysql');

var dbConn = {};
var user = 'root';
var password = 'r0932urwpour02';
var database = 'tsClone'

function connectToDB() {
  var Host = "";
  switch (process.env.NODE_ENV) {
    case 'production':
      if (process.env.MYSQL_DB_ADDRESS !== undefined) {
        Host = process.env.MYSQL_DB_ADDRESS;
        console.log('Connecting to production database: ' + process.env.MYSQL_DB_ADDRESS);
      }
      else{
        Host = 'http:www.angeld.xyz';
      }
      break;
    case 'development':
      console.log('Connecting to development database at localhost');
      Host = 'localhost';
      break;

    default:
      console.log('MYSQL_DB_ADDRESS is not set...');
      break;
  }
  dbConn = mysql.createConnection({
    host: Host,
    user: user,
    password: password,
    database: database
  });
  dbConn.connect(function (err) {
    if (err) {
      console.log('Error connecting to Db\n' + err);
      return;
    }
    console.log(`Connection established to ${Host}`);
  });
}


connectToDB();
module.exports = dbConn;