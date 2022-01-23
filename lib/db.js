//------------------------------------------------------------------------------
//-- Imports

// --Making instance of mysql2
mysql = require('mysql2');


//----------------------------------------------------------------------------
//-- Connection to Database

//-- make connection
db = () => { mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'manager',
    // MySQL password
    password: 'My-Manager-Password1!',
    database: 'inventory_db'
  },
  console.log(`Connected to the inventory_db database.`)
)};





//------------------------------------------------------------------------------
//-- Queries

//-- Delete with wildcard to allow user param input
getEmployees = function() {
  return db.query(`DELETE FROM Employee WHERE id = ?`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result)
  });
};

// Get all Departments with all values
getDepartments = function() {
  return db.query('SELECT * FROM Department', function (err, results) {
      console.log(results);
  });
};

// Get all Roles with all values
getRoles = function() {
  return db.query('SELECT * FROM Role', function (err, results) {
    console.log(results);
  });
};



module.exports = {
  getEmployees,
  getDepartments,
  getRoles
};
  