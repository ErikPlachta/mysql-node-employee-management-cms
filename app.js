//-- IMPORTS

// const {getEmployee, putEmployee} = require('./lib/queries.js');
const { getEmployee, getEmployees, putEmployee, postEmployee, deleteEmployee } =  require('./lib/queries_Employee.js');

//-- Getting an employee
// getEmployee(1)
// .then( results => console.log(`results: ${results}`))

// getEmployees()
// .then( results => console.log(`results: ${results}`))






function test_Put(){
  var data = {"last_name" : "dd!"};
  // data = JSON.parse(data);
  putEmployee(1, data)
  .then( results => console.log(`Results of Query: ${results}`))
  .then(() => getEmployee(1) )
  .then( results => console.log(`Updated: ${results}`))
}

function test_Post(){
  //-- sending without an id, so auto populates one
  var data = {
    "first_name" : "Random",
    "last_name" : "Named Person",
    "role_id" : "2",
    "manager_id" : "1"
  };
  // data = JSON.parse(data);
  postEmployee(data)
  .then( results => console.log(`Results of Query: ${results}`))
}

function test_Delete(){
  //-- sending without an id, so auto populates one
  var data = {
    "first_name" : "Random",
    "last_name" : "Named Person",
    "role_id" : "2",
    "manager_id" : "1"
  };
  // data = JSON.parse(data);
  postEmployee(data)
  .then( results => console.log(`Results of Query: ${results}`))
}

