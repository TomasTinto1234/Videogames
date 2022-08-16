const { Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
// const { getAllDetails } = require("./videogamesControllers");

const getGenres = async (req, res) => {
  try {
    const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const apiResponse = apiGenres.data.results.map((genre) => {
      return {
        name: genre.name,
        // id: genre.id,
      };
    });
    apiResponse.map(async (genre) => {
      // console.log(apiResponse)
      await Genre.findOrCreate({
        where: {
          name: genre.name,
          // id: genre.id,
        },
      });
    });
    return res.send(apiResponse);
  } catch (error) {
   console.log(error);
  }
};

module.exports = {
  getGenres,
  // getByGenre,
};

// const getByGenre = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (id) {
//       console.log(id)
//       const allVg = await getAllDetails()
//       const filteredByGenre = allVg.filter(
//         (el) => el.genres.includes(id)
//       );
//       filteredByGenre
//         ? res.status(200).json(filteredByGenre)
//         : res.status(404).send("Not found");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };