//-- Imported by anything that uses SQL Database connection

// Import and require mysql2
const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost', 
    user: 'root', // MySQL username,
    password: 'Password1!',  // MySQL password
    database: 'employee_db'
  },
  console.log(`Connected to the inventory_db database.`)
);



//-- exporting created sequelize obj
module.exports = db;