import React from 'react';
import './inicio.css';
import {Button, Image,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from './Image/favicongym.png';
import icoSesion from './Image/imgInicio/icon-sesion.png';


const Inicio = ({ setIsAuthenticated, isAuthenticated }) => {
  const [body, setBody] = useState({usuario: '', password: ''});
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

  const toAccess = async() =>{
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\d]+$/;
    const pswPermitida = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
      if(!body.usuario || !body.password){
        alertValues = {title: 'Oops!', text: 'Los campos son obligatorios', icon: 'error'};
        messageAlert(alertValues);
      }else if (!permitido.test(body.usuario)) {
        alertValues = {title: 'Oops!', text: 'El usuario no debe tener espacios', icon: 'error'};
        messageAlert(alertValues);
      }else if (!pswPermitida.test(body.password)) {
        alertValues = {title: 'Oops!', text: 'La contraseña debe tener al menos 8 caracteres, al menos un número y un carácter especial', icon: 'error'};
        messageAlert(alertValues);
      }else{
        const admin = await axios.post('http://localhost:9000/gimnasio/administradores/loginadmin', body);
        if(admin.status !== 200){
          alertValues = {title: 'No encontrado!', text: 'El usuario o la contraseña son incorrectos' , icon: 'warning'};
          messageAlert(alertValues);      
        }else{
          alertValues = {title: 'Bienvenido!', text: 'Bienvenido '+body.usuario , icon: 'success'};
          messageAlert(alertValues);
          setIsAuthenticated(true);
          
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
  useEffect(() => {
    if (isAuthenticated) {
      return <Navigate to="/menu" />;
    }
  }, [isAuthenticated]);
  return (
    <div className='containerGlobal'>
      <header>
        <nav className='NavbarSesion'>
        <div className='containerLogo'>
            <Image className='img-logo'  src={logo}></Image>
          </div>
          <h1 className='tituloSesion'>BLACK EAGLE GYM</h1>
        </nav>
      </header>

      <main className='mainSesion'>
        <div className='containerSesion'>
          <div className='containerSesion-Logo'>
            <Image className='logo-pesas' src={icoSesion}></Image>
          </div>
          <h5 style={{textAlign:'center'}}>Bienvenido Administrador</h5>

          <label className='lb-text'>Ingrese Usuario:</label>
          <Form.Control className='inputs' type="text" placeholder="Usuario"
          value={body.usuario} name='usuario' onChange={handleChange}/>
          <label className='lb-text'>Ingrese Contraseña:</label>
          <Form.Control className='inputs' type="password" placeholder="Contraseña" 
          value={body.password} name='password' onChange={handleChange}/>

          <Button variant="warning" className='bt-Acceder' onClick={toAccess}>Acceder</Button>

          <a href='/recuperarcontrasenia' className='LinkA'>¿Olvidaste tu contraseña?</a>
        </div>

        <span className='barra'></span>
        <span className='disco1Left'></span>
        <span className='disco2Left'></span>
        <span className='disco3Left'></span>

        <span className='disco1Right'></span>
        <span className='disco2Right'></span>
        <span className='disco3Right'></span>

      </main>

    </div>
  )
}

export default Inicio
