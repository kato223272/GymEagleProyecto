import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import "../ListaAsistencias/ListaAsistencias.css";
import axios from 'axios';

const TablaAsistencias = () => {
  const [show, setShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [body, setBody] = useState({id:'', fecha:''});
  const [asistencia, setAsistencia] = useState("falta");

  const fechaActual = new Date();
  
  const obtenerFechaFormateada = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
  const fechaFormateada = obtenerFechaFormateada(fechaActual);
  
  console.log(fechaFormateada);

  useEffect(()=>{
    const getClientes = () =>{
      fetch('http://localhost:9000/gimnasio/clientes/obtenertodo')
      .then(res => res.json())
      .then(res => setClientes(res))
    }
    getClientes();
  },[])
  

  const verificarEstatus = async() =>{
    try {
      const respuesta = await axios.post('http://localhost:9000/gimnasio/mensualidades/buscar', body)
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

  const selectedUser = clientes.find(client => client.id_cliente === selectedUserId);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name:'id',
      label:'id'
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
          return (
            <button className="botonPagado" onClick={() => mostrarModalInformacion(tableMeta.rowData[0])}>
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

        <Modal.Body>
          {selectedUser && (
            <>
              <p>id:{selectedUser.id}</p>
              <p>Nombre: {selectedUser.Nombre}</p>
              <p>Apellido Paterno: {selectedUser.PrimerApellido}</p>
              <p>Apellido Materno: {selectedUser.SegundoApellido}</p>
              <p>Asistencia: {selectedUser.asistencia}</p>

              <p>ID: {selectedUser.id_cliente}</p>
              <p>Nombre: {selectedUser.nombre}</p>
              <p>Apellido Paterno: {selectedUser.apellidoPaterno}</p>
              <p>Apellido Materno: {selectedUser.apellidoMaterno}</p>
              <p>Asistencia:{asistencia}</p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Aceptar

            Cerar
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TablaAsistencias;
