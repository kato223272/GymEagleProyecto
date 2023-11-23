import React from 'react';
import '../Menu/Botones.css'

const BotonMenu = ({  image, href, props,uniqueClassName, style, onMouseEnter, onMouseLeave  }) => {
  return (
    <a href={href}>
    <div className={`ContenedorBotonMenu ${uniqueClassName}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className='IconoMenu' style={style}>
      <img src={image} alt="Image" className="ImagenDeBotonDeMenu" />
    </div>
    <div className='TituloMenuBotones'>
    <h4>{props.title}</h4>
    </div>
    </div>
    
    </a>
  );           
};

export default BotonMenu;
