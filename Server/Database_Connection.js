const server_connection = require('./server_conn');
const mysql = require('mysql2');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
  host: 'breath-test.clcohhcxscoj.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'AsthmaTest1',
  database: 'breath',
});

  

  module.exports = connection;