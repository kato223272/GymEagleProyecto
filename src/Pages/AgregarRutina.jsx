import React from 'react';
import '../Css/AgregarRutina.css';
import {Col, Row, InputGroup, Form} from  'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Swal from 'sweetalert2';

function AgregarRutina (){
  const [body, setBody] = useState({nombre:'', descripcion:'', series: 0, repeticiones: 0});
  const permitido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
  const descripcionValida = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.0-9]+$/;
  let alertValues = {title:'', text:'', icon:''};

  const messageAlert = (alertValues) => {
    Swal.fire({
      title: alertValues.title,
      text: alertValues.text,
      icon: alertValues.icon,
      confirmButtonText: 'Aceptar'
    });
  };

  const handleChange = ({target}) =>{
    const {name, value} = target;
    setBody({
      ...body,
      [name]:value
    });
  }

  const handleSeriesChange = (e) => {
    const seriesAux = parseInt(e.target.value, 10);
    setBody({
      ...body,
      series: seriesAux
    });
  }

  const handleRepeticionesChange = (e) => {
    const repeticionesAux = parseInt(e.target.value, 10);
    setBody({
      ...body,
      repeticiones: repeticionesAux
    });
  }

  const handleRegisterRutina = () =>{
    if (!body.nombre || !body.descripcion || body.series === 0 || body.repeticiones === 0){
      alertValues = {title: 'Error!', text: 'Todos los campos son obligatorios', icon: 'error'};
      messageAlert(alertValues);
    }else if (!permitido.test(body.nombre)){
      alertValues = {title: 'Error, nombre inválido!', text: 'No se aceptan caracteres especiales, solo acentos', icon: 'error'};
      messageAlert(alertValues);
    }else if (!descripcionValida.test(body.descripcion)){
      alertValues = {title: 'Error, descripción inválida!', text: 'No se aceptan caracteres especiales, solo acentos y numeración', icon: 'error'};
      messageAlert(alertValues);
    }else{
      alertValues = {title: 'Aceptado', text: 'Datos aceptados', icon: 'success'};
      messageAlert(alertValues);
    }
  }
  return(
    <>
      <div className='Container'>
      <div className='Ruticolumna1'>
        
        <h3 className='tituRutina'>Información de Rutina</h3>
        <label className='labRutina'>Nombre:</label>
        <input type="text" placeholder="Nombre de rutina" className='inputRutina'
        value={body.nombre} name='nombre' onChange={handleChange}/>
        
        <label className='labRutina'>Descripción de la rutina:</label>
        <textarea rows={2} placeholder="Descripción" className='inputRutinaDescrip'
        style={{paddingTop:'1%'}} value={body.descripcion} name='descripcion' onChange={handleChange}></textarea>

      <Row>
        <Col>
          <label className='labRutina'>Series por día:</label>
          <select className='inputRutinaSelec' onChange={handleSeriesChange} value={body.series}>
            <option value={0} disabled>Resultados visto en:</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </Col>

        <Col>
          <label className='labRutina'>Repeticiones:</label>
          <select className='inputRutinaSelec' onChange={handleRepeticionesChange} value={body.repeticiones}>
            <option value={0} disabled>Repeticiones por día:</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={12}>12</option>
          </select>
        </Col>
      </Row>
        <button className='btRutina' onClick={handleRegisterRutina}>Guardar Registro</button>
      </div>

      <div className='Ruticolumna2'>
        <h3 className='tituRutina'>Rutinas Registradas: </h3>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#000000' }} />
          </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar"
              className=" mr-sm-2"
            />
        </InputGroup>
        <select className='ListaRutinasSelect'>
            <option value='1'>Rutina</option>
        </select>
      </div>
      
      </div>
    </>
  )
}

export default AgregarRutina;

