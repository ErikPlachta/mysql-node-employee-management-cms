const { Model, DataTypes } = require('sequelize');
const sequelize = require('../seeds/connection');

//-- Creating Employee class, and extending Model from Class Sequelize
class Role extends Model {};

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
      allowNull: false,
      references: {
        model: 'department', //-- table to get key from
        key: 'id', //-- column in department table
      },
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
