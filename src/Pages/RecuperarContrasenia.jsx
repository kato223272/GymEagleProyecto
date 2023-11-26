import React, { useState } from 'react';
import {Button, Image, Form, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import '../Css/RecuperarContrasenia.css';
import imgGrande from '../Image/LogoGym.png';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../Image/favicongym.png';

const RecuperarContrasenia = () => {
  const [body, setBody] = useState({usuario: '', correo: '', password:''});
  const navigate = useNavigate();
  let alertValues = {title:'', text:'', icon:''};

  const messageAlert = (alertValues) => {
    Swal.fire({
      title: alertValues.title,
      text: alertValues.text,
      icon: alertValues.icon,
      confirmButtonText: 'Aceptar',
      timer: 3000
    })
  }

  const handleChange = ({target}) =>{
    const {name, value} = target;
    setBody({
      ...body,
      [name]:value
    });
  }

  const frmContact={userEmail:"", contenido:""};

  const [contact,setcontact] = useState(frmContact);

  const createPassword = () =>{
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const caracteresEspeciales = '@$#!%*?&';

    const letra = letras[Math.floor(Math.random() * letras.length)];
    const numero = numeros[Math.floor(Math.random() * numeros.length)];
    const caracterEspecial = caracteresEspeciales[Math.floor(Math.random() * caracteresEspeciales.length)];

    const caracteres = letras + numeros + caracteresEspeciales;
    const longitudContraseña = 10; 

    let contraseña = letra + numero + caracterEspecial;

    for (let i = 3; i < longitudContraseña; i++) {
        const caracterAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
        contraseña += caracterAleatorio;
    }

    contraseña = contraseña.split('').sort(() => Math.random() - 0.5).join('');

    return contraseña;
  }

  const handleNewPassword = async() =>{
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if(!body.usuario || !body.correo){
        alertValues = {title: 'Oops!', text: 'Usuario y correo son obligatorios', icon: 'warning'};
        messageAlert(alertValues);
      }else if(!correoValido.test(body.correo)){
        alertValues = {title: 'Oops!', text: 'Ingrese un correo válido de Email', icon: 'warning'};
        messageAlert(alertValues);
      }else{
        const password = createPassword();
        console.log(body.usuario, password);
        await axios.put("http://localhost:9000/gimnasio/administradores/actualizarpassword", {usuario: body.usuario, password: password});
        alertValues = {title: 'Actualizado!', text: 'Contraseña actualizada correctamente', icon: 'success'};
        messageAlert(alertValues);
        handleSendEmail(password);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alertValues = {title: 'No encotrado!', text: 'No se ha encontrado al usuario', icon: 'error'};
        messageAlert(alertValues);
      } else {
          console.error(error);
      }
    }
  }

  const handleSendEmail = async(password)=>{
    const usuario = body.usuario;
    const correo = body.correo;

    const contact = {userEmail:correo, contenido:"Hola " +usuario+" su nueva contraseña es: "+password}
    setcontact({...contact, correo});
    emailjs.send("default_service", "template_wewxu8e",contact, "MIRXkfk6HhFixndWM")
    .then((response) => {
      console.log("SUCCESS", response.status, response.text);
      setcontact(frmContact);
      alertValues = {title: 'Enviado!', text: 'Se ha enviado su nueva contraseña al correo proporcionado', icon: 'success'};
      messageAlert(alertValues);
    }, (err) => {
      console.log("ERROR", err);
      alertValues = {title: 'Error!', text: 'Ha ocurrido un error al enviar el correo', icon: 'error'};
      messageAlert(alertValues);
      }
    )
  }
  const toAccess = async() =>{
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\d]+$/;
    const pswPermitida = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
      if(!body.usuario || !body.password){
        alertValues = {title: 'Oops!', text: 'Los campos usuario y contraseña son obligatorios', icon: 'error'};
        messageAlert(alertValues);
      }else if (!permitido.test(body.usuario)) {
        alertValues = {title: 'Oops!', text: 'El usuario no debe tener espacios', icon: 'error'};
        messageAlert(alertValues);
      }else if (!pswPermitida.test(body.password)) {
        alertValues = {title: 'Oops!', text: 'La contraseña debe tener al menos 8 caracteres, al menos un número y un carácter especial', icon: 'error'};
        messageAlert(alertValues);
      }else{
        const admin = await axios.post('http://localhost:9000/gimnasio/administradores/loginadmin', {usuario:body.usuario, password:body.password});
        if(admin.status !== 200){
          alertValues = {title: 'No encontrado!', text: 'El usuario o la contraseña son incorrectos' , icon: 'warning'};
          messageAlert(alertValues);      
        }else{
          alertValues = {title: 'Bienvenido!', text: 'Bienvenido '+body.usuario , icon: 'success'};
          messageAlert(alertValues);
          
          navigate('/Menu')
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.error;
      alertValues = {title: 'Error!', text: 'Error: '+errorMessage , icon: 'error'};
      messageAlert(alertValues);
    }
  }
  
  return (
    <div className='containerGlobal'>
      <header>
        <nav className='RecuNavbarSesion'>
          <h1 className='RecutituloSesion'>BLACK EAGLE GYM</h1>
        </nav>
      </header>

     
      <main className='RecumainSesion'>
      <h1 className='tituloRecuperar'>Recuperar contraseña</h1>
        <div className='container'>
          <div className='columna1'>
            <Image className='imgGrande' src={imgGrande}></Image>
          </div>
          <div className='columna2'>
            
            <label className='indicacionRecuperar'>Ingrese usuario:</label>
            <input
              className='inputsRecuperar' 
              type="text" 
              placeholder="Usuario"
              value={body.usuario}
              name='usuario'
              onChange={handleChange}
            />
            
            <label className='indicacionRecuperar'>Correo electronico:</label>
            <input
              className='inputsRecuperar' 
              type="email" 
              placeholder="Ejem: correo@gmail.com" 
              value={body.correo}
              name='correo'
              onChange={handleChange}            
            />

            <Button className='bt-Recuperar' variant='warning' onClick={handleNewPassword}>Enviar 
            mensaje</Button>

            <label className='indicacionRecuperar'>Ingrese contraseña nueva:</label>
            <input
              className='inputsRecuperar' 
              type="password" 
              placeholder="Contraseña Nueva"
              value={body.password}
              name='password'
              onChange={handleChange}
            />
            <Button className='bt-Recuperar' variant='warning' onClick={toAccess}>Acceder</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecuperarContrasenia
