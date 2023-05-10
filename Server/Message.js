const database_connection = require('./Database_Connection');
const group = require('./Group');
let server_connection = require('./server_conn');
const axios = require('axios');
const express = require('express');
server_connection.use(express.json());

function getMessagesByGroupID(groupID) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    return new Promise((resolve, reject) => {
      const query = `SELECT Sender_ID, Message_Content, Timestamp FROM messages WHERE Group_ID = ${groupID}`;
      database_connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  
  function insertMessage(groupID, senderID, messageContent, timestamp) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

      database_connection.query(`INSERT INTO messages (Group_ID, Sender_ID, Message_Content, Timestamp) VALUES (${groupID}, ${senderID}, '${messageContent}', '${timestamp}')`, function (error, results, fields) {
        if (err) {
          console.log(err);
        } else {
            console.log(`User ${senderID} successfully add a message.`);
        }
      });
  }

  function getLastMessageForGroups(userID) {
    database_connection.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
      }
      console.log('Connected to the database as id ' + database_connection.threadId);
    });
  
    return new Promise((resolve, reject) => {
      console.log('3 userID: ',userID);
      group.getUserJoinedGroups(userID)
        .then((results) => {
          const groupIDs = results.map((group) => group.Group_ID).join(',');
  
          const sql_to_get_last_mess = `
          SELECT DISTINCT
            g.Group_Name,
            m.Sender_ID,
            m.Message_Content,
            m.Timestamp
          FROM
            messages m
            INNER JOIN groups g ON m.Group_ID = g.Group_ID
          WHERE
            m.Group_ID IN (${groupIDs})
            AND m.Timestamp = (
              SELECT MAX(Timestamp)
              FROM messages
              WHERE Group_ID = m.Group_ID
            )
        `;
        
  
          database_connection.query(sql_to_get_last_mess, (err, result) => {
            if (err) {
              reject(err);
            } else {
              console.log('11111: ', result);

              formatteTimestamp(result)
              .then((formattedMessage) => {
                console.log(formattedMessage);
                resolve(result);
              })
              .catch((error) => {
                console.error(error);
              });

            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function formatteTimestamp(message_Array) {
    return new Promise((resolve, reject) => {
      message_Array.forEach(object => {
        const date = new Date(object.Timestamp);
        const now = new Date();
      
        if (date.toDateString() === now.toDateString()) {
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const temp_time = `${hours}:${minutes}`;
          object.Timestamp = temp_time;
        } else {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const temp_date = `${day}/${month}/${year}`;
          object.Timestamp = temp_date;
        }
      });
      resolve(message_Array);
    });
  }
  
  
let groups_with_message = '';
let temp_useID = '';
  async function sendLastMessage(userID) {
    let temp_groups_with_message = '';
    temp_useID = userID;
    server_connection.get('/view_joined_groups_with_last_message', async (req, res) => {
      try{
        groups_with_message = '';
        groups_with_message = await getLastMessageForGroups(temp_useID);
        temp_useID = '';
        console.log(groups_with_message);
        console.log('--------------------------------------------------------------------------------');
        temp_groups_with_message = groups_with_message;
          res.json(temp_groups_with_message);
          groups_with_message = '';
      } catch(error) {
        console.error(error);
      }
  });
  }
  
  


  module.exports = {
    getMessagesByGroupID,
    insertMessage,
    getLastMessageForGroups,
    sendLastMessage
};
  