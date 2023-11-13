import React, { useState } from 'react';
import Navbar from '../Components/Menu/Navbar'
import '../Css/Menu.css'
import BotonAsistencia from '../Components/Menu/Botones';
import BotonRutina from '../Components/Menu/Botones';
import BotonGanancias from '../Components/Menu/Botones';

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
    <div className='ContenedorMenu'>
    
    <BotonAsistencia
       image={imagenHoverAsistencia} 
       href="/Asistencias" 
       props={{ title: "Asistencias" }} 
       uniqueClassName="lista" 
        style={{border: '#434343 5px solid'}}
        onMouseEnter={() => handleImagenHoverAsistencia(AsistenciaHover)}
        onMouseLeave={() => handleImagenHoverAsistencia(Asistencia)}
      ></BotonAsistencia>

     <BotonRutina
       image={imagenHoverRutina} 
       href="/Rutinas" 
       props={{ title: "Rutinas" }} 
       uniqueClassName="rutina" 
        style={{border: '#E6862E 5px solid'}}
        onMouseEnter={() => handleImagenHoverRutina(RutinaHover)}
        onMouseLeave={() => handleImagenHoverRutina(Rutina)}
      ></BotonRutina>

 <BotonGanancias
       image={imagenHoverGanancia} 
       href="/Ganancias" 
       props={{ title: "VER GANANCIAS" }} 
       uniqueClassName="ganancia" 
        style={{border: '#2BA53E 5px solid'}}
        onMouseEnter={() => handleImagenHoverGanancia(Ganancia)}
      onMouseLeave={() => handleImagenHoverGanancia(GananciaHover)}
      ></BotonGanancias>

    </div>
    </>
  )
}

export default Menu
