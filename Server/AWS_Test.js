const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
  host: 'breath-test.clcohhcxscoj.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'AsthmaTest1',
  database: 'breath',
});

function getAllDetails(User_ID) {
    return new Promise((resolve, reject) => {
        connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
            } else {
                console.log('Connected to the database as id ' + connection.threadId);

                const query = `SELECT u.User_Name, u.Email, DATE_FORMAT(u.DOB, '%Y-%m-%d') AS DOB, u.Medical_Condition, u.Address, a.Assessment_Condition FROM user AS u LEFT JOIN ( SELECT User_ID, Assessment_Condition FROM assessment ORDER BY Assessment_ID DESC LIMIT 1 ) AS a ON u.User_ID = a.User_ID WHERE u.User_ID = ?`;
                connection.query(query, [User_ID], (err, result) => {
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



getAllDetails(772152);
