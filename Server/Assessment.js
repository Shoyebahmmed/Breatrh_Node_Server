const database_connection = require('./Database_Connection');
let server_connection = require('./server_conn');
const axios = require('axios');
const express = require('express');
server_connection.use(express.json());
const moment = require('moment');


function addAssessment(User_ID, assessmentScore, assessmentCondition) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);
                const query = `SELECT Assessment_No FROM assessment WHERE User_ID = ? ORDER BY Assessment_No DESC LIMIT 1   `;

                database_connection.query(query, [User_ID], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        let tempAssessmnetNo = 1;
                        if(result.length > 0) {
                            tempAssessmnetNo = result[0].Assessment_No + 1;
                            if(tempAssessmnetNo > 3) {
                                const delQue = `DELETE FROM assessment WHERE User_ID = ? AND Assessment_No = 1`;
                                database_connection.query(delQue, [User_ID], (err) => {
                                    if (err) {
                                        console.log(err);
                                        reject(err);
                                    }
                                });
                                const updQue = `UPDATE assessment SET Assessment_No = Assessment_No - 1 WHERE User_ID = ? AND Assessment_No > 1`;
                                database_connection.query(updQue, [User_ID], (err) => {
                                    if (err) {
                                        console.log(err);
                                        reject(err);
                                    }
                                });
                                tempAssessmnetNo = 3;
                            }
                        }
                        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        const today = new Date();
                        const assessmentDate = `${today.getDate()} ${months[today.getMonth()]}`;
                        const Assessment_ID = Math.floor(Math.random() * 900000) + 100000;

                        const insQue = `INSERT INTO assessment (User_ID, Assessment_ID, Assessment_No, Assessment_Date, Assessment_Score, Assessment_Condition) VALUES (?, ?, ?, ?, ?, ?)`;
                        database_connection.query(insQue, [User_ID, Assessment_ID, tempAssessmnetNo, assessmentDate, assessmentScore, assessmentCondition], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }else {
                                console.log("Assessment successfully added in the table.");
                                resolve("Assessment successfully added in the table.");
                            }
                        });
                    }
                });
            }
        });
    }); 
}




function getAssessmentDetailsByUserID(User_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const query = `SELECT * FROM assessment WHERE User_ID = ? ORDER BY Assessment_Date ASC, Assessment_No ASC`;
                database_connection.query(query, [User_ID], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        console.log(result);
                        resolve(result);
                    }
                });
            }
        });
    });
}


module.exports = {
    addAssessment,
    getAssessmentDetailsByUserID 
}