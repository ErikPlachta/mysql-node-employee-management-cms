//-- importing tables to prepare to manage
const Employee = require('./Employee');
const Department = require('./Department');
const Role = require('./Role');

//------------------------------------------------------------------------------
//-- Sequelize Table Management

//-- Department holds id, but Role holds the value as foreign key in department_id
Department.hasMany(Role); // -- Roles may share department ID as foreign Key
Role.belongsTo(Department, { //-- That shared id is called department_id in Role
  foreignKey: "department_id"
});

//-- Role holds id, and Employee holds the value as foreign key in role_id
Role.hasMany(Employee); //-- role shares primary key as foreign key
Employee.belongsTo(Role, { //-- employee takes that ID and assigns to role_id
  foreignKey: "role_id",
});

//TODO:: 01/29/2022 #EP || Add association between employee ID and maanger_id in emp table Model

//------------------------------------------------------------------------------
//-- Exports updated tables
module.exports = { Employee, Department, Role };
