const database_connection = require('./Database_Connection');
let server_connection = require('./server_conn');
const axios = require('axios');
const express = require('express');
server_connection.use(express.json());
const Liked = require('./Liked');


function addMyPost(userID, post_Cont){
  return new Promise((resolve, reject) => {
    const postID = Math.floor(Math.random() * 900000) + 100000;
    const liked = 0;

    database_connection.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err);
      } else {
        console.log('Connected to the database as id ' + database_connection.threadId);

        const timestamp = Date.now();

        const query = "INSERT INTO social(post_id, user_ID, time, post, liked) VALUES (?, ?, FROM_UNIXTIME(?/1000), ?, ?)";
        database_connection.query(query, [postID, userID, timestamp, post_Cont, liked], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("Post successfully added.");
            resolve();
          }
        });
      }
    });
  });
}




function getMyPostDetails(user_ID) {

  database_connection.connect(function (err) {
      if (err) {
          console.error('Error connecting: ' + err.stack);
          return;
      }
      console.log('Connected to the database as id ' + database_connection.threadId);
  });

  return new Promise((resolve, reject) => {


      const query = `SELECT *
      FROM social
      WHERE user_ID = '${user_ID}'
      ORDER BY social.time DESC
      `;
      database_connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
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







function getPostDetails() {

    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    return new Promise((resolve, reject) => {


        const query = `SELECT social.*, user.User_Name, user.Prof_Img
        FROM social
        JOIN user ON social.user_ID = user.User_ID
        ORDER BY social.time DESC
        `;
        database_connection.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
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

function formatteTimestamp(Post_Array) {
    return new Promise((resolve, reject) => {
      Post_Array.forEach(object => {
        const date = new Date(object.time);
        const now = new Date();
        
        if (date.toDateString() === now.toDateString()) {
          const diff_Time_in_min = Math.floor((now.getTime() - date.getTime()) / 60000); // Difference in minutes
          let temp_time = '';
          if (diff_Time_in_min < 60) {
            temp_time = `${diff_Time_in_min} min ago`;
            object.time = temp_time;
          } else {
            const diff_Time_in_hours = Math.floor(diff_Time_in_min / 60); // Difference in hours
            temp_time = `${diff_Time_in_hours} hour${diff_Time_in_hours > 1 ? 's' : ''} ago`;
            object.time = temp_time;
          }
        } else {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const temp_date = `${day}/${month}/${year}`;
          object.time = temp_date;
        }
      });
      resolve(Post_Array);
    });
  }
  

  function updateLikesPlus(user_ID, post_ID){
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    return new Promise((resolve, reject) => { 
    let query = `UPDATE social SET liked = liked + 1 WHERE post_id = '${post_ID}'`;
    database_connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
          } else {
              console.log(`likes successfully update in db.`);
              let getNewLikes = `SELECT liked FROM social WHERE post_id = '${post_ID}'`;
        database_connection.query(getNewLikes, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result[0].liked);
            Liked.addNewLikes(user_ID, post_ID);
          } 
        });
          }
    });
});
  }

  function updateLikesMin(user_ID, post_ID){
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    return new Promise((resolve, reject) => { 
    let query = `UPDATE social SET liked = liked - 1 WHERE post_id = '${post_ID}'`;
    database_connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
          } else {
              console.log(`likes successfully update in db.`);
              let getNewLikes = `SELECT liked FROM social WHERE post_id = '${post_ID}'`;
        database_connection.query(getNewLikes, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result[0].liked);
            Liked.deleteLike(user_ID, post_ID);
          } 
        });
          }
    });
});
  }

module.exports = {
    getPostDetails,
    updateLikesPlus,
    updateLikesMin,
    getMyPostDetails,
    addMyPost
};