//------------------------------------------------------------------------------
//-- importing to prepare to build seed database within database

//-- Running server
const express = require('express');
//-- API Call Pathing
const routes = require('./routes');
//-- ORM
const sequelize = require('./config/connection');

//------------------------------------------------------------------------------
//-- Setup Express
const app = express();
const PORT = process.env.PORT || 3001;

//-- make sure can read JSON and manage properly
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Give Express access to routes
app.use(routes);

//------------------------------------------------------------------------------
//-- Start connection to db and run server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

