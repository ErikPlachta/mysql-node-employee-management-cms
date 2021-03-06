//-- IMPORTS
//-- Using for ENV port
require('dotenv').config(); //-- for local variable caching

//-- https://www.npmjs.com/package/node-fetch
//-- https://stackabuse.com/making-http-requests-in-node-js-with-node-fetch/
//-- not using latest version, so I can still use it with require for easier use
const fetch = require('node-fetch');

//-- Requesting ALL roles or just by specific ID. If no id sent as arg, just gets all.

const getRole = async function(id) {
  
    //-- If a specific ID was requested
    if(id != undefined) {
      const response = await fetch(`http://127.0.0.1:${process.env.MY_PORT}/api/roles/${id}`)
        .then(response => response.json())
        .then(json => {
          return JSON.stringify(json);
        })
        .catch(err => console.log(err));
      return response;
    } 
    
    //-- ALL roles were requested instead
    else {
      return false;
    }    
};

const getRoles = async function() {
  
  const response = await fetch(`http://127.0.0.1:${process.env.MY_PORT}/api/roles/`)
    .then(response => response.json())
    .then(json => {
      return JSON.stringify(json);
    })
    .catch(err => console.log(err));
  
    return response;
  
};

//-- UPDATING AN EMPLOYEE VALUE
//-- receives 1 value to be updated and then updates
const putRole = async function(id,data){
  console.log("Data:",data)

  //-- If a specific ID was requested
  if(id != undefined) {
    const response = await fetch(`http://127.0.0.1:${process.env.MY_PORT}/api/roles/${id}`, {
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
  
  //-- ALL roles were requested instead
  else {
    return false;
  }    
};

//-- Requesting ALL roles or just by specific ID. If no id sent as arg, just gets all.
const postRole = async function(data){

  //-- If a specific ID was requested
  
  const response = await fetch(`http://127.0.0.1:${process.env.MY_PORT}/api/roles/`, {
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
const deleteRole = async function(id){
  console.log(id)

  const response = await fetch(`http://127.0.0.1:${process.env.MY_PORT}/api/roles/${id}`, {
    method: "DELETE",
      headers: { 
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      }
      // body : {id},
    })
    .then(response => response.json())
    .then(json => {
      return JSON.stringify(json);
    })
    .catch(err => console.log(err));
  return response;
};

//------------------------------------------------------------------------------
//-- EXPORTS

module.exports = {
  getRole,
  getRoles,
  putRole,
  postRole,
  deleteRole
};