import React, { useState } from 'react';
import "../Css/EditarUsuario.css";
import {Form, Row, Col} from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditarUsuario = () => {
const fechaActual = new Date();
const fechaFormateada = fechaActual.toLocaleDateString();
const [body, setBody] = useState({nombre:'', apellidoPaterno:'', apellidoMaterno:'', celular:'', fecha: fechaFormateada })
const [seleccionarBoton, setseleccionarBoton]= useState(null);
const [rutina, setRutina] = useState(false);
const permitido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
const celularPermitido = /^[1-9]\d{9}$/;
let alertValues = {title:'', text:'', icon:''};

const messageAlert = (alertValues) => {
  Swal.fire({
    title: alertValues.title,
    text: alertValues.text,
    icon: alertValues.icon,
    confirmButtonText: 'Aceptar'
  });
};

const handleSeleccionarBoton = (opcion) => {
  if (seleccionarBoton === opcion) {
    setseleccionarBoton(null);
  } else {
    setseleccionarBoton(opcion);
  }
}

const handleSelectRutina = () =>{
  setRutina(!rutina);
}

const handleChange = ({target}) =>{
  const {name, value} = target;
  setBody({
    ...body,
    [name]:value
  });
}
const handlePayDay = async() =>{
  try {
    const respuesta = await axios.post('http://localhost:3001/gimnasio/asistencia/registrar', body)
    alertValues = {title: 'Agregado!', text: 'Cliente añadido exitosamente', icon: 'success'};
    messageAlert(alertValues);
  } catch (error) {
    console.log(error);
    alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error', icon: 'error'};
    messageAlert(alertValues);
  }
}

const handleRegister = () =>{
  if (!body.nombre || !body.apellidoPaterno || !body.apellidoMaterno || !body.celular || seleccionarBoton === null) {
    alertValues = {title: 'Error!', text: 'Faltan campos por llenar', icon: 'error'};
    messageAlert(alertValues);
  } else if (!permitido.test(body.nombre) || !permitido.test(body.apellidoPaterno) || !permitido.test(body.apellidoMaterno)) {
    alertValues = {title: 'Error!', text: 'No se aceptan caracteres especiales, solo acentos', icon: 'error'};
    messageAlert(alertValues);
  } else if (!celularPermitido.test(body.celular)) {
    alertValues = {title: 'Error!', text: 'El número de celular debe tener 10 números y no puede empezar en 0', icon: 'error'};
    messageAlert(alertValues);
  } else {
    if (seleccionarBoton === 'PlanMensual') {
      alertValues = {title: 'Aceptado', text: 'Datos aceptados, se ha elegido el plan mensual', icon: 'success'};
      if (rutina) {
        alertValues = { text: 'Datos aceptados, se ha elegido el plan mensual con acceso a las rutinas'};
      }
      messageAlert(alertValues);
      console.log(body);
    } else if (seleccionarBoton === 'soloUnDia') {
      handlePayDay();
    }
  }
}
  return (
    <>
      <div className='contenerdorEditar'style={{display:'flex'}} >
        <div className='Editarcolumna1' >
        <h3 className='tituRutina'>Registro de Usuario</h3>
          <div className='contenidoDatosEditar'>
          <div >
          <label className='labEditar' >Nombre:</label>
          <input style={{marginLeft:'10%'}} type="text" placeholder="Nombre de usuario" className='inputEditar'
          value={body.nombre} name='nombre' onChange={handleChange}/>

          <label className='labEditar' style={{marginLeft:'3.7%'}}>Apellido Materno:</label>
          <input type="text" placeholder="Segundo Apellido" className='inputEditar'
          value={body.apellidoMaterno} name='apellidoMaterno' onChange={handleChange}/>
          </div>



          <div >
          <label className='labEditar' >Apellido Paterno:</label>
          <input type="text" placeholder="Primer Apellido" className='inputEditar'
          value={body.apellidoPaterno} name='apellidoPaterno' onChange={handleChange}/>

          <label className='labEditar' style={{marginLeft:'4%'}}>Teléfono:</label>
          <input style={{marginLeft:'11%'}} type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Ejem.96012030505" className='inputEditar'
          value={body.celular} name='celular' onChange={handleChange} />
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
            checked={rutina}
            onChange={() => handleSelectRutina()}
            type='radio'
            label="Adquirio rutina"
            aria-label="option"/><br/>
            </div>

          <button className='btEditar' onClick={handleRegister}>Guardar Registro</button>
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;
