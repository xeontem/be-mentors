const { attachEvents } = require('./events');
const { fetchData } = require('./requests');
const { startServer } = require('./server');

// attach events for save fetched data
attachEvents();

// start fetching data
fetchData();

// start express server
startServer();
