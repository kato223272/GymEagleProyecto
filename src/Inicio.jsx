import React from 'react';
import './inicio.css';
import {Button, Image,Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import logo from './Image/favicongym.png';
import icoSesion from './Image/imgInicio/icon-sesion.png';
// import icoSesion from './Image/LogoGym.png'

const Inicio = () => {
  const [body, setBody] = useState({usuario: '', contraseña: ''});
  const navigate = useNavigate();

  const handleChange = ({target}) =>{
    const {name, value} = target;
    setBody({
      ...body,
      [name]:value
    });
  }

  const toAccess = async() =>{
    try {
      await axios.post('http://localhost:9000/api/login', body);
      alert('Bienvenido '+body.usuario)
      navigate('/Menu')
    } catch (error) {
      console.log(error);
      alert('Datos erroneos')
    }
  }
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
          <Form.Control className='inputs' type="text" placeholder="Usuario" />
          <label className='lb-text'>Ingrese Contraseña:</label>
          <Form.Control className='inputs' type="password" placeholder="Contraseña" 
          value={body.contraseña} name='contraseña' onChange={handleChange}/>

          {/* <a href='/Menu'> */}
          <Button variant="warning" className='bt-Acceder' onClick={toAccess}>Acceder</Button>
          {/* </a> */}
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
