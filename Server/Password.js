const server_connection = require('./server_conn');
const database_connection = require('./Database_Connection');
const axios = require('axios');
const mysql = require('mysql2');
const express = require('express');
const crypto = require('crypto');
const User = require('./User');






function checkPass(userID, password) {
    console.log(userID);
    console.log(password);

    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    return new Promise((resolve, reject) => {
        database_connection.query(`SELECT * FROM password WHERE User_ID = '${userID}'`, async (error, results) => {
            console.log(results);
            if (error) {
                console.log(error);
                throw error;
            }

            let status = '';

            if (results.length > 0) {
                console.log("got it");

                let get_password = results[0].Hash_Password;
                let salt = results[0].Salt;
                let com_Salt_Pass = password + salt;

                let pass_with_md5 = crypto.createHash('md5').update(com_Salt_Pass).digest('hex');
                console.log('MD5 hash:', pass_with_md5);

                let com_md5_salt = pass_with_md5 + salt;
                let pass_with_sha1 = crypto.createHash('sha1').update(com_md5_salt).digest('hex');

                console.log('SHA1 hash:', pass_with_sha1);

                try {
                    if (String(pass_with_sha1) === String(get_password)) {
                        status = 'matched';
                        console.log(status);
                        console.log('error line 1');
 
                        //sendLoginStatus(status, (updatedStatus) => {
                          //  console.log('Updated status:', updatedStatus);
                        //});
                    }
                    else {
                        status = 'notMatched1';
                        console.log(status);
                        // sendLoginStatus(status, (updatedStatus) => {
                        //     console.log('Updated status:', updatedStatus);
                        // });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                status = 'notMatched2';
                console.log(status);
                // sendLoginStatus(status, (updatedStatus) => {
                //     console.log('Updated status:', updatedStatus);
                // });
            }

            resolve(status);
        });
    });

}



function insertPassword(User_ID, Password) {
    const salt = Math.random().toString(36).substr(2, 26);
    const saltedPassword = Password + salt;
    let pass_with_md5 = crypto.createHash('md5').update(saltedPassword).digest('hex');
    let com_md5_salt = pass_with_md5 + salt;
    let pass_with_sha1 = crypto.createHash('sha1').update(com_md5_salt).digest('hex');

    return new Promise((resolve, reject) => {
    const sql = `INSERT INTO password (User_ID, Salt, Hash_Password) VALUES (?, ?, ?)`;
    database_connection.query(sql, [User_ID, salt, pass_with_sha1], function (error, results, fields) {
    if (error) {
        console.log(error);
        reject(error);
    } else {
        console.log(`Password for user ID ${User_ID} created successfully.`);
        resolve('created successfully');
    }
    });
});
}

function ChangePassword(user_ID, old_Password, new_Password) {
    return new Promise((resolve, reject) => {
    checkPass(user_ID, old_Password)
    .then((matchWithOld) => {
        if(matchWithOld === 'matched') {
            const salt = Math.random().toString(36).substr(2, 26);
            const saltedPassword = new_Password + salt;
            let pass_with_md5 = crypto.createHash('md5').update(saltedPassword).digest('hex');
            let com_md5_salt = pass_with_md5 + salt;
            let pass_with_sha1 = crypto.createHash('sha1').update(com_md5_salt).digest('hex');
    
            const sql = `UPDATE password SET Salt = ?, Hash_Password = ? WHERE User_ID = ?`;
            database_connection.query(sql, [salt, pass_with_sha1, user_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(`Password Update for user ID ${user_ID} done successfully.`);
                resolve('Done');
            }
            });
        }
        else {
            resolve('notMatched');
        }
    })
    .catch((error) => {
        console.log(error);
        resolve('notMatched');
    })
    
    });
}

module.exports = {
    checkPass,
    insertPassword,
    ChangePassword
};