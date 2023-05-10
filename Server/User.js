const server_connection = require('./server_conn');
const database_connection = require('./Database_Connection');
const axios = require('axios');
const mysql = require('mysql2');
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const Password = require('./Password');
const moment = require('moment');




function addUserToDatabase(user_Name, ph_Num, email, dOb, address, password) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });


    return new Promise((resolve, reject) => { 
        let Prof_Img = 'https://asthmabucket.s3.ap-southeast-2.amazonaws.com/symptoms_indicate.jpg';
        const userID = Math.floor(Math.random() * 900000) + 100000;
        console.log(userID);
        let Medical_Condition = 'None';
        const dob = moment(dOb, 'DD/MM/YYYY').toDate();


        const sql = `INSERT INTO user (User_ID, User_Name, P_Number, Email, DOB, Address, Medical_Condition, Prof_Img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        database_connection.query(sql, [userID, user_Name, ph_Num, email, dob, address, Medical_Condition, Prof_Img], function (error, results, fields) {
            if (error) {
              console.log(error);
              reject(error);
            } else {
                Password.insertPassword(userID, password).then((result) => {
                    if(result === 'created successfully'){
                        console.log(`User ${user_Name} created successfully.`);
                        resolve(userID);
                    }
                    else {
                        console.log(`User ${user_Name} created unsuccessful.`);
                        resolve('unsuccessful');
                    }
                })
                .catch((call_error) => {
                    console.log(call_error);
                    console.log("try error from call function");
                    reject(call_error);
                });

            }
          });
    });
}


async function getUserNameAndProfPic(userID){
    console.log('error line 4');
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    try {
        return await new Promise((resolve, reject) => {
            console.log('error line 5');
            const query = 'SELECT User_Name, Prof_Img FROM user WHERE User_ID = ?';
            database_connection.query(query, [userID], function (error, results, fields) {
                if (error) {
                    console.log('error line 6');
                    reject(error);
                } else {
                    console.log('error line 7');
                    resolve(results[0]);
                }
            });

        });
    } catch (call_error) {
        console.log(call_error);
        console.log("try error from call function");
        reject(call_error);
    }
}


function getAllDetails(User_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const query = `SELECT u.User_Name, u.Email, DATE_FORMAT(u.DOB, '%Y-%m-%d') AS DOB, u.Medical_Condition, u.Address, a.Assessment_Condition FROM user AS u LEFT JOIN ( SELECT User_ID, Assessment_Condition FROM assessment ORDER BY Assessment_ID DESC LIMIT 1 ) AS a ON u.User_ID = a.User_ID WHERE u.User_ID = ?`;
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



function updateDetails(userID, userName, dob, email, address, m_condition, triggers){
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);
                const tempDob = moment(dob, 'DD/MM/YYYY').toDate();

                const updateQuery1 = `UPDATE user SET User_Name = ?, Email = ?, DOB = ?, Address = ?, Medical_Condition = ? WHERE User_ID = ?`;
                const deletQuery = `DELETE FROM triggers WHERE User_ID = ?`;
                const insQuery = `INSERT INTO triggers (User_ID, Triggers_Name) VALUES (?, ?)`;

                database_connection.query(deletQuery, userID, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        for(let i = 0; i<triggers.length; i++){
                        database_connection.query(insQuery, [userID, triggers[i]], (err, result2) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else { 
                                console.log('Done-----!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                            }
                        })
                    }
                    try{
                    database_connection.query(updateQuery1, [userName, email, tempDob, address, m_condition, userID, triggers], (err, result3) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else{
                            console.log('Done');
                                resolve('Done');
                        }
                    })
                }
                catch(err_catch) {
                    console.log(err_catch);
                }

                        

                    }
                });
            }
        });
    });
}



module.exports = {
    addUserToDatabase,
    getUserNameAndProfPic,
    getAllDetails,
    updateDetails
  }