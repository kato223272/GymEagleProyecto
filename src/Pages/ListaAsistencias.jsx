import React from 'react'
import Tabla from '../Components/ListaAsistencias/TablaAsistecia'
import '../Css/ListaAsistencias.css'

const ListaAsistencias = () => {
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString();

  return (
   <>
   
   <div className='fila1' style={{display:'flex'}}>
   <div className='fecha'><p>Fecha: {fechaFormateada}</p></div>
    <h5>color de los botones:</h5>
   <div className='Circulo'></div>
   <h6>Faltó</h6>
   <div className='Circulo2'></div>
   <h6>Asistió</h6>
   </div>
  <Tabla/>

   </>
  )
}

export default ListaAsistencias
