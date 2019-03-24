const fs = require('fs');
const XLSX = require('xlsx');

const taskWorkbook = XLSX.readFile('_data/Tasks.xlsx');
const workbook = XLSX.readFile('_data/Mentor score.xlsx');

const getData = sheet => Object.keys(sheet)
  .filter(key => key[0] === 'A')
  .map(akeys => akeys.slice(1));

const getTasks = sheet => getData(sheet).map(realIndex => ({
  taskName: sheet['A' + realIndex].v,
  taskLink: sheet['B' + realIndex].v,
  taskStatus: sheet['C' + realIndex].v,
}));

const getPairs = sheet => getData(sheet).map(realIndex => ({
  mentor: sheet['B' + realIndex].v,
  mentorNick: (sheet['B' + realIndex].v).slice(19),
  student: sheet['C' + realIndex].v,
  studentNick: (sheet['C' + realIndex].v).slice(19),
  taskName: sheet['D' + realIndex].v,
}));

const tasks = getTasks(taskWorkbook.Sheets.Sheet1);
const students = getPairs(workbook.Sheets['Form Responses 1']);
const result = students.reduce((total, pair) => {
    const task = tasks.find(w => w.taskName === pair.taskName);
    return task ? total.concat({ ...pair, ...task }) : total;
  }, []);

  fs.writeFile('./public/test.json', JSON.stringify(result, null, 2), 'utf8', () => {
    console.log('writing data is done!');
  });
