//-- IMPORTS
const fetch = require('node-fetch');
// const fetch = (url:RequestInfo, init?:RequestInit) => import('node-fetch').then(module => module.default(url, init));

//-- https://www.npmjs.com/package/node-fetch
//-- https://stackabuse.com/making-http-requests-in-node-js-with-node-fetch/
// const fetch = import('node-fetch'); //-- to allow fetching to Express Server
// import fetch from 'node-fetch';
// const fetch = require("node-fetch");


// fetch('https://google.com')
//     .then(res => res.text())
//     .then(text => console.log(text));





// const url = 'http://127.0.0.1:3001/api/employee'


async function getEmployee(id){
  
  console.log(id)
  
  if(id != undefined) {
    const response = await fetch(`http://127.0.0.1:3001/api/employees/${id}`)
      .then(response => response.json())
      // .then(data => console.log(data));
      .then(json => {
        // console.log(json);
        return JSON.stringify(json);
      })
      .catch(err => console.log(err));
    return response;
  } 
  
  else {
    const response = await fetch(`http://127.0.0.1:3001/api/employees/`)
    .then(response => response.json())
    .then(data => { return JSON.stringify(data) });
    return response;
  }
  
};


// async function getEmployee(){
//   fetch(`http://127.0.0.1:3001/api/employees/`)
//     .then(response => response.json())
//     .then(data => console.log(data));
// };


// getEmployee()
// .then(() => getEmployee(1));

getEmployee()
.then( results => console.log(`results: ${results}`))