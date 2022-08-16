const { Videogame, Genre } = require("../db.js");
const { API_KEY } = process.env;
const axios = require("axios");

const getApiVideogames = async () => {
  let apiVideogames = [];
  for (let i = 1; i <= 5; i++) {
    let api = await axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`);

    api.data.results.map((game) => {
      apiVideogames.push({
        id: game.id,
        name: game.name,
        imageUrl: game.background_image,
        releaseDate: game.released,
        rating: game.rating,
        platforms: game.platforms.map((game) => game.platform.name),
        genres: game.genres.map((genre) => genre.name),
      });
    });
  }

  return apiVideogames;
};
// Esta funcion me trae los datos de los videogame de la db.
async function getDbVideogames() {
  const gamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const newDb = gamesDb.map((e) => {
    return {
      id: e.dataValues.id,
      name: e.dataValues.name,
      releaseDate: e.dataValues.releaseDate,
      imageUrl: e.dataValues.imageUrl,
      rating: e.dataValues.rating,
      platforms: e.dataValues.platforms,
      genres: e.dataValues.genres.map((genre) => genre.name),
    };
  });
  return newDb;
}
// Esta funcion concatena los datos de los videogame de la api con los de la db.
const getAllVideogames = async () => {
  const apiInfo = await getApiVideogames();
  const dbInfo = await getDbVideogames();
  const format = dbInfo.concat(apiInfo);
  return format;
};
const getApiDetails = async (id) => {
  const api = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

  const apiDetails = await api.data;
  return {
    id: apiDetails.id,
    name: apiDetails.name,
    description: apiDetails.description_raw,
    imageUrl: apiDetails.background_image,
    releaseDate: apiDetails.released,
    rating: apiDetails.rating,
    platforms: apiDetails.platforms.map((p) => p.platform.name),
    genres: apiDetails.genres.map((genre) => genre.name),
  };
};

async function getDbDetails(id) {
  const gamesDbDetails = await Videogame.findOrCreate({
    where: { id: id },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return {
    id: gamesDbDetails[0].id,
    name: gamesDbDetails[0].name,
    description: gamesDbDetails[0].description,
    imageUrl: gamesDbDetails[0].imageUrl,
    releaseDate: gamesDbDetails[0].releaseDate,
    rating: gamesDbDetails[0].rating,
    platforms: gamesDbDetails[0].platforms,
    genres: gamesDbDetails[0].genres.map((genre) => genre.name),
    createdInDb: true,
  };
}


const deleteVideogame = async(id) => {
  try{
  const deletedVG = await Videogame.findByPk(id);
  if(deletedVG){

      await deletedVG.destroy({where: { id: id }});   
  }
  }catch(error){
      console.log(error)
  }
};

module.exports = {
  getAllVideogames,
  getApiDetails,
  getDbDetails,
  deleteVideogame,
  // deleteVG
};

  // const deleteVG = async (req, res) => {
  //   const  id  = req.params.id;
  //   try {
  //     await Videogame.destroy({ where: { id: id } });
  //     res.send(200).send("juego elimiado");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };