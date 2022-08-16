import React from "react";
import { Link } from "react-router-dom";



export default function LandingPage(){
    return (
        <div className="spinner" >
        <div >
            <h1></h1>
           
          <span> <br/><u>  videogames app </u></span>
            <img className="landing-page" src="https://ih1.redbubble.net/image.1187284973.7949/flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg" width="350" height="75"></img>
            <div >
                <Link to="/Home"><button className="select">Home</button></Link>

            </div>
            </div>
        </div>
    )
}
