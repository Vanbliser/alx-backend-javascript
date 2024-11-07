const fs = require('fs');

function countStudents(pathToFile) {
  try {
    const fileContent = fs.readFileSync(pathToFile, 'utf-8');
    const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

    lines.shift();

    const students = lines.map((line) => {
      const [firstname, , , field] = line.split(',');
      return { firstname, field };
    });

    const totalStudents = students.length;
    console.log(`Number of students: ${totalStudents}`);

    const fields = {};
    students.forEach((student) => {
      const { firstname, field } = student;
      if (fields[field]) {
        fields[field].count += 1;
        fields[field].list.push(firstname);
      } else {
        fields[field] = {
          count: 1,
          list: [firstname],
        };
      }
    });

    for (const field in fields) {
      if (field) {
        console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].list.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
