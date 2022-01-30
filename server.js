//------------------------------------------------------------------------------
//-- importing to prepare to build seed database within database

//-- Running server
const express = require('express');
//-- API Call Pathing
const routes = require('./routes');
//-- ORM
//TODO:: 01/29/2022 #EP || Remove Sequelize once done learning
// const sequelize = require('./config/connection'); 

// Import and require mysql2
const mysql = require('mysql2');

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


//------------------------------------------------------------------------------
//-- Start connection to db and run server

app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => console.log(`Now listening on http://127.0.0.1:${PORT}`));

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

