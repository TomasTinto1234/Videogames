import React from "react";
import './Paginated.css';

export function Paginated ({videogamesPerPage, allVideogames, paginated}){
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++){
        pageNumber.push(i)
    };

    return (
        <nav className='pag'>
                <ul className='pagination'>

                {pageNumber && pageNumber.map(number => (
                    <li className='pagination' key = {number} >
                        <a className="select" onClick={()=> paginated(number)}>{number}</a>
                    </li>
                ))}                              
                </ul>

        </nav>
        
    )
}