const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//-- Creating Employee class, and extending Model from Class Sequelize
class Employee extends Model {}

//-- Creating Sequelize table
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      association: {
        model: 'employee',
        key: 'id',
        // constraints: false
      }
    }
  },
  {
    hooks: {

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
  }
);

//-- returning table
module.exports = Employee;
