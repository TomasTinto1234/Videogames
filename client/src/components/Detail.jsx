import React from 'react';
import {useEffect} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';
import {getDetail, clean, deleteVideogame} from '../actions';
import {useDispatch, useSelector} from "react-redux";
import "./Detail.css"

export function Detail(){
    const dispatch = useDispatch();
    const aGame = useSelector((state) => state.detail);
    const history = useHistory();
    const {id} = useParams();

     console.log(aGame)

    useEffect(() => { 
        dispatch(getDetail(id));

        dispatch(clean())
    },[dispatch]);

    function handleDelete (){
        console.log(id)
        dispatch(deleteVideogame(id));
        alert('Juego eliminado de la DB')
        history.push("/home")
    };

    return(
        <div>
           
            <div className="background">
            {
                <div>
                    
                {<button onClick={e=>{handleDelete(e)}}>Borrar Juego</button>}

                    <div className="-stats" >
                    <h1><u>{aGame.name}</u></h1>
                    </div>
                    <img src={aGame.imageUrl? aGame.imageUrl
          : "https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1"} className="image-details" alt = "img not found" width="450" height="350"/>
                    <h3><u>Géneros</u>: {aGame.genres?.join(", ")}</h3>
                    <h3><u>Plataformas</u>: {aGame.platforms?.join(", ")}</h3>
                    <h3><u>Puntaje</u>: {aGame.rating}⭐</h3>
                    <h3><u>Lanzamiento</u>: {aGame.releaseDate}📆</h3>
                    <h4><u>Descripción</u>: {aGame.description}</h4>
                </div> 
                
            }
            
            <Link to = '/home'>
                <button className='select'>VOLVER</button>
            </Link>
            </div>
            
        </div>
    )

}