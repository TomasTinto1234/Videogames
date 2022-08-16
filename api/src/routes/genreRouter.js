const { Router } = require('express');
const { getGenres,  } = require('../controllers/genreControllers');

const genreRouter = Router();

genreRouter.get("/", getGenres);

// genreRouter.get("/:name", getByGenre);

module.exports = genreRouter;