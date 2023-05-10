const database_connection = require('./Database_Connection');
let server_connection = require('./server_conn');
const axios = require('axios');
const express = require('express');
server_connection.use(express.json());

function getPostLikedID(user_ID) {
    database_connection.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
      }
      console.log('Connected to the database as id ' + database_connection.threadId);
    });
  
    return new Promise((resolve, reject) => {
      const query = `SELECT post_id FROM postliked WHERE user_id = '${user_ID}'`;
      database_connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          console.log(result, ' from A');
        }
      });
    });
  }

function addNewLikes(userID, postID) {
    database_connection.connect(function (err) {
        if (err) {
          console.error('Error connecting: ' + err.stack);
          return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
      });

      const query = `INSERT INTO postliked (User_ID, Post_ID) VALUES ('${userID}', '${postID}')`;
      database_connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("like successfully added.")
        }
    });
    
}


function deleteLike(userID, postID) {
    database_connection.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
      }
      console.log('Connected to the database as id ' + database_connection.threadId);
    });
  
    const query = `DELETE FROM postliked WHERE User_ID = '${userID}' AND Post_ID = '${postID}'`;
    database_connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("like successfully deleted.")
      }
    });
  }

  

module.exports = {
    getPostLikedID,
    addNewLikes,
    deleteLike
};