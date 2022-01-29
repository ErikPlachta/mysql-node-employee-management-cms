//------------------------------------------------------------------------------
//-- IMPORTS

const router = require('express').Router();

//-- SQL database connection with mysql2
const db = require('../../config/connection')

//------------------------------------------------------------------------------
//-- ROUTES

router.get('/', async (req, res) => {
    try {
        // Query database for ALL employees with all columns
      db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
          res.status(500).json(err);
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