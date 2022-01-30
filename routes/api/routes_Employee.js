//------------------------------------------------------------------------------
//-- IMPORTS

const router = require('express').Router();

//-- SQL database connection with mysql2
const db = require('../../config/connection')

//------------------------------------------------------------------------------
//-- ROUTES


//-- Get ALL employees
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

//-- Get employee by ID
router.get('/:id', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query(`SELECT * FROM employee WHERE id = ${req.params.id}`, function (err, results) {
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



//-- UPDATE an employee based on payload
router.put('/:id', async (req, res) => {
  // console.log(`Received post request: ${req.body}`)
  try {
    
    //-- Deconstructing to make code easier to read and use
    
    var results = {};
    
    const id = req.params.id; //-- get ID from url
    const request = req.body; //-- pull payload
    const length = Object.keys(request).length; //-- get number of things to update
		
    //-- if received more than 1 change request
    if (length > 1 ){
      throw err;
    }
    
    
    var set_String = null;
    console.log(`//-- Received ${length} results... `);

    for( var key in request) {

      set_String = `${key} = '${request[key]}'`;
    }
    
  
    
    
    console.log(set_String)
    // ;SELECT * FROM employee WHERE manager_id = ?";
    // var query_String = `SELECT first_name FROM employee WHERE id = ${id} AND SELECT last_name FROM employee where id = ${id};`;

    //-- Basic query that I know works
    // var query_String = `SELECT * FROM employee WHERE id = ${id};`;

    //-- String to hold an UPDATE query. Using ? wildcard, so modular
    var query_String = `UPDATE employee SET ${key} = '${request[key]}' WHERE id = ${id};`;
    
    // db.query(`UPDATE employee set ${values});`,
    // db.query(`SELECT first_name FROM employee WHERE id = ${id};` `SELECT last_name FROM employee WHERE id = ${id};`,
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

//-- POST a new employee to database. 
router.post('/', async (req, res) => {
  // console.log(`Received post request: ${req.body}`)
  try {
    
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var role_id = req.body.role_id;
    var manager_id = req.body.manager_id;
    // Query database for ALL employees with all columns
    db.query(`INSERT INTO employee (id, first_name, last_name,role_id, manager_id) VALUES (${id}, '${first_name}', '${last_name}', ${role_id}, ${manager_id});`,
    function (err, results) {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(results);
    });
  }
  catch (err) {
    console.log("Catch Error.", err)
    res.status(500).json(err);
  }
});


//-- Delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
      // Query database for ALL employees with all columns
    db.query(`DELETE FROM employee where id = ${req.params.id}`, function (err, results) {
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