import React from "react";

export default function Card ( {imageUrl,image, name, genres, rating,}) {
    return (
        <div >
          
            <div>
            <img src = {image? image
          :imageUrl?imageUrl : "https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1"}  alt = "img not found" width="350px" height="300px"/>
            <h3>{name.toUpperCase()}</h3>
            <p>Géneros: {genres}</p>
            <p> Rating: {rating}⭐</p>

            
            </div>
        </div>
    );
} 