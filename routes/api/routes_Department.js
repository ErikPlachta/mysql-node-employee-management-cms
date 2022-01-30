//------------------------------------------------------------------------------
//-- IMPORTS

const router = require('express').Router();

//-- SQL database connection with mysql2
const db = require('../../config/connection')

//------------------------------------------------------------------------------
//-- ROUTES

//-- get ALL departments
router.get('/', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query('SELECT * FROM department', function (err, results) {
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



//-- Get department by ID
router.get('/:id', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query(`SELECT * FROM department WHERE id = ${req.params.id}`, function (err, results) {
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


//-- create a department
router.post('/', async (req, res) => {
  try {
    //-- grab payload
    var id = req.body.id;
    var name = req.body.name;
    // console.log("Adding department...")
    // Query database for ALL employees with all columns
    // db.query('SELECT * FROM department', function (err, results) {
      db.query(`INSERT INTO department (id, name) VALUES (${id}, "${name}");`,
      function (err, results) {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200).json(results);
      }
    );
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
    // db.query(`SELECT * FROM department where id= ${req.params.id}`, function (err, results) {
    db.query(`DELETE FROM department where id = ${req.params.id}`, function (err, results) {
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