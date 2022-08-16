const { Router } = require("express");
const { Videogame, Genre } = require("../db.js");

const videogameRouter = Router();

//http://localhost:3001/videogames.

videogameRouter.post("/", async (req, res) => {
  const {
    name,
    releaseDate,
    rating,
    imageUrl,
    description,
    platforms,
    genres,
    } = req.body;
    try {
      if(name){
        console.log(name)
    const videogameCreated = await Videogame.create({
      name,
      releaseDate,
      imageUrl,
      description,
      rating,   
      platforms,
    });
    
    const generoDb = await Genre.findAll({
      where: {name: genres,}
      });
      // console.log(generoDb)
      await videogameCreated.addGenre(generoDb);
      return res.status(200).send("Videogame Created")
    } else {
      return res.send(videogameCreated);
    }
  } catch (error) {
    console.log(error);

  }
});

module.exports = videogameRouter;
