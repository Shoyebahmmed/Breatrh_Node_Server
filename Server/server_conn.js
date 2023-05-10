const express = require('express');
const app = express();
const port = process.env.PORT || 8888;


app.listen(port, () => {
  console.log('Server listening on port 8888');
});

module.exports = app;