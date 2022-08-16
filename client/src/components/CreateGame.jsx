import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, clean } from "../actions/index";
import { plataformas } from "./plataformas.js";


function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Campo obligatorio";
  }

  if (!input.description) {
    errors.description = "Campo obligatorio";
  }

  if (!input.rating || input.rating < 0 || input.rating > 5) {
    errors.rating = "Campo obligatorio";
  }

  if (input.plataforms === 0) {
    errors.platforms = "Campo obligatorio";
  }
  if (input.genres === 0) {
    errors.genres = "Campo obligatorio";
  }

  return errors 
}

export function CreateGame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  const [input, setinput] = useState({
    name: "",
    imageUrl: "",
    description: "",
    releaseDate: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(clean());
  }, [dispatch]);

  function handleChange(e) {
    setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setinput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSelect2(e) {
    if (!input.platforms.includes(e.target.value))
      setinput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(input));
    console.log(input);
    alert("Juego creado con éxito");
    setinput({
      name: "",
      imageUrl: "",
      description: "",
      releaseDate: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    history.push("/home");
  }
  // // function handleSelect(e) {
  // //   input.types.length < 2
  // //     ? setInput({
  // //         ...input,
  // //         types: [...input.genres, e.target.value],
  // //       })
  // //     : alert("Max two genres")
  // // }

  function handleDelete(p) {
    setinput({ ...input, platforms: input.platforms.filter((pl) => pl !== p) });
  }

  function handleDeleteG(g) {
    setinput({ ...input, genres: input.genres.filter((gen) => gen !== g) });
  }

  return (
    <div>
      <Link to="/home">
        <button className="select">VOLVER</button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <div className="search">
              <input
                className="searchTerm"
                type="text"
                value={input.name}
                placeholder="Nombre del juego"
                name="name"
                onChange={(e) => handleChange(e)}
                required //campo requerido
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="search">
              <input
                className="searchTerm"
                type="text"
                value={input.description}
                placeholder="Descripción del juego"
                name="description"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.description && <p>{errors.description}</p>}
            </div>
            <div className="search">
              <input
                className="searchTerm"
                type="date"
                value={input.releaseDate }
                name="releaseDate"
                placeholder="Fecha de Lanzamiento📆"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="search">
              <input
                className="searchTerm"
                type="text"
                value={input.rating}
                name="rating"
                placeholder="Puntaje"
                onChange={(e) => handleChange(e)}
                required
                />
              {errors.rating && <p>{errors.rating}</p>}
            </div>
            <div className="search">
              <input
                className="searchTerm"
                type="text"
                value={input.imageUrl}
                name="imageUrl"
                placeholder="URL de imagen"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <div>
                <select
                  className="select"
                  onChange={(e) => handleSelect2(e)}
                  required
                >
                  <option className="searchTerm" hidden={true}>
                    Plataformas
                  </option>
                  {plataformas.map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
                {errors.platforms && <p>{errors.platforms}</p>}
              </div>

              <div>
                <div>
                  {input.platforms.map((p) => (
                    <div className="searchTerm">
                      {p}
                      <button type="button" onClick={() => handleDelete(p)}>
                        x
                      </button>
                    </div>
                  ))}
                </div>

                <select
                  className="select"
                  onChange={(e) => handleSelect(e)}
                  required
                >
                  <option className="searchTerm" hidden={true}>
                    Géneros
                  </option>
                  {genres.map((e) => (
                    <option className="searchTerm" value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.genres && <p>{errors.genres}</p>}
              </div>
            </div>

            <div>
              {input.genres.map((g) => (
                <div className="searchTerm">
                  {g}
                  <button type="button" onClick={() => handleDeleteG(g)}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* <button className="select" type="submit">
            CREAR
          </button> */}
        </div>
<button className="select" type="submit">Crea Tu Juego</button>
      </form>
    </div>
  );
}
