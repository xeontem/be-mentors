const express = require('express');
const path = require('path');
const { emitter } = require('./events');
const { JSON_WRITTED } = require('./constants');
const { fetchData } = require('./requests');

const startServer = () => {
  const app = express();
  app.get('/json', (req, res, next) => {
    console.log('test.json have been requested by ', req.hostname);
    // fetchData();
    // emitter.on(JSON_WRITTED, () => {
    //   console.log('json sent to the client');
    // });
    next();
  });
  app.use('/json', express.static(path.join(__dirname, 'data.json')));
  app.listen(process.env.PORT || 4444);
  console.log('Server started at port: ', process.env.PORT || 4444);
};

module.exports = { startServer };
