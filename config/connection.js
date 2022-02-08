//-- Imported by anything that uses SQL Database connection

// Import and require mysql2
const mysql = require('mysql2');
require('dotenv').config(); //-- for local variable caching

db = mysql.createConnection(
  {
    host: 'localhost', 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`//-- Connection MYSQL database success!`)
);

//-- exporting created sequelize obj
module.exports = db;