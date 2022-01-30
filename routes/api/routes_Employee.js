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

//-- UPDATE an employee
router.put('/:id', async (req, res) => {
  // console.log(`Received post request: ${req.body}`)
  try {
    
    var id = req.params.id;
    var request = req.body;

    //-- grabbing what was sent in
    var first_name = request.first_name;
		var last_name = request.last_name;
    var role_id = request.role_id;
		var manager_id = request.manager_id;

		
    // request.forEach( ([key, value]) => {
    //   console.log("hi")
    // });
    var query_Holder = null;
    console.log("//-- Received: ")
    for (var key in request){
      console.log(`//--\t ${key} : ${request[key]}`);
      // console.log(`//-- UPDATE employee SET ${key} = ${request[key]} WHERE id = ${id}`);
    }
    
    // ;SELECT * FROM employee WHERE manager_id = ?";
    // var query_String = `SELECT first_name FROM employee WHERE id = ${id} AND SELECT last_name FROM employee where id = ${id};`;
    var query_String = `SELECT * FROM employee WHERE id = ${id};`;
    
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