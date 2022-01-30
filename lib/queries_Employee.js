//-- IMPORTS

//-- https://www.npmjs.com/package/node-fetch
//-- https://stackabuse.com/making-http-requests-in-node-js-with-node-fetch/
//-- not using latest version, so I can still use it with require for easier use
const fetch = require('node-fetch');

//-- Requesting ALL employees or just by specific ID. If no id sent as arg, just gets all.

const getEmployee = async function(id) {
  
    //-- If a specific ID was requested
    if(id != undefined) {
      const response = await fetch(`http://127.0.0.1:3001/api/employees/${id}`)
        .then(response => response.json())
        .then(json => {
          return JSON.stringify(json);
        })
        .catch(err => console.log(err));
      return response;
    } 
    
    //-- ALL employees were requested instead
    else {
      return false;
    }    
};

const getEmployees = async function() {
  
  //-- If a specific ID was requested
  
  const response = await fetch(`http://127.0.0.1:3001/api/employees/`)
    .then(response => response.json())
    .then(json => {
      return JSON.stringify(json);
    })
    .catch(err => console.log(err));
  
    return response;
  
};

//-- UPDATING AN EMPLOYEE VALUE
//-- receives 1 value to be updated and then updates
const putEmployee = async function(id,data){
  console.log("Data:",data)

  //-- If a specific ID was requested
  if(id != undefined) {
    const response = await fetch(`http://127.0.0.1:3001/api/employees/${id}`, {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      },
      body: JSON.stringify(data),
    })
    // .then(console.log)
      .then(response => response.json())
      .then(json => {
        return JSON.stringify(json);
      })
      .catch(err => console.log(err));
    return response;
  } 
  
  //-- ALL employees were requested instead
  else {
    return false;
  }    
};

//-- Requesting ALL employees or just by specific ID. If no id sent as arg, just gets all.
const postEmployee = async function(data){

  //-- If a specific ID was requested
  
  const response = await fetch(`http://127.0.0.1:3001/api/employees/`, {
    method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      return JSON.stringify(json);
    })
    .catch(err => console.log(err));
  return response;
};


//-- removing an employee from the database
const deleteEmployee = async function(id){

    //-- If a specific ID was requested
    if(id != undefined) {
      const response = await fetch(`http://127.0.0.1:3001/api/employees/${id}`)
        .then(response => response.json())
        .then(json => {
          return JSON.stringify(json);
        })
        .catch(err => console.log(err));
      return response;
    } 
    
    //-- ALL employees were requested instead
    else {
      return false;
    }    
};

//------------------------------------------------------------------------------
//-- EXPORTS

module.exports = {
  getEmployee,
  getEmployees,
  putEmployee,
  postEmployee,
  deleteEmployee
};