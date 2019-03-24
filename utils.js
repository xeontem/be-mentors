const { GITHUB_PATTERN } = require('./constants');

const pairsAdapter = (total, row) => ({
  ...total,
  [row.c['1'].v]: {
    date: row.c['0'].v,
    mentorNick: row.c['1'].v.slice(row.c['1'].v.indexOf(GITHUB_PATTERN) + GITHUB_PATTERN.length),
    taskName: row.c['3'].v,
    taskLink: null,
    taskStatus: null,
    studentNick: row.c['2'].v.slice(row.c['2'].v.indexOf(GITHUB_PATTERN) + GITHUB_PATTERN.length),
    studentGitHub: row.c['2'].v,
    prLink: row.c['4'].v,
    score: row.c['5'].v,
    feedback: row.c['6'].v
  }
});

const tasksAdapter = (total, row) => row.c['0'].v === 'task' ? total : ({
  ...total,
  [row.c['0'].v]: {
    taskName: row.c['0'].v,
    taskLink: row.c['1'] ? row.c['1'].v : '',
    taskStatus: row.c['2'].v,
  }
});

const mergeJsons = (pairs, tasks) => Object.keys(pairs).reduce((total, key) =>
  ({ ...total, [key]: { ...pairs[key], ...tasks[pairs[key].taskName] } }), {});

module.exports = { pairsAdapter, tasksAdapter, mergeJsons };
