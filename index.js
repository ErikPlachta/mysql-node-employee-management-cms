//------------------------------------------------------------------------------
//-- Globals
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'manager',
    // MySQL password
    password: 'My-Manager-Password1!',
    database: 'inventory_db'
  },
  console.log(`Connected to the inventory_db database.`)
);

// Query database
let deletedRow = 2;

db.query(`DELETE FROM books WHERE id = ?`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result)
});

// Query database
db.query('SELECT * FROM books', function (err, results) {
  console.log(results);
});



