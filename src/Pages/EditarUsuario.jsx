import React, { useState } from 'react';
import { addMonths, format }from 'date-fns';
import "../Css/EditarUsuario.css";
import {Form, Row, Col} from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { DialogContent } from '@mui/material';

const EditarUsuario = () => {
const todayDate = new Date();
const obtenerFechaFormateada = (fecha) => {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
const fechaFormateada = obtenerFechaFormateada(todayDate);

const [body, setBody] = useState({ nombre:'', apellidoPaterno:'', apellidoMaterno:'', celular:'', fecha: fechaFormateada, plan:''})
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
}

const handleSeleccionarBoton = (opcion) => {
  if (seleccionarBoton === opcion) {
    setseleccionarBoton(null);
  } else {
    setseleccionarBoton(opcion);
  }
}

const handleSelectRutina = () =>{
  alertValues = {title: 'Nota!', text: 'El pago de un día no da acceso al cliente a la página de rutinas', icon: 'warning'};
  messageAlert(alertValues);
  setRutina(!rutina);
}

const handleChange = ({target}) =>{
  const {name, value} = target;
  setBody({
    ...body,
    [name]:value
  });
}

const calcularProximoPago = () =>{
  const fechaHoy = new Date(todayDate);
  const proximaFechaPago = addMonths(fechaHoy, 1);
  if (proximaFechaPago.getMonth() === 0) {
    proximaFechaPago.setFullYear(proximaFechaPago.getFullYear() + 1);
  }
  const formatoFecha = 'yyyy-MM-dd';
  const fechaPago = format(proximaFechaPago, formatoFecha);
  
  return fechaPago;
}

const handlePayDay = async() =>{
  try {
    await axios.post('http://localhost:3001/gimnasio/asistencia/registrarplandia', body)
    alertValues = {title: 'Agregado!', text: 'Cliente añadido exitosamente', icon: 'success'};
    messageAlert(alertValues);
    setBody({id_cliente:0, nombre: '', apellidoPaterno: '', apellidoMaterno: '', celular: '', fecha: fechaFormateada, plan:''});
    setseleccionarBoton(null);
    setRutina(false);
  } catch (error) {
    console.log(error);
    alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error', icon: 'error'};
    messageAlert(alertValues);
  }
}

const handleRegisterMensualidad = async(id) =>{
  const fechaActual = fechaFormateada;
  const fechaPago = calcularProximoPago();

  try {
    await axios.post('http://localhost:9000/gimnasio/mensualidades/registrar', {id_cliente:id, fechaActual:fechaActual, fecha:fechaPago})
    if (rutina) {
      registrarClienteRutinas();
    }else{
      alertValues = {title: 'Agregado!', text: 'Cliente añadido exitosamente', icon: 'success'};
      messageAlert(alertValues);
    }
  } catch (error) {
    console.log(error);
    alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error al registrar la mensualidad', icon: 'error'};
    messageAlert(alertValues);
  }
}

const handlePayMonth = async() =>{
  try {
    const cliente = await axios.post('http://localhost:9000/gimnasio/clientes/registrar', body)
    const idCliente = cliente.data.newCliente.id_cliente;
    handleRegisterMensualidad(idCliente)
  } catch (error) {
    console.log(error);
    alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error al añadir al cliente', icon: 'error'};
    messageAlert(alertValues);
  }
}

const crearContraseña = () =>{
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const longitudContraseña = 8;

    let contraseña = '';
    for (let i = 0; i < longitudContraseña; i++) {
      const caracterAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
      contraseña += caracterAleatorio;
    }

  return contraseña;
}
const registrarClienteRutinas = async() =>{
  const contraseña = crearContraseña();
  const nombre = body.nombre;
  const apPaterno = body.apellidoPaterno;
  const apMaterno = body.apellidoMaterno;
  const celular = body.celular;
  console.log(contraseña);
  try {
    const info = await axios.post('http://localhost:3001/gimnasio/clientesrutina/registrar',{nombre:nombre, apellidoPaterno:apPaterno, apellidoMaterno:apMaterno, celular:celular, contraseña:contraseña})
    const contraseñaCliente = info.data.contraseña;
    alertValues = {title: 'Agregado!', text: 'Cliente añadido con acceso a rutinas exitosamente, contraseña: '+contraseñaCliente, icon: 'success'};
    messageAlert(alertValues);
  } catch (error) {
    console.log(error)
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
      handlePayMonth();
      setBody({ nombre: '', apellidoPaterno: '', apellidoMaterno: '', celular: '', fecha: fechaFormateada });
      setseleccionarBoton(null);
      setRutina(false);
    } else if (seleccionarBoton === 'soloUnDia') {
      handlePayDay();
    }
  }
}
  return (
    <>
      <div className='contenerdorEditar'style={{display:'flex'}} >
        <div className='EditarCajaColumnas'>
          <h3 className='tituRutina'>Registro de Usuario</h3>

          <div className='columnas12Editar'>
            <div className='EditarColumna1'>
                <label className='labEditar'>Nombre:</label><br/>
                <input type="text" placeholder="Nombre de usuario" 
                className='inputEditar' value={body.nombre} name='nombre' onChange={handleChange}/>

                <label className='labEditar'>Apellido Paterno:</label>
                <input type="text" placeholder="Primer Apellido" className='inputEditar'
                value={body.apellidoPaterno} name='apellidoPaterno' onChange={handleChange}/>

                <label className='labEditar'>Apellido Materno:</label>
                <input type="text" placeholder="Segundo Apellido" className='inputEditar'
                value={body.apellidoMaterno} name='apellidoMaterno' onChange={handleChange}/>
            </div>

            <div className="EditarColumna2">
              <label className='labEditar'>Teléfono:</label>
              <input type="text" inputMode="numeric" pattern="[0-9]*" 
              placeholder="Ejem.96012030505" className='inputEditar' value={body.celular} name='celular' 
              onChange={handleChange} />

            <Form.Check
              className='checkEditar'
              inline
              checked={seleccionarBoton === 'PlanMensual'}
              onChange={() => handleSeleccionarBoton('PlanMensual')}
              type='radio'
              label="Plan mensual"
              aria-label="option"/>

            <Form.Check
              className='checkEditar'
              inline
              checked={seleccionarBoton === 'soloUnDia'}
              onChange={() => handleSeleccionarBoton('soloUnDia')}
              type='radio'
              label="Solo un día"
              aria-label="option"/><br/>

            <Form.Check
              className='checkEditar'
              inline
              checked={rutina}
              onChange={() => handleSelectRutina()}
              type='radio'
              label="Adquirio rutina"
              aria-label="option"/><br/>

            <button className='btEditar' onClick={handleRegister}>Guardar Registro</button>
            </div>
          </div>       
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;
