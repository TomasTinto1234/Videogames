import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const FILTER_BY_CREATE = "FILTER_BY_CREATE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const GET_DETAIL = "GET_DETAIL";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
export const CLEAN ="CLEAN"

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    });
  };
}
// export function getVideogames() {
//   return async function (dispatch) {
//     try {
//       const videogames = await axios
//         .get("http://localhost:3001/videogames");
//       dispatch({
//         type: GET_VIDEOGAMES,
//         payload: videogames.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: GET_VIDEOGAMES,
//         error: error,
//       });
//     }
//   };
// }

export function getCreated(payload) {
  return {
    type: FILTER_BY_CREATE,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      var json2 = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      console.log(json2)
      return dispatch({
        type: FILTER_BY_NAME,
        payload: json2.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getVideogamesByGenre(payload) {
  return async function (dispatch) {
    try {
      var json3 = await axios.get(`http://localhost:3001/videogames`);
      var json4 = json3.data.filter((e) => e.genres.includes(payload));
      return dispatch({
        type: FILTER_BY_GENRE,
        payload: json4,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json5 = await axios.get(`http://localhost:3001/videogames/${id}`);
      // console.log(json5)
      return dispatch({
        type: GET_DETAIL,
        payload: json5.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      var json6 = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: GET_GENRES,
        payload: json6.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      var json7 = await axios.post("http://localhost:3001/videogame", payload)
      return dispatch({
        type :POST_VIDEOGAME,
        payload :json7.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const deleteVideogame = (id) => {
  console.log(id)
  return async function(dispatch){
      try{
          await axios.delete(`http://localhost:3001/videogames/${id}`)
          return dispatch({
              type: 'DELETE_VIDEOGAME',

          })
      }catch(err){
          console.log(err)
      }
  }
}

export function clean() {
  return {
    type: CLEAN,
  };
}
