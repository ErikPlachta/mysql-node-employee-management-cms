//------------------------------------------------------------------------------
//-- IMPORTS FOR EXPRESS SERVER MANAGEMENT

//-- Importing CRUD functions for Employees
const { 
  getEmployee,
  getEmployees,
  putEmployee,
  postEmployee,
  deleteEmployee
} =  require('./lib/queries_Employee.js');

//-- Importing CRUD functions for Roles
const { 
  getRole,
  getRoles,
  putRole,
  postRole,
  deleteRole 
} =  require('./lib/queries_Role.js');

//-- Importing CRUD functions for Departments
const { 
  getDepartment,
  getDepartments,
  putDepartment,
  postDepartment,
  deleteDepartment
} =  require('./lib/queries_Department.js');

//------------------------------------------------------------------------------
//-- IMPORTS - Other

//-- For Prompting
const inquirer = require('inquirer');

//-- For printing table results
const cTable = require('console.table');
//------------------------------------------------------------------------------
//-- PROMPTING

class Init {
  constructor(){};

  //--------------------------------------------------------------------------
  //-- Getting User Data

  //-- Function that asks employee details
  // _get_EmployeeBasics = () => { 
  _get_MainMenu = () => {
    //-- Uses inquirer.js to prompt user specific details.

    console.log(`
 ______________________________________________________________________________
||----------------------------------------------------------------------------||
||                      Employee Management System                            ||
||                                                                            ||
||                            By Erik Plachta                                 ||
||                                                                            ||
||----------------------------------------------------------------------------||
||----------------------------------------------------------------------------||
`);

console.log(`
MAIN MENU:
`);
      
      return inquirer
        .prompt([

          //-- Name
          {
            type: 'list',
            name: 'menu_choice',
            message: 'Please select an operation: ',
            choices: [
              "1. View all Departments",
              "2. View all Roles",
              "3. View all Employees",
              "4. Add a Department",
              "5. Add a Role",
              "6. Add an Employee",
              "7. Update an Employee Role"
            ]
          }
        ])
  };  //-- END OF _get_MainMenu

  
  _getDepartments = async () => {  
    var response = await getDepartments()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
    return response;
  }

  _getRoles = async () => {
    var response = await getRoles()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
    return response;
  }

  _getEmployees = async () => {
    var response = await getEmployees()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
    return response;
  };

  _postDepartment = (data) => {

  }
  _postRole = (data) => {

  }
  _postEmployee = (data) => {

  }
  _putEmployee = (id,data) => {

  }

  mainMenu = {
    1: this._getDepartments,
    2: this._getRoles,
    3: this._getEmployees,
    4: this._postDepartment,
    5: this._postRole,
    6: this._postEmployee,
    7: this._putEmployee,
  };

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //-- Primary function that runs the app
  _manage_Employees = async function() { 

  
    //-- Get user specific info
    this._get_MainMenu()
      .then(results => {
        console.log(results);
        
        var choice =''; //-- to hold number choice
        //-- extract just the number from the list
        for(var key in results) {
          choice = (results[key]).split(".")[0];
        }
        return choice;
      })
      .then(choice => {
        return (this.mainMenu[choice])();
      })
      .then(results => {
        
        console.table(JSON.parse(results))
        
      })
      

    .catch( err => {
      console.log(`Error: ${err}`);
    });
  };


  //----------------------------------------------------------------------------
  //-- makes template then creates file

  _BuildingContent = () => { 

    //-- Build the HTML content
    let template = this.set_TeamTemplate(this.teamData_Dict);
    // console.log(template);
    set_writeTeamFile(template)
     .then(write_Response => {
        console.log(write_Response);
      })
      //-- if it fails any-step along the way, catch error nd log here.
      .catch(err => {
        console.log("ERROR: ", err);
      });
  };
  

   //-- Runs program
   run(){
    //-- Starts the APP by kicking off team builder
    
    this._manage_Employees()
  
  };

}; 


//------------------------------------------------------------------------------
//-- Export / Running
/* 
  If calling index.js directly, creates Init OBJ and then run
    - For using the app with CLI `node index`
  
  If calling index.js indirectly, exports Init class.
    - For testing the app with jest `npm test index`

*/

if (require.main === module) {
  // console.log('called directly');
  const init = new Init();
  init.run();
} else {
  // console.log('Exporting');
  module.exports = Init;
}
//-- Runs program
