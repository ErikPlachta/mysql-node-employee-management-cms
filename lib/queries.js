

async function getEmployee_id(id){
    fetch(`http://127.0.0.1:3001/api/employees/${id}`)
      .then(response => response.json())
      .then(data => console.log(data));
};
  



async function getEmployee(){
    fetch(`http://127.0.0.1:3001/api/employees/`)
      .then(response => response.json())
      .then(data => console.log(data));
  };
  