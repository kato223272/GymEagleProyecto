import React, { useState } from 'react';
import "../Css/EditarUsuario.css";
import { FaSearch } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import imgEliminar from "../Image/imgEditar/eliminarOp2.png";
import imgEliminarHover from "../Image/imgEditar/eliminarOp2Hover.png";
import imgAgregar from "../Image/imgEditar/agregarOp1.png";
import imgAgregarHover from "../Image/imgEditar/agregarOp1Hover.png";

const EditarUsuario = () => {
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString();

  const [imagenHoverEliminar, setImagenHoverEliminar] = useState(imgEliminarHover);
  const [imagenHoverAgregar, setImagenHoverAgregar] = useState(imgAgregarHover);
 

  const handleImagenHoverEliminar = (nuevaImagen) => {
    setImagenHoverEliminar(nuevaImagen);
  };
  const handleImagenHoverAgregar = (nuevaImagen) => {
    setImagenHoverAgregar(nuevaImagen);
  };

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
        
          <div className="EditarFila1">
            <div className="BotonEliminar"
            
            >
              <button
              onMouseEnter={() => handleImagenHoverEliminar(imgEliminarHover)}
              onMouseLeave={() => handleImagenHoverEliminar(imgEliminar)}
              >
              <img
            src={imagenHoverEliminar}
            alt=""          
            />
              </button>
            </div>
            <h4>Editar Datos</h4>
            <div className="BotonAgregar"

            > 
              <button            
              onMouseEnter={() => handleImagenHoverAgregar(imgAgregarHover)}
              onMouseLeave={() => handleImagenHoverAgregar(imgAgregar)}>
              <img
            src={imagenHoverAgregar}
            alt=""          
            />
              </button>
            </div>
          </div>
          
          <div className="EditarFila2">
            <div className="row datos">
              <label for="nombre">Nombre:</label>
              <Form.Control
                type="text"
                id="nombre"
                placeholder="Escribe nombre"
                className="escribirDatos"
              />
            </div>
            <div className="row datos">
              <label for="ApellidoPaterno">Apellido Paterno:</label>
              <Form.Control
                type="text"
                placeholder="Escribe apellido paterno"
                className="escribirDatos"
              />
            </div>
            <div className="row datos">
              <label for="nombre">Apellido Materno:</label>
              <Form.Control
                type="text"
                placeholder="Escribe apellido materno"
                className="escribirDatos"
              />
            </div>
            <div className="row datos">
              <label for="nombre">Número telefonico:</label>
              <Form.Control
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
            <Form.Control type="text" value="NombreText" disabled />
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
