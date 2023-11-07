import React from "react";
import { Image } from "react-bootstrap";
import './Navbar.css';

export function ButtonMenu(props){
    return(
        <a href="/asistencias">
            <div className="containerOpcion">
                <div className="containerImg">
                    <Image className="imgOpcion">{props.Image}</Image>
                </div>

                <div className="cajaDescripcion">
                    <label>{props.indicacion}</label>
                </div>
            </div>
        </a>
    );
}