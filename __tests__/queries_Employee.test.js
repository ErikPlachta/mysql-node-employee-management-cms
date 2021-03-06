//------------------------------------------------------------------------------
//-- Imports

const { getEmployee, getEmployees, putEmployee, postEmployee, deleteEmployee } =  require('../lib/queries_Employee.js');

//------------------------------------------------------------------------------
//-- Testing with Jest


//-- Creating a new Database
test('Getting all Employees and getting a full payload response.', () => {
    
    
    getEmployees()
        .then(results => {
        expect(results).toBeDefined();
    });
    
});

//-- Getting an employee
function test_Get(){
    getEmployee(1)
    .then( results => console.log(`results: ${results}`))
  
    
  }
  
  
  function test_Put(){
    var data = {"last_name" : "dd!"};
    var id = 1;
    // data = JSON.parse(data);
    putEmployee(id, data)
    .then( results => console.log(`Results of Query: ${results}`))
    .then(() => getEmployee(id) )
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
    var id = 1;
    
    deleteEmployee(id)
    .then( results => console.log(`Results of Query: ${results}`))
    .then(() => getEmployee(id) )
    .then( results => console.log(`Updated: ${results}`))
  }
  