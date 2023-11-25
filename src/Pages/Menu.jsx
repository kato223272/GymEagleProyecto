import React, { useState } from 'react';
import Navbar from '../Components/Menu/Navbar'
import '../Css/Menu.css'

import BotonAsistencia from '../Components/Menu/Boton';
import BotonRutina from '../Components/Menu/Boton';
import BotonGanancias from '../Components/Menu/Boton';
import BotonAgregar from '../Components/Menu/Boton'

import Asistencia from '../Image/imgMenu/asistenciaGym.png';
import AsistenciaHover from '../Image/imgMenu/asistenciaGymHover.png';

import Rutina from '../Image/imgMenu/rutinaGym.png';
import RutinaHover from '../Image/imgMenu/rutinaGymHover.png';

import GananciaHover from '../Image/imgMenu/GananciaGymHover.png'
import Ganancia from '../Image/imgMenu/GananciaGym.png'

import Agregar from '../Image/imgMenu/editargym.png'
import AgregarHover from '../Image/imgMenu/editarHoverGym.png'

const Menu = () => {
  const [imagenHoverAsistencia, setImagenHoverAsistencia] = useState(AsistenciaHover);
  const [imagenHoverRutina, setImagenHoverRutina] = useState(RutinaHover);
  const [imagenHoverGanancia, setImagenHoverGanancia] = useState(Ganancia);
  const [imagenHoverAgregar, setImagenHoverAgregar] = useState(Agregar);

  const handleImagenHoverAsistencia = (nuevaImagen) => {
    setImagenHoverAsistencia(nuevaImagen);
  };
  
  const handleImagenHoverRutina = (nuevaImagen) => {
    setImagenHoverRutina(nuevaImagen);
  };

  const handleImagenHoverGanancia = (nuevaImagen) => {
    setImagenHoverGanancia(nuevaImagen);
  };

  const handleImagenHoverAgregar = (nuevaImagen) => {
    setImagenHoverAgregar(nuevaImagen);
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
      />

      <BotonAgregar
       image={imagenHoverAgregar} 
       href="/editar" 
       props={{ title: "Agregar" }} 
       uniqueClassName="agregar" 
        style={{border: 'rgb(218, 208, 69) 5px solid'}}
        onMouseEnter={() => handleImagenHoverAgregar(Agregar)}
      onMouseLeave={() => handleImagenHoverAgregar(AgregarHover)}
      ></BotonAgregar>


     <BotonRutina

       image={imagenHoverRutina} 
       href="/Rutinas" 
       props={{ title: "Rutinas" }} 
       uniqueClassName="rutina" 
        style={{border: '#E6862E 5px solid'}}
        onMouseEnter={() => handleImagenHoverRutina(RutinaHover)}
        onMouseLeave={() => handleImagenHoverRutina(Rutina)}
      />

    {/* <BotonGanancias
       image={imagenHoverGanancia} 
       href="/Ganancias" 
       props={{ title: "Ver ganancias" }} 
       uniqueClassName="ganancia" 
        style={{border: '#2BA53E 5px solid'}}
        onMouseEnter={() => handleImagenHoverGanancia(Ganancia)}
      onMouseLeave={() => handleImagenHoverGanancia(GananciaHover)}
      /> */}
    </div>
    
    </>
  )
}

export default Menu
