const express = require('express');
const app = express();


app.listen(8888, () => {
  console.log('Server listening on port 8888');
});

module.exports = app;