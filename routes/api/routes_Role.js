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

    //-- extract payload
    var id = req.body.id;
    var title = req.body.title;
    var salary = req.body.salary;
    var department_id = req.body.department_id;

    // Query database for ALL employees with all columns
    // db.query('SELECT * FROM role', function (err, results) {
    db.query(`INSERT INTO role (id, title, salary, department_id) VALUES (${id}, "${title}", ${salary},${department_id});`,
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
    // db.query(`SELECT * FROM role where id== ${req.params.id}`, function (err, results) {
      db.query(`DELETE FROM role where id = ${req.params.id}`, function (err, results) {
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