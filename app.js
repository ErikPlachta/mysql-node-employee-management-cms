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
//-- IMPORTS

getDepartments()
.then(console.log)