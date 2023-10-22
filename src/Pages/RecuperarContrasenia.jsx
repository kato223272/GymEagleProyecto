import React, { useState } from 'react';
import {Button, Image, Form, FormGroup } from 'react-bootstrap';
import '../Css/RecuperarContrasenia.css';
import imgGrande from '../Image/LogoGym.png';
import emailjs from '@emailjs/browser';

const RecuperarContrasenia = () => {
  const [User, setUser]=useState("");
  const [Correo, setCorreo]=useState("");

  const handleUserChange =(e)=>{
    setUser(e.target.value);
  }
  const handleCorreoChange=(e)=>{
    setCorreo(e.target.value);
  }

  const frmContact={userEmail:"", contenido:""};
  const [contact,setcontact]=useState(frmContact);

  const handleSubmit = async()=>{
    const usuario = User;
    const correo = Correo;
    
    const contact = {userEmail:correo, contenido:""}
    setcontact({...contact, correo});
    emailjs.send("default_service", "template_wewxu8e",contact, "MIRXkfk6HhFixndWM")
    .then((response) => {
      console.log("SUCCESS", response.status, response.text);
      setcontact(frmContact);
    }, (err) => {
      console.log("ERROR", err); 
      }
    )
  };
  

  return (
    <div className='containerGlobal'>
      <header>
        <nav className='NavbarSesion'>
          <h1>Recuperar contraseña</h1>
        </nav>
      </header>

      <main className='mainSesion'>
        <div className='container'>
          <div className='columna1'>
            <Image className='imgGrande' src={imgGrande}></Image>
            <h1 className='tituloColum1'>Black Eagle Gym</h1>
          </div>
          <div className='columna2'>

            <FormGroup>
              <label className='indicacionRecuperar'>Ingrese usuario:</label>
              <Form.Control 
              className='inputsRecuperar' 
              type="text" 
              placeholder="Usuario"
              value={User}
              onChange={handleUserChange}/>
            </FormGroup>

            <FormGroup>
              <label className='indicacionRecuperar'>Correo electronico:</label>
              <Form.Control 
              className='inputsRecuperar' 
              type="text" 
              placeholder="Ejem: 9605658789" 
              value={Correo}
              onChange={handleCorreoChange}/>
            </FormGroup>

            <Button className='bt-Recuperar' variant='warning' onClick={handleSubmit}>Eviar 
            mensaje</Button>

            <label className='indicacionRecuperar'>Ingrese contraseña nueva:</label>
            <Form.Control className='inputsRecuperar' type="password" placeholder="Contraseña Nueva"/>
            <Button className='bt-Recuperar' variant='warning'>Acceder</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecuperarContrasenia
