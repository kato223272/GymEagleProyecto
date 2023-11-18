import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import "../ListaAsistencias/ListaAsistencias.css";

const TablaAsistencias = () => {
  const [show, setShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedUserId(null);
  };

  const title = "Lista de asistencia";

  const usuarios = [
    {
      id: 1,
      Nombre: "Paola",
      PrimerApellido: "Mayorga",
      SegundoApellido: "Aguirre",
      pagos: "Pagado",
      asistencia: "Asistio"
    },
    {
      id: 2,
      Nombre: "Luisin",
      PrimerApellido: "Alberto",
      SegundoApellido: "Gutierrez",
      pagos: "Pagado",
      asistencia: "Asistio"
    },
    {
      id: 3,
      Nombre: "Joselin",
      PrimerApellido: "Jesus",
      SegundoApellido: "Kato",
      pagos: "Pagado",
      asistencia: "Asistio"
    }
  ];

  const mostrarModalInformacion = (userId) => {
    setSelectedUserId(userId);
    handleShow();
  };

  const selectedUser = usuarios.find(user => user.id === selectedUserId);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name:'id',
      label:'id'
    },
    {
      name: 'Nombre',
      label: 'Nombre(s)'
    },
    {
      name: 'PrimerApellido',
      label: 'Apellido Paterno'
    },
    {
      name: 'SegundoApellido',
      label: 'Apellido Materno'
    },
    {
      name: 'asistencia',
      label: 'Asistencia',
      options: {
        customBodyRender: (val, tableMeta) => {
          return (
            <button className="botonPagado" onClick={() => mostrarModalInformacion(tableMeta.rowData[0])}>
              Falto
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
          data={usuarios}
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
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
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
