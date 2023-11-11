import React from 'react';
import '../Css/AgregarRutina.css';
import {Col, Row, InputGroup, Form} from  'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function AgregarRutina (){
  return(
    <>
      <div className='Container'>
      <div className='Ruticolumna1'>
        
        <h3 className='tituRutina'>Información de Rutina</h3>
        <label className='labRutina'>Nombre:</label>
        <input type="text" placeholder="Nombre de rutina" className='inputRutina'/>
        
        <label className='labRutina'>Descripción de la rutina:</label>
        <textarea rows={2} placeholder="Descripción" className='inputRutinaDescrip'
        style={{paddingTop:'1%'}}></textarea>

      <Row>
        <Col>
          <label className='labRutina'>Series por día:</label>
          <select className='inputRutinaSelec'>
            <option disabled='false'>Resultados visto en:</option>
              <option value='1'>3</option>
              <option value='2'>4</option>
              <option value='3'>5</option>
          </select>
        </Col>

        <Col>
          <label className='labRutina'>Repeticiones:</label>
          <select className='inputRutinaSelec'>
            <option disabled='false'>Repeticiones por día:</option>
              <option value='1'>6</option>
              <option value='2'>8</option>
              <option value='3'>10</option>
              <option value='4'>12</option>
          </select>
        </Col>
      </Row>
        <button className='btRutina'>Guardar Registro</button>
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

export default AgregarRutina

