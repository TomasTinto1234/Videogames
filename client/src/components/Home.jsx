import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getCreated,
  orderByName,
  orderByRating,

} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import { Paginated } from "./Paginated";
import { SearchBar } from "./SearchBar";
import { FilterByGenre } from "./FilterByGenre";
import "./Home.css"


export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [/*orden*/, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, /*setVideogamesPerPage*/] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

//   console.log(allVideogames);

    const paginated = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  useEffect(() => {
    dispatch(getVideogames());

  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterCreated(e) {
    e.preventDefault()
    dispatch(getCreated(e.target.value))
    setCurrentPage(1);
    setOrden(`${e.target.value}`)
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div>
      <div className="botones">

      <div>
      <Link to='/' ><button className="select"><span>Landing Page</span></button></Link>
        <div>
          <SearchBar 
          setCurrentPage = {setCurrentPage}
          /> 
        </div>
        <div>
          <Link to="/videogame">
            <button className="select">Crear Juego</button>
          </Link>
          <button className="select"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Recargar Juegos
          </button> 
        </div>
            {/* <img className="landing-page" src="https://media.gettyimages.com/vectors/startup-rocket-icon-on-transparent-background-vector-id1283736705?s=612x612" width="50" height="50"></img> */}
        <div>
          <select className="select" onChange={(e) => handleFilterCreated(e)}>
            <option hidden={true}>Origen</option>
            <option value="All">Todos</option>
            <option value="Created">Creados DataBase</option>
            <option value="Existing">Originales</option>
          </select>
        </div>
        <div>

        <div>
          <FilterByGenre />
        </div>
      </div>

      <div>

          <select className="select" onChange={(e) => handleSort(e)}>
            <option hidden={true}>Por Nombre</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>

        <div>
          <select className="select" onChange={(e) => handleSortRating(e)}>
            <option hidden={true}>Por Puntaje</option>
            <option value="Max-Min">Mejores</option>
            <option value="Min-Max">Peores</option>
          </select>
        </div>
        </div>


<Paginated
  videogamesPerPage={videogamesPerPage}
  allVideogames={allVideogames.length}
  paginated={paginated}
/>
        <div>
          {currentVideogames.length === 0 ? (
               <div className="spinner">
               <span>L</span>
               <span>O</span>
               <span>A</span>
               <span>D</span>
               <span>I</span>
               <span>N</span>
               <span>G</span>
               <span>.</span>
               <span>.</span>
               <span>.</span>
             </div>
          ) : (
            currentVideogames &&
            currentVideogames.map((e) => {
              return (
                <div className="conteiner" key={e.id}>
                  <Link className="card" key={e.id} to={`/details/${e.id}`}>
                    <Card 
                      className="-stats"
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      imageUrl={e.imageUrl? e.imageUrl  : "https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1" }
                      genres={e.genres?.join(", ")}
                      // plataforms={e.plataforms?.join(",")}
                      rating={e.rating}
                      />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
