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


//-- create an employee
// TODO:: 01/29/2022 #EP | Add this query
router.post('/', async (req, res) => {
  // console.log(`Received post request: ${req.body}`)
  try {
    
    var request = req.body;
    // request.forEach( ([key, value]) => {
    //   console.log("hi")
    // });

    for (var key in request){
      console.log(`${key} : ${request[key]}`);
    }
    // for( i=0; i <= request.length; i++ ){
    //   console.log(i)
    // }
    // console.log(`Received payload: ${JSON.stringify(req)}`)
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
// TODO:: 01/29/2022 #EP | Add this query
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