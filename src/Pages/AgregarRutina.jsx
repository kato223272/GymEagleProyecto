import React from 'react';
import '../Css/AgregarRutina.css';
import {Col, Row, InputGroup, Form, Dropdown} from  'react-bootstrap'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import Select from 'react-select';

function AgregarRutina (){
  const [rutinas, setRutinas] = useState([]);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState({ nombre: '', descripcion: '', series: 0, repeticiones: 0 });
  const [body, setBody] = useState({nombre:'', descripcion:'', series: 0, repeticiones: 0});
  const permitido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
  const descripcionValida = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.0-9]+$/;
  let alertValues = {title:'', text:'', icon:''};

  useEffect(()=>{
    const getRutinas = () =>{
      fetch('http://localhost:3001/gimnasio/rutina/buscar')
      .then(res => res.json())
      .then(res => setRutinas(res))
    }
    getRutinas()
  },[])

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
  const handleModificarRutina = async(nombre)=>{
    if(!nombre){
      alertValues = {title: 'Oops!', text: 'Se debe seleccionar una rutina', icon: 'info'};
      messageAlert(alertValues)
    }else if(!body.descripcion || !body.series || !body.repeticiones){
      alertValues = {title: 'Error!', text: 'Se debe llenar descripción, series y repeticiones', icon: 'error'};
      messageAlert(alertValues)
    }else{
      try {
        await axios.put('http://localhost:3001/gimnasio/rutina/modificarutina', {nombre:nombre, descripcion:body.descripcion, series:body.series, repeticiones:body.repeticiones})
        alertValues = {title: 'Modificado!', text: 'Rutina modificada exitosamente', icon: 'success'};
        messageAlert(alertValues)
      } catch (error) {
        console.log(error);
      alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error al modificar la rutina', icon: 'error'};
      messageAlert(alertValues)
      }
    }
  }

  const handleEliminarRutina = async(nombre)=>{
    try{
      await axios.delete('http://localhost:3001/gimnasio/rutina/eliminarutina', { data: { nombre: nombre }})
      alertValues = {title: 'Eliminado!', text: 'Rutina eliminada exitosamente', icon: 'success'};
      messageAlert(alertValues)
    }catch(error){
      console.log(error);
      alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error', icon: 'error'};
      messageAlert(alertValues)
    }
  }

  const handleRegisterRutina = async() =>{
    try {
      const respuesta = await axios.post('http://localhost:3001/gimnasio/rutina/registrar', body)
      console.log(respuesta);
      alertValues = {title: 'Agregado!', text: 'Rutina añadida exitosamente', icon: 'success'};
      messageAlert(alertValues);
      setBody({nombre:'', descripcion:'', series: 0, repeticiones: 0});
    } catch (error) {
      console.log(error);
      alertValues = {title: 'Error!', text: 'Oh, ha ocurrido un error', icon: 'error'};
      messageAlert(alertValues);
    }
  }

  const handleValidateRutina = () =>{
    if (!body.nombre || !body.descripcion || body.series === 0 || body.repeticiones === 0){
      alertValues = {title: 'Error, campos vacíos!', text: 'Todos los campos son obligatorios', icon: 'error'};
      messageAlert(alertValues);
    }else if (!permitido.test(body.nombre)){
      alertValues = {title: 'Error, nombre inválido!', text: 'No se aceptan caracteres especiales, solo acentos', icon: 'error'};
      messageAlert(alertValues);
    }else if (!descripcionValida.test(body.descripcion)){
      alertValues = {title: 'Error, descripción inválida!', text: 'No se aceptan caracteres especiales, solo acentos y numeración', icon: 'error'};
      messageAlert(alertValues);
    }else{
      handleRegisterRutina();
    }
  }
  
  const handleRutinaSeleccionada = (e) => {
    const selectedRutina = rutinas.find((rutina) => rutina.nombre === e.target.value);
    setRutinaSeleccionada(selectedRutina);
  };

  return(
    <>
      <div className='Container'>
      <div className='Ruticolumna1'>
        
        <h3 className='tituRutina'>Alta de Rutina:</h3>
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
            <option value={0} disabled>Repeticiones</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </Col>

        <Col>
          <label className='labRutina'>Repeticiones:</label>
          <select className='inputRutinaSelec' onChange={handleRepeticionesChange} value={body.repeticiones}>
            <option value={0} disabled>Por día</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={12}>12</option>
          </select>
        </Col>
      </Row>
        <button className='btRutina' onClick={handleValidateRutina}>Guardar Rutina</button>
      </div>

      <div className='Ruticolumna2'>
        <h3 className='tituRutina'>Rutinas Registradas: </h3>
                    
        <div style={{display:'flex'}}>
          <FontAwesomeIcon icon={faMagnifyingGlass} 
          style={{ color: '#ffff00', position:'absolute', marginTop:'0.7%', marginLeft:'0.7%'}}/>

          <input
          type="text"
          list="data"
          className='ListaRutinasSelect'
          onChange={handleRutinaSeleccionada}
          />
        </div>

        <datalist id="data" className='datalist'>
          {rutinas.map(rutina => (
            <option key={rutina.id} value={rutina.nombre}>
              {rutina.nombre}
            </option>
          ))}
        </datalist>

        <label className="labRutina">Nombre: {rutinaSeleccionada ? rutinaSeleccionada.nombre : ''}</label>
        <br />
        <label className="labRutina">Descripción de la rutina: {rutinaSeleccionada ? 
        rutinaSeleccionada.descripcion : ''}</label>
        <br />
        <label className="labRutina">Series por día: {rutinaSeleccionada ? rutinaSeleccionada.series : ''}
        </label>
        <br />
        <label className="labRutina">Repeticiones por día: {rutinaSeleccionada ? 
        rutinaSeleccionada.repeticiones : ''}</label><br/>

        <button className='btModificarRutina' onClick={() => handleModificarRutina(rutinaSeleccionada.nombre)}>Modificar</button>
        
        <button onClick={() => handleEliminarRutina(rutinaSeleccionada.nombre)} className='btEliminarRutina'>Eliminar</button>
      </div>
      
      </div>
    </>
  )
}

export default AgregarRutina;






