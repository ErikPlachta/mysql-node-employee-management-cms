//------------------------------------------------------------------------------
//-- IMPORTS

//-- Used to build SQL seed data, and erase anything that may exist
const { response } = require('express');
// const db = require('./connection_mysql2');



// const seedDatabase = async () => {
  async function seedDatabase_OLD() {

  //-- If it exists, drop table.
  const database = db.query('DROP DATABASE IF EXISTS employee_db;',
    function (err, results) {
      if (err) throw ["ERROR: Unable to drop existing database 'employee_db'",err];
      
      //-- Try to create new table
      db.query('CREATE DATABASE employee_db;',
        function (err, results) {
          if (err) throw ["ERROR: Unable to create new database",err];
          console.log("//-- New database 'employee_db' created!")
          //-- done so exit
          // process.exit(0);
          return results;
        }
      );
    }
  );

  const results = await database;
  console.log(results);
  return results;
};



async function seedDatabase () {
  db = null;
  require('dotenv').config(); //-- for local variable caching
  const mysql = require('mysql2/promise'); // or require('mysql2').createConnectionPromise
  mysql.createConnection(
    {
      host: 'localhost', 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
    )
    //-- send connection into promise chain, and assign it to db
    .then(conn => db = conn)
    //-- Query to Drop if exist
    .then(() => {
      return db.execute('DROP DATABASE IF EXISTS employee_db');

    })
    //-- Query to Create
    .then( () => db.query('CREATE DATABASE employee_db') )
    //-- close the connection and end
    .then( () => {
      db.end(); //-- close connection
      console.log("//-- Closing mysql2 connection to mysql...")
      return "TRUE";
    })
    .catch(err => {
      throw `ERROR: unable to update database:\n\t${err}`;
    });
};


//------------------------------------------------------------------------------
//-- RUNNING 

module.exports= seedDatabase;
