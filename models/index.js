//-- importing tables to prepare to manage
const Empoloyee = require('./Employee');
const Department = require('./Department');
const Role = require('./Role');


//-- Sequelize Table Management
Reader.hasOne(LibraryCard, {
  foreignKey: 'reader_id',
  onDelete: 'CASCADE'
});

LibraryCard.belongsTo(Reader, {
  foreignKey: 'reader_id'
});


//-- Exports updated tables
module.exports = { Employee, Department, Role };
