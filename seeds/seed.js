//------------------------------------------------------------------------------
//-- IMPORTS

//-- connect to SQL database
const sequelize = require('../config/connection');

//-- Grab database Table models
const { Department, Role, Employee } = require('../models');

//-- Grab seed data to build a seed database
const seed_Departments = require('./seed_Departments.json');
const seed_Roles = require('./seed_Roles.json');
const seed_Employees = require('./seed_Employees.json');


//------------------------------------------------------------------------------
//-- Building seed database with Sequelize based on Model data and seed JSON data

const seedDatabase = async () => {
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
  process.exit(0);
};

//------------------------------------------------------------------------------
//-- RUNNING 

seedDatabase();
