const FETCH_INTERVAL = 1000 * 60;
const PAIRS = 'PAIRS';
const TASKS = 'TASKS';
const PAIRS_LOADED = 'PAIRS_LOADED';
const TASKS_LOADED = 'TASKS_LOADED';
const JSON_UPDATED = 'JSON_UPDATED';
const JSON_WRITTED = 'JSON_WRITTED';
const SHEET_URI = 'https://docs.google.com/spreadsheets/d/';
const TASKS_SHEET_ID = '1uojrkWfoLh9oTKxLWCdirrNJYGVfCtiF9RlZrwsxSbo';
const PAIRS_SHEET_ID = '18exMEOWGKsMPggt0t3yU-MR1gvX3OFBDqKCvdNy8rAU';
const PAIRS_SHEET_QUERY = '/gviz/tq?tq=select%20A,B,C,D,E,F,G';
const TASKS_SHEET_QUERY = '/gviz/tq?tq=select%20A,B,C';
const GITHUB_PATTERN = 'github.com/';
const FETCH_ATTRS = [
  {
    name: PAIRS,
    url: SHEET_URI + PAIRS_SHEET_ID + PAIRS_SHEET_QUERY,
    adapter: 'pairsAdapter',
    event: PAIRS_LOADED
  },
  {
    name: TASKS,
    url: SHEET_URI + TASKS_SHEET_ID + TASKS_SHEET_QUERY,
    adapter: 'tasksAdapter',
    event: TASKS_LOADED
  }
];

module.exports = {
  FETCH_ATTRS, GITHUB_PATTERN, FETCH_INTERVAL, PAIRS_LOADED, TASKS_LOADED, JSON_UPDATED, JSON_WRITTED, PAIRS, TASKS
};
