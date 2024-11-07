const http = require('http');
const fs = require('fs');

const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const PORT = 1245;
const HOST = 'localhost';

const app = http.createServer();

const countStudents = (database) => new Promise((resolve, reject) => {
  if (!database) {
    reject(new Error('Cannot load the database'));
  }
  if (database) {
    fs.readFile(database, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reports = [];
        const lines = data.toString('utf-8').trim().split('\n');
        const groups = {};
        const dbFields = lines[0].split(',');
        const students = dbFields.slice(
          0, dbFields.length - 1,
        );

        for (const line of lines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(
            0, studentRecord.length - 1,
          );
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(groups).includes(field)) {
            groups[field] = [];
          }
          const studentEntries = students.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          groups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(groups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reports.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(groups)) {
          reports.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reports.join('\n'));
      }
    });
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responses = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responses.push(report);
          const responseText = responses.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responses.push(err instanceof Error ? err.message : err.toString());
          const responseText = responses.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
