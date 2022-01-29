//------------------------------------------------------------------------------
//-- IMPORTS

const router = require('express').Router();

//-- TOOD:: 01/29/2022 #EP || REMOVE THIS HERE AND IMPORT LATER ONCE VERIFIED
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

//------------------------------------------------------------------------------
//-- ROUTES

router.get('/', async (req, res) => {
    try {
        // Query database for ALL employees with all columns
      db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
          res.status(404).json(err);
        }
        res.status(200).json(results);
      });
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

  

//------------------------------------------------------------------------------
//-- EXPORTS

module.exports = router;