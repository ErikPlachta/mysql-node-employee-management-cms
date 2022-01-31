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

  
  //-- Printing app name and my name
  _get_AppBranding = () => {
      console.log(`
 ______________________________________________________________________________
||----------------------------------------------------------------------------||
||                      Employee Management System                            ||
||                    ------------------------------                          ||
||                            By Erik Plachta                                 ||
||                                                                            ||
||----------------------------------------------------------------------------||
||----------------------------------------------------------------------------||
`)
  }
  
  _get_MainMenu = async () => {
    //-- Uses inquirer.js to prompt user specific details.   

    console.log(`
MAIN MENU:
    `);
      
    var results = await inquirer.prompt([
      {
        type: 'list',
        name: 'mainMenu',
        message: 'Please select an operation: ',
        choices: [
          "1. View all Departments",
          "2. View all Roles",
          "3. View all Employees",
          "4. Add a Department",
          "5. Add a Role",
          "6. Add an Employee",
          "7. Update an Employee Role",
          "0. Exit"
        ]
      }
    ]);
    this._validateRoute_Choice(results);
  };  //-- END OF _get_MainMenu

  
  _getDepartments = async () => {  
    console.log("\nDEPARTMENTS:\n\nHere is a list of your departments...\n")
    var response = await getDepartments()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
    
    console.table(JSON.parse(response));
    
    var results = await inquirer.prompt([
      {
        type: 'list',
        name: 'viewMenu',
        message: 'What would you like to do?: ',
        choices: [
          "1. Back to Main Menu",
          "0. Exit" 
        ]
      }
    ]);
    this._validateRoute_Choice(results);
  };

  _getRoles = async () => {
    var response = await getRoles()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
    

    console.table(JSON.parse(response))
    
    var results = await inquirer.prompt([
      {
        type: 'list',
        name: 'viewMenu',
        message: 'What would you like to do?: ',
        choices: [
          "1. Back to Main Menu",
          "0. Exit"
          
        ]
      }
    ]);

    this._validateRoute_Choice(results);
  }

  _getEmployees = async () => {
    var response = await getEmployees()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
    
    console.table(JSON.parse(response));
    
    var results = await inquirer
      .prompt([

        //-- Name
        {
          type: 'list',
          name: 'viewMenu',
          message: 'What would you like to do?: ',
          choices: [
            "1. Back to Main Menu",
            "0. Exit"
            
          ]
        }
      ]);
    this._validateRoute_Choice(results);
  };

  _postDepartment = async (data) => {

  }
  _postRole = async  (data) => {

  }
  _postEmployee = async (data) => {

  }
  _putEmployee = async (id,data) => {

  }

  _exit = async () => {
    var results = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'exitMenu',
        message: 'Are you sure?: '
      }
    ]);
    this._validateRoute_Choice(results);
  };

  exitMenu = {
    1: this._get_MainMenu
  };

  viewMenu = {
    0: this._exit,
    1: this._get_MainMenu
  };

  mainMenu = {
    0: this._exit,
    1: this._getDepartments,
    2: this._getRoles,
    3: this._getEmployees,
    4: this._postDepartment,
    5: this._postRole,
    6: this._postEmployee,
    7: this._putEmployee,
  };



  //-- takes choice and verifies what to do next
  _validateRoute_Choice = async function(results) { 
    var location = ''; //-- to hold the key, which is the menu name
    var number =''; //-- to hold number choice
    
    // console.log(`Results: ${JSON.stringify(results)}`)
    //-- extract just the number from the list
    
    for(var key in results) {
      location = key;
      
      if(location != 'exitMenu'){
        number = (results[key]).split(".")[0];
      } 
      else {
        if(results[key] == false){
          number = 1;
        } else {
          console.log("Goodbye!")
          process.exit(0);
        }
      }
    }
    
    console.log("Location and number choice:", location, number)
    
    if(location === 'mainMenu'){
      return (this.mainMenu[number])();
    } 
    else if (location === 'viewMenu') {
      return (this.viewMenu[number])();
    }
    if(location === 'exitMenu'){
      // console.log("Exit Menu validation",number)
      return (this.exitMenu[number])();
    }
    else {
      console.log("ERROR: Taking back to main menu...")
      this._get_MainMenu();
    }


  };  

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  
   //-- Runs program
   run  = async function() { 
    //-- Starts the APP by kicking off team builder
    
     //-- print header
     this._get_AppBranding()
     //-- Get user specific info
     this._get_MainMenu()
     .catch( err => {
       console.log(`Error: ${err}`);
     });
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
