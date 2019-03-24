const { FETCH_ATTRS, FETCH_INTERVAL, PAIRS } = require('./constants');
const adapters = require('./utils');
const request = require('request');
const { emitter, setNEW_PAIRS_WRITED, setNEW_TASKS_WRITED } = require('./events');

const fetchData = () => {
  FETCH_ATTRS.forEach(({ url, adapter, event, name }, index) => {
    name === PAIRS ? setNEW_PAIRS_WRITED(false) : setNEW_TASKS_WRITED(false);
    request({ url }, (err, result, body) => {
      console.log('Request for sheet: ', name);
      const data = JSON.parse(body.slice(body.indexOf('setResponse(') + 12, -2));
      const parsed = data.table.rows.reduce(adapters[adapter], {});
      emitter.emit(event, parsed);
    });
  });
};
setInterval(fetchData, FETCH_INTERVAL);

module.exports = { fetchData };
