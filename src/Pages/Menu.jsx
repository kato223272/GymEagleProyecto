import React, { useState } from 'react';
import Navbar from '../Components/Menu/Navbar'
import '../Css/Menu.css'


import Editar from '../Image/imgMenu/editargym.png';
import EditarHover from '../Image/imgMenu/editarHoverGym.png';

import Asistencia from '../Image/imgMenu/asistenciaGym.png';
import AsistenciaHover from '../Image/imgMenu/asistenciaGymHover.png';

import Rutina from '../Image/imgMenu/rutinaGym.png';
import RutinaHover from '../Image/imgMenu/rutinaGymHover.png';

import GananciaHover from '../Image/imgMenu/GananciaGymHover.png'
import Ganancia from '../Image/imgMenu/GananciaGym.png'

const Menu = () => {
  const [imagenHoverAsistencia, setImagenHoverAsistencia] = useState(AsistenciaHover);
  const [imagenHoverRutina, setImagenHoverRutina] = useState(RutinaHover);
  const [imagenHoverGanancia, setImagenHoverGanancia] = useState(Ganancia);

  const handleImagenHoverAsistencia = (nuevaImagen) => {
    setImagenHoverAsistencia(nuevaImagen);
  };
  
  const handleImagenHoverRutina = (nuevaImagen) => {
    setImagenHoverRutina(nuevaImagen);
  };

  const handleImagenHoverGanancia = (nuevaImagen) => {
    setImagenHoverGanancia(nuevaImagen);
  };

  return (
    <>
   <Navbar/>
    <div className='Contenedor'>
    <a href="/Asistencias">
      <div className='lista'    
      onMouseEnter={() => handleImagenHoverAsistencia(AsistenciaHover)}
      onMouseLeave={() => handleImagenHoverAsistencia(Asistencia)}>
        <div className='icono' style={{border: '#434343 5px solid'}}>
          <img
            src={imagenHoverAsistencia}
            alt=""          
          />
        </div>
        <div className='letra'>
          <h3>LISTA DE ASISTENCIA</h3>
        </div>
      </div>
    </a>

    <a href="/Rutinas">
      <div className='rutina'    
         onMouseEnter={() => handleImagenHoverRutina(RutinaHover)}
         onMouseLeave={() => handleImagenHoverRutina(Rutina)}>
        <div className='icono' style={{border: '#E6862E 5px solid'}}>
          <img
            src={imagenHoverRutina}
            alt=""          
          />
        </div>
        <div className='letra'>
          <h3>AGREGAR RUTINA</h3>
        </div>
      </div>
      </a>

      <a href="/Ganancias">
      <div className='ganancia'
      onMouseEnter={() => handleImagenHoverGanancia(Ganancia)}
      onMouseLeave={() => handleImagenHoverGanancia(GananciaHover)}>
      <div className='icono' style={{border: '#2BA53E 5px solid'}}>
     
          <img src={imagenHoverGanancia} alt="" />
        </div>
        <div className='letra'>
          <h3>VER GANANCIAS</h3>
        </div>
      </div>
      </a>
    </div>
    </>
  )
}

export default Menu
