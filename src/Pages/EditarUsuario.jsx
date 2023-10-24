import React from "react";
import "../Css/EditarUsuario.css";
import { FaSearch } from "react-icons/fa";

const EditarUsuario = () => {
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString();
  return (
    <>
      <div className="FilaSuperior" style={{ display: "flex" }}>
        <div className="fecha">
          <p>Fecha: {fechaFormateada}</p>
        </div>
        <div className="busqueda-contenedor">
          <input type="text" placeholder="Buscar" className="busqueda" />
          <button className="busqueda-boton">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="contenerdorEditar" style={{ display: "flex" }}>
        <div className="col1">
        <h4>Editar Datos</h4>
          <div className="EditarFila1" style={{ display: "flex" }}>
            <div className="BotonEliminar">
              <button>eliminar</button>
            </div>
            <div className="BotonAgregar">
              
              <button>agregar</button>
            </div>
          </div>
          <div className="EditarFila2">
            <div className="row datos">
              <label for="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                placeholder="Escribe nombre"
                className="escribirDatos"
              />
            </div>
            <div className="row datos">
              <label for="ApellidoPaterno">Apellido Paterno:</label>
              <input
                type="text"
                placeholder="Escribe apellido paterno"
                className="escribirDatos"
              />
            </div>
            <div className="row datos">
              <label for="nombre">Apellido Materno:</label>
              <input
                type="text"
                placeholder="Escribe apellido materno"
                className="escribirDatos"
              />
            </div>
            <div className="row datos">
              <label for="nombre">Número telefonico:</label>
              <input
                type="text"
                placeholder="Escribe num. telefonico"
                className="escribirDatos"
              />
            </div>
            <div className="BotonGuardar">
              <button>Guardar</button>
            </div>
          </div>
        </div>

        <div className="col2">
          <h4 >Renovación de pagos</h4>
          <div className="NombreCol2">
            <label for="nombre">Nombre:</label>
            <input type="text" value="NombreText" disabled />
          </div>
          <div className="RenovarPago" style={{marginTop:'2%'}}>
          <label for="nombre">Renovar pago:</label>
          <button> Renovar</button>
          </div>
          <div className="RenovarPago" style={{marginTop:'2%'}}>
          <label for="nombre">Renovar pago 1 día:</label>
          <button> Renovar</button>
          </div>
          <div className="BotonGuardar2"  style={{marginTop:'5%'}}>
              <button>Guardar</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;
