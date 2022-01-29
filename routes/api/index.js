//-- Import Express and create router to share existing express instance
const router = require('express').Router();

//-- Importing routes to prepare to pass to Express router
const routes_Employee = require('./routes_Employee');
const routes_Department = require('./routes_Department');
const routes_Role = require('./routes_Role');

// //-- give Routes to ROuter
router.use('/departments', routes_Department);
router.use('/roles', routes_Role);
router.use('/employees', routes_Employee);

//-- Return to ./routes/index.js that sends to servers.js in root
module.exports = router;
