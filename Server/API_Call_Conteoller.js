const server_connection = require('./server_conn');
const database_connection = require('./Database_Connection');
const axios = require('axios');
const mysql = require('mysql2');
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const Password = require('./Password');
const moment = require('moment');


function getCountofCall(User_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const query = `SELECT COUNT(*) AS call_count FROM api_call_controller WHERE User_ID = ? AND Time >= DATE_SUB(NOW(), INTERVAL 1 DAY);`;

                database_connection.query(query, [User_ID], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}


function addNewCall(User_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const today = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const call_ID = Math.floor(Math.random() * 900000) + 100000;

                const query = `INSERT INTO api_call_controller (User_ID, API_call_ID, Time) VALUES (?, ?, ?)`;
                database_connection.query(query, [User_ID, call_ID, today], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve('Done');
                    }
                });
            }
        });
    });
}


module.exports = {
    getCountofCall,
    addNewCall
}