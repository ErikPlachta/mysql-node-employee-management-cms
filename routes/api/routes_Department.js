//------------------------------------------------------------------------------
//-- IMPORTS

const router = require('express').Router();

//------------------------------------------------------------------------------
//-- ROUTES

router.get('/', async (req, res) => {
    try {
      // find all library cards and perform a JOIN to include all associated Readers
      const libraryCardData = await LibraryCard.findAll({
        include: [{ model: Reader }]
      });
      res.status(200).json(libraryCardData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//------------------------------------------------------------------------------
//-- EXPORTS

module.exports = router;