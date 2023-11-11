import React, { useState } from 'react';
import "../Css/EditarUsuario.css";
import {Form, Row, Col} from 'react-bootstrap';

const EditarUsuario = () => {
  return (
    <>
      <div className='contenerdorEditar'>
        <div className='Editarcolumna1'>
          <h3 className='tituRutina'>Registro de Usuario</h3>

          <label className='labEditar'>Nombre:</label>
          <input type="text" placeholder="Nombre de usuario" className='inputEditar'/>

          <label className='labEditar'>Apellido Paterno:</label>
          <input type="text" placeholder="Primer Apellido" className='inputEditar'/>

          <label className='labEditar'>Apellido Materno:</label>
          <input type="text" placeholder="Segundo Apellido" className='inputEditar'/>

          <label className='labEditar'>Teléfono:</label>
          <input type="text" placeholder="Ejem.96012030505" className='inputEditar'/>

          <Form.Check
            style={{color:'white', marginTop:'3%', marginLeft:'3%'}}
            inline
            label="Plan mensual"
            aria-label="option 1"/>

          <Form.Check
            style={{color:'white', marginTop:'3%'}}
            inline
            label="Solo un día"
            aria-label="option 1"/><br/>

          <Form.Check
            style={{color:'white', marginTop:'3%', marginLeft:'3%'}}
            inline
            label="Adquirio rutina"
            aria-label="option 1"/><br/>

          <button className='btEditar'>Guardar Registro</button>
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;
