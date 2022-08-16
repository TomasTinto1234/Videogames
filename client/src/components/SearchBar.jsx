import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {getVideogamesByName} from '../actions';
import "./SearchBar.css"

export function SearchBar ({setCurrentPage}) {
    const dispacht = useDispatch();
    const [name, setName] = useState("");


    function handleInputName (e){
        e.preventDefault();
        setName(e.target.value.toLowerCase());
        console.log(name)
    };

    function handleSubmit (e){
        e.preventDefault();
        if(!name){
            alert("hay que poner un nombre existente"); 
        }
        dispacht(getVideogamesByName(name));
        setCurrentPage(1);
        setName("");
    };

    return (
        <div >
        <div className='search'>
            <input className="searchTerm"  type = "input" placeholder="Búsqueda por nombre" onChange={e => handleInputName(e)}  />
            <button className="select" type="button"  onClick={e => handleSubmit(e)}>Buscar </button>
        </div>
        </div>
    )
}