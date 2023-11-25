import '../Css/AgregarRutina.css';
import {Col, Row, InputGroup, Form, Dropdown} from  'react-bootstrap'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import Select from 'react-select';

const AgregarRutina = ()=>{

  const [rutinas, setRutinas] = useState([]);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState({ nombre: '', descripcion: '', series: 0, repeticiones: 0 });
  const [body, setBody] = useState({nombre:'', descripcion:'', series: 0, repeticiones: 0});
  const permitido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
  const descripcionValida = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.0-9]+$/;
  const [ShowModal, setShowModal] = useState(false);
  let alertValues = {title:'', text:'', icon:''};

  const [rutinaModificada, setRutinaModificada] = useState({
    nombre: '',
    descripcion: '',
    series: 0,
    repeticiones: 0,
  });
  
  const handleShow = () => setShowModal(true);

  const handleCloseShowModal=()=>{
    setShowModal(false);
  }


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
  const handleModificarRutina = async()=>{
    if(!rutinaModificada.nombre){
      alertValues = {title: 'Oops!', text: 'Se debe seleccionar una rutina', icon: 'info'};
      messageAlert(alertValues)
    }else if(!rutinaModificada.descripcion || !rutinaModificada.series || !rutinaModificada.repeticiones){
      alertValues = {title: 'Error!', text: 'Se debe llenar descripción, series y repeticiones', icon: 'error'};
      messageAlert(alertValues)
    }else{
      try {
        await axios.put('http://localhost:3001/gimnasio/rutina/modificarutina', {nombre:rutinaModificada.nombre, descripcion:rutinaModificada.descripcion, series:rutinaModificada.series, repeticiones:rutinaModificada.repeticiones})
        alertValues = {title: 'Modificado!', text: 'Rutina modificada exitosamente', icon: 'success'};
        messageAlert(alertValues)
        handleCloseShowModal();
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
    setRutinaModificada(selectedRutina || { nombre: '', descripcion: '', series: 0, repeticiones: 0 });
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

        
         <button className='btModificarRutina' onClick={() => handleShow(rutinaSeleccionada.nombre)}>Modificar</button>
        <button onClick={() => handleEliminarRutina(rutinaSeleccionada.nombre)} className='btEliminarRutina'>Eliminar</button>
      </div>
      
      </div>


      <Modal show={ShowModal} onHide={handleCloseShowModal} aria-labelledby="contained-modal-title-vcenter">
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      Modificar Rutina
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Container>
      <Form>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre de rutina" value={rutinaModificada.nombre} onChange={(e) => setRutinaModificada({ ...rutinaModificada, nombre: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Descripción" value={rutinaModificada.descripcion} onChange={(e) => setRutinaModificada({ ...rutinaModificada, descripcion: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formSeries">
          <Form.Label>Series por día</Form.Label>
          <Form.Control as="select" value={rutinaModificada.series} onChange={(e) => setRutinaModificada({ ...rutinaModificada, series: parseInt(e.target.value, 10) })}>
            <option value={0} disabled>Selecciona</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formRepeticiones">
          <Form.Label>Repeticiones por día</Form.Label>
          <Form.Control as="select" value={rutinaModificada.repeticiones} onChange={(e) => setRutinaModificada({ ...rutinaModificada, repeticiones: parseInt(e.target.value, 10) })}>
            <option value={0} disabled>Selecciona</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={12}>12</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Container>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="danger" onClick={handleCloseShowModal}>
      Cancelar
    </Button>
    <Button variant="warning" onClick={() => handleModificarRutina()}>
      Modificar
    </Button>
  </Modal.Footer>
</Modal>

    </>
  )
}

export default AgregarRutina;






