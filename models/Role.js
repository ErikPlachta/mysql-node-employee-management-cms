const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//-- Creating Employee class, and extending Model from Class Sequelize
class Role extends Model {}

//-- Creating Sequelize table
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role'
  }
);

//-- returning table
module.exports = Role;
