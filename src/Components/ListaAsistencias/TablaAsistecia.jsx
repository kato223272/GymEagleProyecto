import React, { useState, useEffect } from 'react';
import { addMonths, addDays, format }from 'date-fns';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { Form } from  'react-bootstrap'
import MUIDataTable from "mui-datatables";
import "../ListaAsistencias/ListaAsistencias.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const TablaAsistencias = () => {
  const [show, setShow] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [asistencia, setAsistencia] = useState("Asistencia");
  const [asistenciaAñadida, setAsistenciaAñadida] = useState({});
  const [body, setbody] = useState({
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    celular:''
  })
  const permitido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
  const celularPermitido = /^[1-9]\d{9}$/;
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
    const getClientes = () => {
      fetch('http://localhost:9000/gimnasio/clientes/obtenertodo')
        .then(res => res.json())
        .then(res => {
          // // Inicializa el estado de asistencia para cada cliente
          // const asistenciaInicial = {};
          // res.forEach(cliente => {
          //   asistenciaInicial[cliente.id_cliente] = false;
          // });
          // setAsistenciaAñadida(asistenciaInicial);
  
          // // Actualiza el estado de los clientes
          setClientes(res);
        })
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
      const asistio = await axios.post('http://localhost:3001/gimnasio/asistencia/buscarasistencia', {id_cliente: id_cliente, fecha: fechaFormateada});
      console.log(asistio.data.cliente);
      if (asistio.data.cliente === null){
        await axios.post('http://localhost:3001/gimnasio/asistencia/registrarplanmes', { id_cliente:id_cliente, nombre: nombre, apellidoPaterno:apellidoPaterno, apellidoMaterno: apellidoMaterno, fecha: fechaFormateada})
        alertValues = {title: 'Añadido!', text: nombre+' añadido a la lista de asistencia', icon: 'success'};
        messageAlert(alertValues);
      }else{
        alertValues = {title: 'Oops!', text: nombre+' ya se marcó su asistencia', icon: 'warning'};
        messageAlert(alertValues);
      }
    } catch (error) {
      console.log(error);
      alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error, no se ha añadido a la lista de asistencia', icon: 'error'};
      messageAlert(alertValues);
    }
  }

  const verificarEstatus = async(id_cliente) =>{
    try {
      const mensualidad = await axios.post('http://localhost:9000/gimnasio/mensualidades/buscar',{ id: id_cliente, fecha: fechaFormateada });
      if (mensualidad.data === null) {
        registrarAsistencia(id_cliente);

      } else {
        const idMensualidad = mensualidad.data.id_mensualidad;
        const fechaFin = mensualidad.data.fechaPago;
        optionsAlert({ id_cliente, idMensualidad, fechaFin });
      }
    } catch (error) {
      console.log(error);
    }

  }

  const handleClose = () => {
    setShow(false);
    setSelectedUserId(null);
  };

  const handleCloseShow2=()=>{
    setShowModal(false);
    setSelectedUserId(null);
  }

  const title = "Lista de asistencia";

  const mostrarModalInformacion = (userId) => {
    setSelectedUserId(userId);
    handleShow();
  };

  // const mostrarModalEditar = (userId)=>{
  //   setSelectedUserId(userId);
  // }

  // FUNCION PARA EDITAR A UN CLIENTE
  const modalEditarUsuario = (userId) => {
    setSelectedUserId(userId);
    handleShowEditar();
  };

  const handleUpdate = async() =>{
    const id = selectedUser.id_cliente;
    if (!body.nombre || !body.apellidoPaterno || !body.apellidoMaterno || !body.celular) {
      alertValues = {title: 'Error!', text: 'Faltan campos por llenar', icon: 'error'};
      messageAlert(alertValues);
    } else if (!permitido.test(body.nombre) || !permitido.test(body.apellidoPaterno) || !permitido.test(body.apellidoMaterno)) {
      alertValues = {title: 'Error!', text: 'No se aceptan caracteres especiales, solo acentos', icon: 'error'};
      messageAlert(alertValues);
    } else if (!celularPermitido.test(body.celular)) {
      alertValues = {title: 'Error!', text: 'El número de celular debe tener 10 números y no puede empezar en 0', icon: 'error'};
      messageAlert(alertValues);
    } else {
      try {
        const info = await axios.put('http://localhost:9000/gimnasio/clientes/modificar', {id_cliente:id, nombre:body.nombre, apellidoPaterno:body.apellidoPaterno, apellidoMaterno:body.apellidoMaterno, celular:body.celular})
        alertValues = {title: 'Modificado!', text:'Datos modificados exitosamente', icon: 'success'};
        messageAlert(alertValues);
        handleCloseShow2();
      } catch (error) {
        console.log(error)
        alertValues = {title: 'Oops!', text:'Ha ocurrido un error al modificar los datos', icon: 'error'};
        messageAlert(alertValues);       
      }
    }
  }
 
  const selectedUser = clientes.find(cliente => cliente.id_cliente === selectedUserId);
  const handleShow = () => setShow(true);
  const handleShowEditar=()=>setShowModal(true);

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
            <button
              className={`botonPagado ${asistenciaAñadida[idCliente] ? 'asistenciaAñadida' : ''}`}
              id="btAsistencia"
              onClick={() => {
                verificarEstatus(idCliente);
              }}
            >
              Asistencia
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
     },
    {
      name:'Editar',
      label:'Editar',
      options: {
        customBodyRender:  (val, tableMeta) => {
          const idCliente = tableMeta.rowData[0];
          return (
            <button className="botonEditarUsuario" onClick={()=>{modalEditarUsuario(idCliente)}}>
              <FontAwesomeIcon icon={faPen} size="xl" style={{color: "#000000",}} />
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

      {/* ESTE MODAL ES PARA VER LA INFORMACION GENERAL DEL USUARIO */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className='modalInformacion'>
          <Modal.Title>Información de Usuario:</Modal.Title>
        </Modal.Header>

        <Modal.Body className='modalInformacion'>
          {selectedUser && (
            <>
              <p>ID: {selectedUser.id_cliente}</p>
              <p>Nombre: {selectedUser.nombre}</p><hr/>
              <p>Apellido paterno: {selectedUser.apellidoPaterno}</p><hr/>
              <p>Apellido materno: {selectedUser.apellidoMaterno}</p><hr/>
              <p>Número celular: {selectedUser.numeroCelular}</p><hr/>
              <p>Fecha Inscripción: {selectedUser.fechaInscripcion}</p><hr/>
            </>
          )}

        </Modal.Body>

        <Modal.Footer style={{backgroundColor:'rgb(21, 21, 21)'}}>
          <Button variant="success" onClick={handleClose}>
            Cerrar
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>


      {/* ESTE MODAL ES PARA EDITAR LA INFORMACION DEL USUARIO */}
      <Modal show={ShowModal} onHide={handleCloseShow2} aria-labelledby="contained-modal-title-vcenter">
  <Modal.Header closeButton className='modalRutinaModificar'>
    <Modal.Title id="contained-modal-title-vcenter">
      Modificar datos dle cliente
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className='modalRutinaModificar'>
  {/* {selectedUser && ( */}
    <Container style={{backgroundColor:'rgb(21, 21, 21)'}}>
      <Form >
        <Form.Group controlId="formNombre" >
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" value={body.nombre} onChange={(e) => setbody({ ...body, nombre: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formDescripcion">
          <Form.Label>Apellido paterno:</Form.Label>
          <Form.Control type="text" placeholder="Apellido paterno" value={body.apellidoPaterno} onChange={(e) => setbody({ ...body, apellidoPaterno: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formSeries">
          <Form.Label>Apellido materno:</Form.Label>
          <Form.Control type="text" placeholder="Apellido materno" value={body.apellidoMaterno} onChange={(e) => setbody({ ...body, apellidoMaterno: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formRepeticiones">
          <Form.Label>Número de celular:</Form.Label>
          <Form.Control type="text" placeholder="Número de celular" value={body.celular} onChange={(e) => setbody({ ...body, celular: e.target.value })} />
        </Form.Group>
      </Form>
    </Container>
  {/* )} */}
  </Modal.Body >
  <Modal.Footer style={{backgroundColor:'rgb(21, 21, 21)'}}>
    <Button variant="danger" onClick={handleCloseShow2}>
      Cancelar
    </Button>
    <Button variant="success" onClick={handleUpdate}>
      Modificar
    </Button>
  </Modal.Footer>
</Modal>
    </>
  );
};

export default TablaAsistencias;
