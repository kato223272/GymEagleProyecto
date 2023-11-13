import React, { useState } from 'react';
import "../Css/EditarUsuario.css";
import {Form, Row, Col} from 'react-bootstrap';

const EditarUsuario = () => {
const [seleccionarBoton, setseleccionarBoton]= useState(null);

const handleSeleccionarBoton = (opcion) => {
  if (seleccionarBoton === opcion) {
    setseleccionarBoton(null);
  } else {
    setseleccionarBoton(opcion);
  }
};


  return (
    <>
      <div className='contenerdorEditar'style={{display:'flex'}} >
        <div className='Editarcolumna1' >
        <h3 className='tituRutina'>Registro de Usuario</h3>
          <div className='contenidoDatosEditar'>
          <div >
          <label className='labEditar' >Nombre:</label>
          <input style={{marginLeft:'10%'}} type="text" placeholder="Nombre de usuario" className='inputEditar'/>

          <label className='labEditar' style={{marginLeft:'3.7%'}}>Apellido Materno:</label>
          <input type="text" placeholder="Segundo Apellido" className='inputEditar'/>
          </div>



          <div >
          <label className='labEditar' >Apellido Paterno:</label>
          <input type="text" placeholder="Primer Apellido" className='inputEditar'/>

          <label className='labEditar' style={{marginLeft:'4%'}}>Teléfono:</label>
          <input style={{marginLeft:'11%'}} type="text" placeholder="Ejem.96012030505" className='inputEditar'/>

          </div>
          </div>
       
         <div className='checkEditar' style={{display:'flex'}}  >
          <Form.Check
            style={{color:'white', marginTop:'3%', marginLeft:'3%'}}
            inline
            checked={seleccionarBoton === 'PlanMensual'}
            onChange={() => handleSeleccionarBoton('PlanMensual')}
            type='radio'
            label="Plan mensual"
            aria-label="option"/>

          <Form.Check
            style={{color:'white', marginTop:'3%'}}
            inline
            checked={seleccionarBoton === 'soloUnDia'}
            onChange={() => handleSeleccionarBoton('soloUnDia')}
            type='radio'
            label="Solo un día"
            aria-label="option"/><br/>

          <Form.Check
            style={{color:'white', marginTop:'3%', marginLeft:'3%'}}
            inline
            checked={seleccionarBoton === 'AdquirioRutina'}
            onChange={() => handleSeleccionarBoton('AdquirioRutina')}
            type='radio'
            label="Adquirio rutina"
            aria-label="option"/><br/>
            </div>

          <button className='btEditar'>Guardar Registro</button>
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;
