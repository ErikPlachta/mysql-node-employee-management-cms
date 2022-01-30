//------------------------------------------------------------------------------
//-- Imports

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
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

//------------------------------------------------------------------------------
//-- Queries

//-- Delete with wildcard to allow user param input
getEmployees = function() {
  return db.query(`SELECT * FROM Employee`, (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.log(result)
    return JSON.parse(results);
  });
};

// Get all Departments with all values
getDepartments = function() {
  return db.query('SELECT * FROM Department', function (err, results) {
      // console.log(results);
      return JSON.parse(results);
  });
};

// Get all Roles with all values
getRoles = function() {
  return db.query('SELECT * FROM Role', function (err, results) {
    // console.log(results);
    return JSON.parse(results);
  });
};

console.table(getEmployees())