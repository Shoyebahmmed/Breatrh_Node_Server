const server_connection = require('./server_conn');
const database_connection = require('./Database_Connection');
const axios = require('axios');
const mysql = require('mysql2');
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const Password = require('./Password');
const moment = require('moment');


function getTriggersList(User_ID){
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const query = `SELECT * FROM triggers WHERE User_ID = ?`;
                database_connection.query(query, [User_ID], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if( result.length > 0) {
                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                            console.log(result);
                            resolve(result);
                        }
                        else {
                            resolve(''); 
                        }

                    }
                });
            }
        });
    });
}


module.exports = {
    getTriggersList
}