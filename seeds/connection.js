//-- IMPORTS
const Sequelize = require('sequelize');
require('dotenv').config();

//-- MAKE sequelize obj to play as ORM
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

//-- exporting created sequelize obj
module.exports = sequelize;
