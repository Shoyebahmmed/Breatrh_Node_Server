const server_connection = require('./server_conn');
const database_connection = require('./Database_Connection');
const axios = require('axios');
const mysql = require('mysql2');
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const Password = require('./Password');
const moment = require('moment');


function getDiaryNotes(User_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const query = `SELECT * FROM diary WHERE User_ID = ? ORDER BY Date DESC, Time DESC`;

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


function addNoteToDiary(User_ID, title, content) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const today = new Date();
                const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
                const time = `${today.getHours()}:${today.getMinutes()}`;
                const diary_ID = Math.floor(Math.random() * 900000) + 100000;

                const query = `INSERT INTO diary (User_ID, Diary_ID, Title, Content, Date, Time) VALUES (?, ?, ?, ?, ?, ?)`;
                database_connection.query(query, [User_ID, diary_ID, title, content, date, time], (err, result) => {
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
    getDiaryNotes,
    addNoteToDiary
}