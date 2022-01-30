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
  var data = {"last_name" : "dd!"};
  // data = JSON.parse(data);
  putEmployee(1, data)
  .then( results => console.log(`Results of Query: ${results}`))
  .then(() => getEmployee(1) )
  .then( results => console.log(`Updated: ${results}`))
}