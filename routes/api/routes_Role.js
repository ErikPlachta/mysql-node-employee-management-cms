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


//-- UPDATE an role based on payload
router.put('/:id', async (req, res) => {
  // console.log(`Received post request: ${req.body}`)
  try {
    
    //-- Deconstructing to make code easier to read and use
    const id = req.params.id; //-- get ID from url
    const request = req.body; //-- pull payload
    const length = Object.keys(request).length; //-- get number of things to update

    //-- if received more than 1 change request, abort request
    if (length > 1 ){
      throw `ERROR: Update request rejected. Received ${length} change requests, only 1 is allowed. Please try again.`;
    }
    
    //-- Used to hold query built in below for loop
    var query_String = null;

    //-- Extract payload and build query string
    for( var key in request) {
      query_String = `UPDATE role SET ${key} = '${request[key]}' WHERE id = ${id};`;
    }
    
    //-- Attempt to update database with provided value
    db.query(query_String, 
      function (err, results) {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200).json(results);
      }
    );
  }
  catch (err) {
    console.log("Catch Error.", err)
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

    if(id) {
      db.query(`INSERT INTO role (id, title, salary, department_id) VALUES (${id}, "${title}", ${salary},${department_id});`,
      function (err, results) {  
        if (err) {
          res.status(500).json(err);
        }
          res.status(200).json(results);
        }
      );
    } else {
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary},${department_id});`,
      function (err, results) {  
        if (err) {
          res.status(500).json(err);
        }
          res.status(200).json(results);
        }
      );
    }
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