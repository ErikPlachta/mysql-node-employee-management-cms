const { Model, DataTypes } = require('sequelize');
const sequelize = require('../seeds/connection');

//-- Creating Employee class, and extending Model from Class Sequelize
class Department extends Model {};

//-- Creating Sequelize table
Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
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
    modelName: 'department'
  }
);

//-- returning table
module.exports = Department;
