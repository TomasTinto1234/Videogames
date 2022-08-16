const { Router } = require("express");
const {
  getAllVideogames,
  getApiDetails,
  getDbDetails,
  deleteVideogame,
  // deleteVG
} = require("../controllers/videogamesControllers");

const videogamesRouter = Router();

videogamesRouter.get("/", async (req, res) => {
  const name = req.query.name;
  const videogames = await getAllVideogames();
  try {
    if (name) {
      const videogameName = await videogames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())   // el includes es lo que hace que traiga aunquesea la mitad del nombre
      );
      videogameName.length
        ? res.status(200).send(videogameName)
        : res.status(304).send("Videogame not found");
    } else {
      res.status(200).send(videogames);
    }
  } catch (error) {
    console.log(error);
    req.end()
  }
});

videogamesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    if (id.length < 7) {
      let videogame = await getApiDetails(id);
      res.status(200).json(videogame);
    } else {
      let videogame = await getDbDetails(id);
      res.status(200).json(videogame);
    }
  } catch (error) {
    res.status(404).json("IDVideogame not found");
  }
});


videogamesRouter.delete("/:id", async (req, res) => {
  const  id  = req.params.id;
  console.log(id);
  try {
      await deleteVideogame(id);
      console.log(id)
    res.status(200).send("videogame deleted");

  } catch (error) {
    console.log(error);
  }
});

module.exports = videogamesRouter;

// videogamesRouter.put("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let {
//       name,
//       description,
//       releaseDate,
//       rating,
//       imageUrl,
//       platforms,
//       genres,
//     } = req.body;
//     await Videogame.update(
//       { name, description, releaseDate, rating, imageUrl, platforms, genres },
//       {
//         where: {
//           id,
//         },
//       }
//     );
//     res.status(200).send("videojuego actualizado")
//   } catch (error) {
//     console.log(error);
//   }
// });

// // videogamesRouter.get("/:id", async (req, res)=>{
// //   const { id }= req.params
// //   let videogame1= await getAllVideogames()
// //   if(id){
// //     const videogameId = await videogame1.filter(e=>e.id == id)
// //     videogameId.length? 
// //     res.status(200).json(videogameId.length)
// //    : res.status(404).send("no esta ese videojuego")
// //   }
// // })