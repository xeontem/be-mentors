const fs = require('fs');
const { mergeJsons } = require('./utils');
const { JSON_WRITTED, JSON_UPDATED, PAIRS_LOADED, TASKS_LOADED } = require('./constants');
const Emitter = require('events');
const emitter = new Emitter();

let pairsJson, tasksJson, resultJson;
let NEW_PAIRS_WRITED = false;
let NEW_TASKS_WRITED = false;

const getNEW_PAIRS_WRITED = () => NEW_PAIRS_WRITED;
const setNEW_PAIRS_WRITED = bool => {
  NEW_PAIRS_WRITED = bool;
};

const getNEW_TASKS_WRITED = () => NEW_TASKS_WRITED;
const setNEW_TASKS_WRITED = bool => {
  NEW_TASKS_WRITED = bool;
};

const attachEvents = () => {
  emitter.on(PAIRS_LOADED, payload => {
    pairsJson = payload;
    resultJson = tasksJson ? mergeJsons(payload, tasksJson) : payload;
    setNEW_PAIRS_WRITED(true);
    console.log('Pairs merged');
    emitter.emit(JSON_UPDATED);
  });

  emitter.on(TASKS_LOADED, payload => {
    tasksJson = payload;
    resultJson = pairsJson ? mergeJsons(pairsJson, payload) : resultJson;
    setNEW_TASKS_WRITED(true);
    console.log('Tasks merged');
    emitter.emit(JSON_UPDATED);
  });

  emitter.on(JSON_UPDATED, () => {
    if (getNEW_PAIRS_WRITED() && getNEW_TASKS_WRITED()) {
      fs.writeFile('./data.json', JSON.stringify(resultJson, null, 2), 'utf8', () => {
        emitter.emit(JSON_WRITTED);
        console.log('writing data to test.json file done!');
      });
    }
  });
};

module.exports = {
  attachEvents, emitter, getNEW_PAIRS_WRITED, setNEW_PAIRS_WRITED, getNEW_TASKS_WRITED, setNEW_TASKS_WRITED
};
