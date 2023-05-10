const database_connection = require('./Database_Connection');
let server_connection = require('./server_conn');
const axios = require('axios');
const express = require('express');
server_connection.use(express.json());



function addComment(userID, comm_cont, post_ID) {
    return new Promise((resolve, reject) => {
      const comment_ID = Math.floor(Math.random() * 900000) + 100000;
  
      database_connection.connect(function (err) {
        if (err) {
          console.error('Error connecting: ' + err.stack);
          reject(err);
        } else {
          console.log('Connected to the database as id ' + database_connection.threadId);
  
          const timestamp = Date.now();
  
          const query = `INSERT INTO comment (comment_ID, user_ID, comment_Content, post_ID, comm_Time) VALUES ('${comment_ID}', '${userID}', '${comm_cont}', '${post_ID}', FROM_UNIXTIME('${timestamp/1000}'))`;
  
          database_connection.query(query, (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log("Comment successfully added.");
              resolve();
            }
          });
        }
      });
    });
  }
  


function getAllCommentByPost(post_ID) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    return new Promise((resolve, reject) => {

        const query = `SELECT comment.*, user.User_Name, user.Prof_Img
        FROM comment
        INNER JOIN user
        ON comment.user_ID = user.User_ID
        WHERE comment.post_ID = '${post_ID}'
        ORDER BY comment.comm_Time DESC`;

        database_connection.query(query, (err, result) => {
          if (err) {
            console.log('***** ', err);
            reject(err);
          } else {
            console.log('111 ---- ', result);
            formatteTimestamp(result)
            .then((formattedMessage) => {
                console.log(formattedMessage);
                resolve(formattedMessage);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      });
}


function formatteTimestamp(Comment_Array) {
    return new Promise((resolve, reject) => {
        Comment_Array.forEach(object => {
        const date = new Date(object.comm_Time);
        const now = new Date();
        
        if (date.toDateString() === now.toDateString()) {
          const diff_Time_in_min = Math.floor((now.getTime() - date.getTime()) / 60000); // Difference in minutes
          let temp_time = '';
          if (diff_Time_in_min < 60) {
            temp_time = `${diff_Time_in_min} min ago`;
            object.comm_Time = temp_time;
          } else {
            const diff_Time_in_hours = Math.floor(diff_Time_in_min / 60); // Difference in hours
            temp_time = `${diff_Time_in_hours} hour${diff_Time_in_hours > 1 ? 's' : ''} ago`;
            object.comm_Time = temp_time;
          }
        } else {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const temp_date = `${day}/${month}/${year}`;
          object.comm_Time = temp_date;
        }
      });
      resolve(Comment_Array);
    });
  }



module.exports = {
    addComment,
    getAllCommentByPost
};