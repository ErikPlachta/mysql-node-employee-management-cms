//------------------------------------------------------------------------------
//-- IMPORTS



//------------------------------------------------------------------------------
//-- Building seed database with mysql2 

async function seedDatabase () {
  require('dotenv').config(); //-- for local variable caching

  // const mysql = require('mysql2/promise');
  // const pool = mysql.createPool({
  //   host: process.env.SERVER_PATH,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD
  // });

  const db = require('./connection_mysql2')
  // execute in parallel, next console.log in 3 seconds
  try {
    await Promise.all([
      db.query('DROP DATABASE IF EXISTS employee_db'),
      db.query('select sleep(2)'),
      db.query('CREATE DATABASE employee_db'),
      db.query('select sleep(2)')
    ])
  
    await db.end();
    return true;
  
  }
  catch (err) { 
    console.log(err)
    return false;
  };

}

async function seedDatabase_old() {
  //-- placeholder to assign connection to it once established
  db = null;
  require('dotenv').config(); //-- for local variable caching
  mysql.createConnection(
    {
      host: 'localhost', 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
    )
    //-- send connection into promise chain, and assign it to db
    .then(conn => {
      console.log("//-- Opened mysql2 connection to mysql...");
      db = conn;
    })
    //-- Query to Drop if exist
    .then(() => {
      const res = db.execute('DROP DATABASE IF EXISTS employee_db');
      db.release();
      return res;

    })
    //-- Query to Create
    .then( results => {
      console.log(results)
      db.query('CREATE DATABASE employee_db') 
    })
    //-- close the connection and end
    .then( () => {
      db.end(); //-- close connection
      console.log("//-- Closing mysql2 connection to mysql...")
      return "TRUE";
    })
    .catch(err => {
      return `ERROR: unable to update database:\n\t${err}`;
    });
};


//------------------------------------------------------------------------------
//-- Building seed tables with Sequelize based on Model data and seed JSON data
async function seedTables() {

  //-- Used to build SQL seed data, and erase anything that may exist
  const sequelize = require('./connection_sequelize');

  //-- Grab database Table models
  const { Department, Role, Employee } = require('../models');

  //-- Grab seed data to build a seed database
  const seed_Departments = require('./seed_Department.json');
  const seed_Roles = require('./seed_Role.json');
  const seed_Employees = require('./seed_Employee.json');

  await sequelize.sync({ force: true });

  //-- Grab all departments and build Table based on Model
  const departments = await Department.bulkCreate(seed_Departments, {
    individualHooks: true,
    returning: true,
  });

  //-- grab all roles and build Table based on Model
  for (const role of seed_Roles) {
    const newRole = await Role.create({
    ...role,
    });
  }

  //-- grab all employees and build Table based on Model
  for (const employee of seed_Employees) {
    const newEmployee = await Employee.create({
    ...employee,
    });
  }

  //-- exit once done building seed database data
  // process.exit(0);
  
};


//------------------------------------------------------------------------------
//-- RUNNIUNG

const seed = async () => {

  seedDatabase()
    .then( results => console.log(`//-- database creation results: ${results}`))
    .then(() => seedTables())
    .then( () => process.exit(0))
    //-- print error
    .catch(console.log)
};

//------------------------------------------------------------------------------
//-- RUNNING 

seed();

// seedDatabase();

