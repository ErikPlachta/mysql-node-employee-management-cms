//------------------------------------------------------------------------------
//-- IMPORTS

const router = require('express').Router();

//-- SQL database connection with mysql2
const db = require('../../config/connection')

//------------------------------------------------------------------------------
//-- ROUTES

//-- Get all employees
router.get('/', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query('SELECT * FROM role', function (err, results) {
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


//-- Get role by ID
router.get('/:id', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query(`SELECT * FROM role WHERE id = ${req.params.id}`, function (err, results) {
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


//-- create a role
// TODO:: 01/29/2022 #EP | Add this query
router.post('/', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query('SELECT * FROM role', function (err, results) {
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


//-- Delete an role by ID
// TODO:: 01/29/2022 #EP | Add this query
router.delete('/:id', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query('SELECT * FROM role where id=?', function (err, results) {
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