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
const { get } = require('express/lib/response');
//------------------------------------------------------------------------------
//-- PROMPTING

class Init {
  constructor(){};

  //--------------------------------------------------------------------------
  //-- Getting User Data

  
  //-- Printing app name and my name
  _get_AppBranding = () => {
      console.log(`
 ________________________________________________
||----------------------------------------------||
||       Employee Management System             ||
||     ------------------------------           ||
||             By Erik Plachta                  ||
||                                              ||
||----------------------------------------------||
||----------------------------------------------||
`)
  }
  
  //-- Main Menu Default page
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

  
  //-- query to get ALL DEPARTMENTS from db
  //-- Main Menu #1
  _getDepartments = async () => {  
    console.log("\nDEPARTMENTS:\n\nHere is a list of your departments...\n")
    var response = await getDepartments()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));

    //-- print results
    console.table(JSON.parse(response));
    
    //-- prompt user on next step
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

  //-- query to get ALL ROLES from db, + joinng Department Name and removing Department ID
  //-- Main Menu #2
  _getRoles = async () => {
    
    var response = await getRoles()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
    
    //-- build what's to be printed, using 2 queries to join data below
    var response_JSON = (JSON.parse(response));

    //-- loop through each response, and then add department name from query, removing id
    for ( var key in response_JSON ) {
      var departmentName = await getDepartment(response_JSON[key]['department_id'])
      .then(response => {
        return JSON.parse(response);
      })
      .then(results => {
        response_JSON[key]["department_name"] = (results[0]['name']);
        delete response_JSON[key]['department_id'];
      })
    };

    console.table((response_JSON))
    
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

    //-- Validate choice and redirect user based on choice
    this._validateRoute_Choice(results);
  }

  //-- Getting employees
  //-- Main Menu #3
  _getEmployees = async () => {
    var employees = await getEmployees()
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));

    // var roles = await getRoles()
    // .then(response => {
    //   return response;
    // })
    // .catch(err => console.log(err));
    

     //-- build what's to be printed, using 2 queries to join data below
     var employees_JSON = (JSON.parse(employees));

     //-- loop through each response, and then add department name from query, removing id
     for ( var key in employees_JSON ) {
        var jobTitle = await getRole(employees_JSON[key]['role_id'])
          .then(response => {
            console.log(key, employees_JSON[key])
            return JSON.parse(response);
          })
          .then(results => {
            console.log(`results: ${JSON.stringify(results)}`) 
            try{
              employees_JSON[key]["title"] = (results[0]['title']);
              employees_JSON[key]["salary"] = (results[0]['salary']);
            }
            catch {
              employees_JSON[key]["title"] = (results['title']);
              employees_JSON[key]["salary"] = (results['salary']);
            }
          })

          //-- THEN GET DEPARTMENT NAME
          .then( () => {
            // console.log(employees_JSON[key]['role_id'])
            return getRole(employees_JSON[key]['role_id']);
          })
          .then(results => {
            // console.log(results)
            return (JSON.parse(results))
            //  return getDepartment(results)
          })
          .then( results => {
            // console.log(results)
            return getDepartment(results[0]['department_id']);
          })
          .then( results => {
            // console.log(JSON.parse(results)[0]['name'])
            employees_JSON[key]["department"] = (JSON.parse(results)[0]['name']);
            // delete employees_JSON[key]['role_id'];
          })
          //-- THEN GET MANAGER if has one
          .then( () => {
            return getEmployee(employees_JSON[key]['manager_id'])
          })
          .then(results => {
            
            //-- if a manager is defined, add to column
            if(results != false) {
              var managerName = `${JSON.parse(results)[0]['first_name']} ${JSON.parse(results)[0]['last_name']}`;
              // console.log(managerName)
              employees_JSON[key]['manager_name'] = managerName
            }
            //-- always delete no matter what.
            delete employees_JSON[key]['manager_id'];
          })
     };
 
     console.table((employees_JSON))
    // console.table(JSON.parse(response));
    
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
        },

      ]);
    this._validateRoute_Choice(results);
  };

  //-- Used to create a new department
    //-- Main Menu #4
  _postDepartment = async (data) => {
    console.log(`
Add a Department:
    `);
      
    var results = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter a Department Name: ',
        validate: departmentName => {
          if(departmentName){
            postDepartment( { "name": departmentName} )
            return true;
          }
          else {
            return false;
          }
        }
      },
    ]);
    console.log(`Created new Department: ${results.departmentName}!`);
    console.log(`\nLoading Main Menu...`)  
    // console.log(results)
    this._get_MainMenu();
  }
  
  //-- Used to create a new Role
  //-- Main Menu #5
  _postRole = async  (data) => {

  }
  
  //-- Used to create a new employee
  //-- Main Menu #6
  _postEmployee = async (data) => {

  }

  //-- Used to update Employee Role
  //-- Main Menu #7
  _putEmployee = async (id,data) => {
    console.log(`
    Updating an Employee Role: 
    `)


    //--------------------------------------------------------------------------
    //-- Getting Data

    //-- Get Employees from DB
    var employees = await getEmployees()
    .then(response => {
      return JSON.parse(response);
    })
    .catch(err => console.log(err));

    //-- Get Employees from DB
    var roles = await getRoles()
    .then(response => {
      return JSON.parse(response);
    })
    .catch(err => console.log(err));
    // console.log(roles)

    //--------------------------------------------------------------------------
    //-- Building Choice List
    

    //-- Building EMPLOYEES Choice List with Department  Names
    var employees_list = []; //-- holds list to give for choice below
    //-- Extract values and build list for choice
    for(var employee in employees ){
      
      //-- DECONSTRUCTORS
      const id = employees[employee].id;
      const fn = employees[employee].first_name;
      const ln = employees[employee].last_name;
      
      //-- Get Role ID and then use it to grab title
      const r_id = employees[employee].role_id;
      var r_t = '';
      for (var key in roles[id]) {
        if(key == 'title') {
            r_t = roles[id][key];
        }; 
      }
      
      //-- Built string for CLI with ROLE and employee info
      employees_list.push(`${id}. ${fn} ${ln}\n\tCurrent Role ID: ${r_id}\n\tCurrent Role Title: ${r_t}`);
    }


    //-- Building ROLES Choice List
    var roles_list = []; //-- holds list to give for choice below
    for (var key in roles) {
      var id = roles[key].id;
      // var s =  roles[key].salary;
      var t = roles[key].title;
      // var did = roles[key].department_id;
      
      roles_list.push(`${id}.\t Title: ${t} `)
    }

    //--------------------------------------------------------------------------
    //-- CLI

    //-- prompt user choice menu
    var results = await inquirer.prompt([
      {
        type: 'list',
        name: 'putMenu_id',
        message: 'Which Employee will you be updating?: ',
        choices: employees_list,
      },
      {
        type: 'list',
        name: 'putMenu_role',
        message: 'Which role will they be changing to?: ',
        choices: roles_list,
      }
    ]);

    this._validateRoute_Choice(results);
  }

  //-- #0
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
