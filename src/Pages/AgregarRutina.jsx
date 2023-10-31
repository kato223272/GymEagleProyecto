import React from 'react';
import '../Css/AgregarRutina.css';

function AgregarRutina (){
  return(
    <>
      <div className='Container'>
      <div className='Ruticolumna1'>
        <h3 className='tituRutina'>Información de Rutina</h3>
        <label className='labRutina'>Nombre:</label>
        <input type="text" placeholder="Nombre de rutina" className='inputRutina'/>
        
        <label className='labRutina'>Descripción de la rutina</label>
        <textarea rows={2} placeholder="Descripción" className='inputRutinaDescrip'
        style={{paddingTop:'1%'}}></textarea>

        <label className='labRutina'>Tiempo promedio de resultados</label>
        <select className='inputRutina'>
        <option disabled='false'>Resultados visto en:</option>
            <option value='1'>1-15 Dias</option>
            <option value='2'>15-30 Días</option>
            <option value='3'>1-2 Meses</option>
            <option value='4'>1-3 Meses</option>
        </select>



        <label className='labRutina'>Dato adicional</label>
        <input type="text" placeholder="Otros" className='inputRutina'/>
      </div>

      <div className='Ruticolumna2'>
        <h3 className='tituRutina'>Beneficios Corporales</h3>
          <label className='labRutina'>Edad:</label>
          <input type="text" placeholder="Nombre de rutina" className='inputRutina'/>

          <label className='labRutina'>Beneficios</label>
          <textarea rows={5} placeholder="Descripción" className='inputRutinaDescrip'
          style={{paddingTop:'1%'}}></textarea>

          <label className='labRutina'>Estatura</label>
          <input type="text" placeholder="Nombre de rutina" className='inputRutina'/>

          <label className='labRutina'>Peso</label>
          <input type="text" placeholder="Nombre de rutina" className='inputRutina'/>
      </div>
      
      </div>
      <div className='containerButton'>
      <button className='btRutina'>Guardar Registro</button>
      </div>
    </>
  )
}

export default AgregarRutina

