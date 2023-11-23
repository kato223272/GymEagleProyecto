import React, { useState, useEffect } from 'react';
import { addMonths, addDays, format }from 'date-fns';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import "../ListaAsistencias/ListaAsistencias.css";
import axios from 'axios';
import Swal from 'sweetalert2';

const TablaAsistencias = () => {
  const [show, setShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [clientes, setClientes] = useState([]);
  // const [body, setBody] = useState({id:'', fecha:''});
  const [asistencia, setAsistencia] = useState("falta");
  let alertValues = {title:'', text:'', icon:''};

  const fechaActual = new Date();
  
  const obtenerFechaFormateada = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
  const fechaFormateada = obtenerFechaFormateada(fechaActual);

  useEffect(()=>{
    const getClientes = () =>{
      fetch('http://localhost:9000/gimnasio/clientes/obtenertodo')
      .then(res => res.json())
      .then(res => setClientes(res))
    }
    getClientes();
  },[])

  const messageAlert = (alertValues) => {
    Swal.fire({
      title: alertValues.title,
      text: alertValues.text,
      icon: alertValues.icon,
      confirmButtonText: 'Aceptar'
    });
  }

  const optionsAlert = ({id_cliente, idMensualidad, fechaFin}) => {
    Swal.fire({
      title: "Mensualidad vencida",
      text: "Pagar mensualidad?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Pagar",
      denyButtonText: `No pagar`
    }).then((result) => {
      if (result.isConfirmed) {
        pagarMensualidad(idMensualidad);
        crearNuevaMensualidad({id_cliente, fechaFin})
        const fechaPago = calcularProximoPago(fechaFin);
        Swal.fire("Mensualidad pagada!", "El proximo pago es: "+fechaPago, "success");
      } else if (result.isDenied) {
        cambiarEstatus(idMensualidad);
        Swal.fire("Mensualidad no pagada", 'Su estatus ha cambiado a "Adeudo"', "info");
      }
    });
  }
  const cambiarEstatus = async(idMensualidad) =>{
    try {
      const result = await axios.put('http://localhost:9000/gimnasio/mensualidades/cambiarestatus', {idMensualidad})
    } catch (error) {
      console.log(error);
      alertValues = {title:'Oops!', text:'Ha ocurrido un error al cambiar el estatus', icon:'error'};
      messageAlert(alertValues);
    }
  }

  const calcularProximoPago = (fechaFin) =>{
    const fecha = new Date(fechaFin);
    const proximaFecha = addDays(fecha, 1);
    const proximaFechaPago = addMonths(proximaFecha, 1);
    if (proximaFechaPago.getMonth() === 0) {
      proximaFechaPago.setFullYear(proximaFechaPago.getFullYear() + 1);
    }
    const formatoFecha = 'yyyy-MM-dd';
    const fechaPago = format(proximaFechaPago, formatoFecha);
    
    return fechaPago;
  }

  const crearNuevaMensualidad = async({id_cliente, fechaFin}) =>{
    const fechaPago = calcularProximoPago(fechaFin);
    console.log(fechaPago);
    try {
      await axios.post('http://localhost:9000/gimnasio/mensualidades/registrar', {id_cliente:id_cliente, fechaActual:fechaActual, fecha:fechaPago})
    } catch (error) {
      console.log(error);
      alertValues = {title:'Oops!', text:'Ha ocurrido un error al crear la nueva mensualidad', icon:'error'};
      messageAlert(alertValues);
    }
  }

  const pagarMensualidad = async(idMensualidad) =>{
    try {
      const pastMesualidad = await axios.put('http://localhost:9000/gimnasio/mensualidades/pagar', {idMensualidad})
    } catch (error) {
      console.log(error);
      alertValues = {title:'Oops!', text:'Ha ocurrido un error al pagar su mensualidad', icon:'error'};
      messageAlert(alertValues);
    }
  }

  const registrarAsistencia = async(id_cliente) =>{
    const userData = clientes.find(cliente => cliente.id_cliente === id_cliente);
    const nombre = userData.nombre;
    const apellidoPaterno = userData.apellidoPaterno;
    const apellidoMaterno = userData.apellidoMaterno;
    try {
      await axios.post('http://localhost:3001/gimnasio/asistencia/registrarplanmes', {nombre: nombre, apellidoPaterno:apellidoPaterno, apellidoMaterno: apellidoMaterno, fecha: fechaFormateada})
      alertValues = {title: 'Añadido!', text: nombre+' añadido a la lsiat de asistencia', icon: 'success'};
      messageAlert(alertValues);
    } catch (error) {
      console.log(error);
      alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error', icon: 'error'};
      messageAlert(alertValues);
    }
  }

  const verificarEstatus = async(id_cliente) =>{
    
    try {
      const mensualidad = await axios.post('http://localhost:9000/gimnasio/mensualidades/buscar', {id: id_cliente, fecha: fechaFormateada})
      if(mensualidad.data===null){
        registrarAsistencia(id_cliente);
      }else{
        const idMensualidad = mensualidad.data.id_mensualidad;
        const fechaFin = mensualidad.data.fechaPago;
        optionsAlert({id_cliente, idMensualidad, fechaFin});
      } 
    } catch (error) {
      console.log(error);
    }

  }
  const handleClose = () => {
    setShow(false);
    setSelectedUserId(null);
  };

  const title = "Lista de asistencia";

  const mostrarModalInformacion = (userId) => {
    setSelectedUserId(userId);
    handleShow();
  };

  const selectedUser = clientes.find(cliente => cliente.id_cliente === selectedUserId);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name:'id_cliente',
      label:'ID'
    },
    {
      name: 'nombre',
      label: 'Nombre(s)'
    },
    {
      name: 'apellidoPaterno',
      label: 'Apellido Paterno'
    },
    {
      name: 'apellidoMaterno',
      label: 'Apellido Materno'
    },
    {
      name: 'asistencia',
      label: 'Asistencia',
      options: {
        customBodyRender: (val, tableMeta) => {
          const idCliente = tableMeta.rowData[0];
          return (
            <button className="botonPagado" onClick={()=>{verificarEstatus(idCliente)}}>
              {asistencia}
            </button>
          );
        }
      }
    },
    {
      name: 'Informacion',
      label: 'Información',
      options: {
        customBodyRender:  (val, tableMeta) => {
          return (
            <button className="botonInformacion" onClick={() => 
            mostrarModalInformacion(tableMeta.rowData[0])}>
              Ver
            </button>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: false,
    responsive: "standard",
    sort: false,
    download: true,
    print: true,
    filterType: "dropdown",
    rowsPerPageOptions: [5, 10, 15, 20],
    labelDisplayedRow: "de",
    textLabels: {
      body: {
        noMatch: "No se encontraron resultados!",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Registros por página:",
        displayRows: "de"
      }
    }
  };

  return (
    <>
      <div className="Tabla">
        <MUIDataTable
          title={title}
          data={clientes}
          columns={columns}
          options={options}
        />
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className='modalInformacion'>
          <Modal.Title>Información de Usuario:</Modal.Title>
        </Modal.Header>

        <Modal.Body className='modalInformacion'>
          {selectedUser && (
            <>
              <p>ID: {selectedUser.id_cliente}</p>
              <p>Nombre: {selectedUser.nombre}</p><hr/>
              <p>Apellido Paterno: {selectedUser.apellidoPaterno}</p><hr/>
              <p>Apellido Materno: {selectedUser.apellidoMaterno}</p><hr/>
              <p>Asistencia: {asistencia}</p>
            </>
          )}

        </Modal.Body>

        <Modal.Footer style={{backgroundColor:'rgb(21, 21, 21)'}}>
          <Button variant="success" onClick={handleClose}>
            Pagar
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TablaAsistencias;
