import React from 'react';
import '../Css/Ganancias.css';
import Grafica from '../Components/Ganancia/Grafica';
import GraficaEscala from '../Components/Ganancia/GraficaEscala';

const Ganancias = () => {
  return (
    <div className='containerGanan'>
      {/* <Grafica></Grafica> */}
      <GraficaEscala></GraficaEscala>
    </div>
  )
}

export default Ganancias

