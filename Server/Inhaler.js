const database_connection = require('./Database_Connection');
let server_connection = require('./server_conn');
const axios = require('axios');
const express = require('express');
server_connection.use(express.json());
const moment = require('moment');


function addInhaler(User_ID, Inhaler_Name, Type, Expiry_Date, Num_of_Puffs, Puffs_Per_Day) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const Inhaler_ID = Math.floor(Math.random() * 900000) + 100000;

                const Num_of_Puffs_Taken = 0;
                const Puffs_Used = 0;
                const tempExpiryDate = moment(Expiry_Date, 'DD/MM/YYYY').toDate();
                const today = moment().format('YYYY-MM-DD');
                const Expected_End_Date = moment().add(Num_of_Puffs / Puffs_Per_Day, 'days').format('YYYY-MM-DD');

                //const Expected_End_Date = today + ((Num_of_Puffs / Puffs_Per_Day) * 86400000);
                //const dob = moment(dOb, 'DD/MM/YYYY').toDate();

                


                const query1 = `INSERT INTO inhaler(User_ID, Inhaler_ID, Inhaler_Name, Type, Start_Date, Expiry_Date, Num_of_Puffs, Puffs_Per_Day, Num_of_Puffs_Taken, Expected_End_Date) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                User_ID = VALUES(User_ID), 
                Inhaler_ID = VALUES(Inhaler_ID), 
                Inhaler_Name = VALUES(Inhaler_Name), 
                Type = VALUES(Type), 
                Start_Date = VALUES(Start_Date), 
                Expiry_Date = VALUES(Expiry_Date), 
                Num_of_Puffs = VALUES(Num_of_Puffs), 
                Puffs_Per_Day = VALUES(Puffs_Per_Day),
                Num_of_Puffs_Taken = VALUES(Num_of_Puffs_Taken),
                Expected_End_Date = VALUES(Expected_End_Date)`;



                const query2 = `INSERT INTO inhaler_daily_usage(User_ID, Inhaler_ID, Record_Date, Puffs_Used) 
                VALUES (?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                User_ID = VALUES(User_ID), 
                Inhaler_ID = VALUES(Inhaler_ID), 
                Record_Date = VALUES(Record_Date), 
                Puffs_Used = VALUES(Puffs_Used)`;


                database_connection.query(query1, [User_ID, Inhaler_ID, Inhaler_Name, Type, today, tempExpiryDate, Num_of_Puffs, Puffs_Per_Day, Num_of_Puffs_Taken, Expected_End_Date], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        database_connection.query(query2, [User_ID, Inhaler_ID, today, Puffs_Used], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                console.log("Inhaler successfully added in Inhaler and daily used.");
                                resolve("Inhaler successfully added in Inhaler and daily used.");
                            }
                        });
                    }
                });
            }
        });
    })
}


function getUserInhalerInfo(User_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const query = `SELECT * FROM inhaler INNER JOIN inhaler_daily_usage ON inhaler.Inhaler_ID = inhaler_daily_usage.Inhaler_ID WHERE inhaler.User_ID = ?`;


                updatePuffsUsedDaily(User_ID)
                .then((status) => {
                    if (status === 'successful') {
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
                    else{
                        console.log(`Result not found for user ID = ${User_ID}`);
                        resolve('');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        });
    });
}



function updatePuffsUsedDaily(User_ID) {
    return new Promise((resolve, reject) => {
                const today = moment().format('YYYY-MM-DD');

                const query = `SELECT * FROM inhaler_daily_usage WHERE User_ID = ?`;

                database_connection.query(query, [User_ID], (err, result) => {
                    if (err) {
                        console.log(err, '***************************************');
                        reject(err);
                    } else {
                        if (result.length === 0) {
                            console.log(`Result not found for user ID = ${User_ID}`);
                            resolve('unsuccessful');
                        } else {

                            for(let i = 0; i < result.length; i++) {
                                let dataDate = result[i].Record_Date;
                                console.log(dataDate);

                                if( dataDate != today) {
                                    let puffs = 0;
                                    const updateQuery = `UPDATE inhaler_daily_usage SET Puffs_Used = ? WHERE User_ID = ? AND Record_Date = ?`;
                                    database_connection.query(updateQuery, [puffs, User_ID, dataDate], (err, result) => {
                                        if (err) {
                                            console.log(err, '__________________________');
                                            reject(err);
                                        } 
                                    });
                                }
                            }
                                resolve('successful');
                        }
                    }
                });
    });
}


function addPuff(User_ID, Inhaler_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);
                const numbers_puff = 1;
                totalPuffCount(User_ID, Inhaler_ID, numbers_puff)
                .then((status) => {
                    if(status) {
                        const inhalerQuery = `UPDATE inhaler SET Num_of_Puffs_Taken = Num_of_Puffs_Taken + ? WHERE User_ID = ? AND Inhaler_ID = ?`;
                        const inhalerDailyQuery = `UPDATE inhaler_daily_usage SET Puffs_Used = Puffs_Used + ? WHERE User_ID = ? AND Inhaler_ID = ?`;
    
                        database_connection.query(inhalerQuery, [numbers_puff, User_ID, Inhaler_ID], (err, inhalerResult) => {
                            if (err) {
                                console.log(err);
                                reject(new Error(`Update was not successful for user ID = ${User_ID}`));
                            } else {
                                database_connection.query(inhalerDailyQuery, [numbers_puff, User_ID, Inhaler_ID], (err, inhalerDailyResult) => {
                                    if (err) {
                                        console.log(err);
                                        reject(new Error(`Update was not successful for user ID = ${User_ID}`));
                                    } else {
                                        console.log("Successfully add puff in Inhaler and daily used.");
                                        resolve('done');
                                    }
                                });
                            }
                        });
                    }
                    else {
                        resolve('notdone');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve('notdone');
                })

            }
        });
    });
}


function totalPuffCount (User_ID, Inhaler_ID, numbers_puff) {
    const inhalerQuery = `SELECT Num_of_Puffs, Puffs_Per_Day, Num_of_Puffs_Taken FROM inhaler WHERE User_ID = ? AND Inhaler_ID = ?`;
    const inhalerDailyQuery = `SELECT Puffs_Used FROM inhaler_daily_usage WHERE User_ID = ? AND Inhaler_ID = ?`;

    return new Promise((resolve, reject) => {
        database_connection.query(inhalerQuery, [User_ID, Inhaler_ID], (err, inhalerResult) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                database_connection.query(inhalerDailyQuery, [User_ID, Inhaler_ID], (err, inhalerDailyResult) => {
                    if (err) {
                        console.log(err);
                        reject(false);
                    } else {
                        const Num_of_Puffs = inhalerResult[0].Num_of_Puffs;
                        const Puffs_Per_Day = inhalerResult[0].Puffs_Per_Day;
                        const Num_of_Puffs_Taken = inhalerResult[0].Num_of_Puffs_Taken;
                        const Puffs_Used = inhalerDailyResult[0].Puffs_Used;

                        const tempTotalUsedPuff = Num_of_Puffs_Taken + numbers_puff;
                        const tempDalyUsedPuff = Puffs_Used + numbers_puff;

                        if(tempTotalUsedPuff > Num_of_Puffs || tempDalyUsedPuff > Puffs_Per_Day){
                            resolve(false);
                        }
                        else{
                            resolve(true);
                        }
                    }
                });
            }
        });

    });

}

function removePuff(User_ID, Inhaler_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);
                    const numbers_puff = 1;

                    const inhalerQuery = `UPDATE inhaler SET Num_of_Puffs_Taken = Num_of_Puffs_Taken - ? WHERE User_ID = ? AND Inhaler_ID = ?`;
                    const inhalerDailyQuery = `UPDATE inhaler_daily_usage SET Puffs_Used = Puffs_Used - ? WHERE User_ID = ? AND Inhaler_ID = ?`;

                    database_connection.query(inhalerQuery, [numbers_puff, User_ID, Inhaler_ID], (err, inhalerResult) => {
                        if (err) {
                            console.log(err);
                            reject(new Error(`Update was not successful for user ID = ${User_ID}`));
                        } else {
                            database_connection.query(inhalerDailyQuery, [numbers_puff, User_ID, Inhaler_ID], (err, inhalerDailyResult) => {
                                if (err) {
                                    console.log(err);
                                    reject(new Error(`Update was not successful for user ID = ${User_ID}`));
                                } else {
                                    console.log("Successfully remove puff in Inhaler and daily used.");
                                    resolve('done');
                                }
                            });
                        }
                    });
            }
        });
    });
}



function getPuffDetailsForHome(user_ID) {
    return new Promise((resolve, reject) => {
        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + database_connection.threadId);

                const inhalerQuery = `SELECT Inhaler_Name, Inhaler_ID, Num_of_Puffs, Puffs_Per_Day, Num_of_Puffs_Taken FROM inhaler WHERE User_ID = ? `;

                database_connection.query(inhalerQuery, [user_ID], (err, inhalerDailyResult) => {
                    if (err) {
                        console.log(err);
                        reject(false);
                    } else {
                        resolve(inhalerDailyResult);
                    }

                });
            }
        });
    });
}



module.exports = {
    addInhaler,
    getUserInhalerInfo,
    addPuff,
    removePuff,
    getPuffDetailsForHome
}