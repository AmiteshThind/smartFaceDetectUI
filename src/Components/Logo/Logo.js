import React from "react";
import Tilt from 'react-tilt';
import "./Logo.css"
import logo from './logo.png'
const Logo = ()=>{
    return(
        <div className=" col ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 120, width: 150 }} >
                <div className="Tilt-inner pa3">
                     <img style={{paddingTop:"5px"}}src={logo} alt="logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;