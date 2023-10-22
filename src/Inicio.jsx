import React from 'react';
import './inicio.css';
import {Button, Image,Form } from 'react-bootstrap';
import logo from './Image/favicongym.png';
import icoSesion from './Image/imgInicio/icon-sesion.png';
// import icoSesion from './Image/LogoGym.png'

const Inicio = () => {
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
          <Form.Control className='inputs' type="password" placeholder="Contraseña" />

          <a href='/Menu'>
          <Button variant="warning" className='bt-Acceder'>Acceder</Button>
          </a>
          <a href='/RecuperarContraseña' className='LinkA'>¿Olvidaste tu contraseña?</a>
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
