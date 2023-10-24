import React from 'react'
import MUIDataTable from "mui-datatables";
import "../ListaAsistencias/ListaAsistencias.css"

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
      name: 'phone',
      label: 'Pagos'
    },
    {
      name: 'tipo',
      label: 'Asistencia',

      options:{
        customBodyRender: (val) => {
          return <>
          <button className="botonPagado">
            No pagado
          </button>
          </>
          }
      }
    }
  ]
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
  <div className="Tabla">
    <MUIDataTable className = 'dtable'
        title={title}
        columns={columns}
        options={options}
      />
   </div>
   </>
  )
}

export default TablaAsistencias
