//-- importing tables to prepare to manage
const Empoloyee = require('./Employee');
const Department = require('./Department');
const Role = require('./Role');


//-- Sequelize Table Management

//-- Setting up Department to share it's ID as foreign key to role, field department_id
Department.hasOne(Role, {
  foreignKey: 'department_id'
});

Role.belongsTo(Department, {
  foreignKey: 'department_id'
});


//-- Setting up role to share ID as foreign key to employee, field value role_id
Role.hasOne(Employee, {
  foreignKey: 'role_id'
});

Employee.belongsTo(Department, {
  foreignKey: 'role_id'
});

//-- Setting up employee manager_id to share foreignKey connection to manager_id
Employee.hasOne(Employee, {
  foreignKey: 'manager_id'
});

Employee.belongsTo(Employee, {
  foreignKey: 'manager_ID'
});


//-- Exports updated tables
module.exports = { Employee, Department, Role };
