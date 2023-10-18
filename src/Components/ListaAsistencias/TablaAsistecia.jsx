import React from 'react'
import MUIDataTable from "mui-datatables";

const TablaAsistencias = () => {
  const title = "Lista de asistencia"

  const columns = [
    {
      name: 'username',
      label: 'No.Lista',
    },
    {
      name: 'rfc',
      label: 'Nombre(s)'
    },
    
    {
      name: 'name',
      label: 'Apellido Materno'
    },
    {
      name: 'lastname',
      label: 'Apellido Paterno'
    },
    {
      name: 'email',
      label: 'Correo',
      options:{
        customBodyRender: (val) => {
          return val === null ? '---------------------' : val;
          }
      }
    },
    {
      name: 'phone',
      label: 'Telefono'
    },
    {
      name: 'tipo',
      label: 'Tipo'
    }
  ]
  const options = {
    selectableRows: false,
    responsive: "standard",
    sort: false,
    download: false,
    print: false,
    filterType: "dropdown",
    rowsPerPageOptions: [5, 10, 15, 20],
    labelDisplayedRow: "de",
    textLabels: {
      body: {
        noMatch: "No se encontraron resultados!"
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
  
    <MUIDataTable className = 'dtable'
        title={title}
        // data={datos}
        columns={columns}
        options={options}
      />
   
   </>
  )
}

export default TablaAsistencias
