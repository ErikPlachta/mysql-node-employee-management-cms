//-- IMPORTS

const sequelize = require('../config/connection');
const { Reader, Book, LibraryCard } = require('../models');

const seed_Departments = require('./seed_Departments.json');
const seed_Roles = require('./seed_Roles.json');
const seed_Employees = require('./seed_Employees.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const readers = await Reader.bulkCreate(readerSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of readers) {
    const newCard = await LibraryCard.create({
      reader_id: id,
    });
  }

  for (const book of bookSeedData) {
    const newBook = await Book.create({
      ...book,
      // Attach a random reader ID to each book
      reader_id: readers[Math.floor(Math.random() * readers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
