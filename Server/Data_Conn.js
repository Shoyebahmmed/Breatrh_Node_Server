const Login = require('./login');
const mysql = require('mysql2');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'asthma'
});


connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});



let loginArray = [];

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM password", function (err, result, fields) {
    if (err) throw err;
    result.forEach(row => {
      let login = new Login(row.User_ID, row.Hash_Password);
      loginArray.push(login);
    });
    console.log(loginArray);
  });
});


app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body);

  const userName = req.body.userName;
  const password = req.body.password;
  res.send('Data received');



    const valueToCheck = 'some value';

  // perform the query
  connection.query(`SELECT * FROM password WHERE User_ID = '${userName}'`, (error, results) => {
    if (error) throw error;
    

    app.get('/check-value', (rreq, rres) => {
    // check if the value exists in the database
    if (results.length > 0) {
      //console.log(`The value '${userName}' exists in the database.`);
      //console.log(results[0].Hash_Password);
      let pass = results[0].Hash_Password;
      //console.log(typeof(pass));

      
      if (String(pass) === password) {
        //console.log("Done");
        rres.send({
          message: `The value '${valueToCheck}' exists in the database.`,
          status: 'success'
        });

      }
    } else {
      rres.send({
        message: `The value '${valueToCheck}' does not exist in the database.`,
        status: 'failure'
      });
      console.log(`The value '${valueToCheck}' does not exist in the database.`);
    }
  });
});


  
  });


app.listen(8088, () => {
  console.log('Server listening on port 3000');
});
