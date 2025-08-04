const db = require('./db');

db.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('MySQL Connection Error:', err);
  } else {
    console.log('Users data:', results);
  }
});
