const database_connection = require('./Database_Connection');

function getUserJoinedGroups(userID) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });
    return new Promise((resolve, reject) => {

        database_connection.query("SELECT Group_ID, Group_Name FROM groups WHERE Group_Members = ?", [userID], (err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
                reject(err);
            }else {
                resolve(results);
            }

        });
    });
}


function getNotJoinedGroups(userID) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });
    return new Promise((resolve, reject) => {

        database_connection.query("SELECT DISTINCT Group_ID, Group_Name FROM groups WHERE Group_ID NOT IN (SELECT Group_ID FROM groups WHERE Group_Members = ?)", [userID], (err, results) => {
            //console.log(results);
            if (err) {
                console.log(err);
                reject(err);
            }else {
                resolve(results);
            }

        });
    });
}

function setUserJoinedGroup(userID, groupID, groupName) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });

    database_connection.query(`INSERT INTO groups (Group_ID, Group_Name, Group_Members) VALUES (${groupID}, '${groupName}', '${userID}')`, function (error, results, fields) {
        //console.log(results);
        if (error) {
            console.log(error);
            reject(error);
        }else {
            console.log(`User ${userID} joined group ${groupName} successfully.`);
        }

    });
}

function createGroup(userID, groupID, groupName) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });
    database_connection.query(`INSERT INTO groups (Group_ID, Group_Name, Group_Members) VALUES (${groupID}, '${groupName}', '${userID}')`, function (error, results, fields) {
        //console.log(results);
        if (error) {
            console.log(error);
            reject(error);
        }else {
            console.log(`Group ${groupName} created successfully.`);
        }
    });
}


function leaveGroup(userID, groupID) {
    database_connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected to the database as id ' + database_connection.threadId);
    });
    database_connection.query(`DELETE FROM groups WHERE Group_ID = ${groupID} AND Group_Members LIKE '%${userID}%'`, function (error, results, fields) {
        //console.log(results);
        if (error) {
            console.log(error);
            reject(error);
        }else {
            console.log(`User ${userID} successfully left from group ${groupID}`);
        }
    });
}



module.exports = {
    getUserJoinedGroups,
    getNotJoinedGroups,
    setUserJoinedGroup,
    createGroup,
    leaveGroup
};