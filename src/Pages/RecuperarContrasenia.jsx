import React from 'react';
import {Button, Image, Form } from 'react-bootstrap';
import '../Css/RecuperarContrasenia.css';
import imgGrande from '../Image/LogoGym.png';

const RecuperarContrasenia = () => {
  return (
    <div className='containerGlobal'>
      <header>
        <nav className='NavbarSesion'>
          {/* <a href='/'><Button variant='dark'>Regresar</Button></a> */}
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
            <label className='indicacionRecuperar'>Ingrese usuario:</label>
            <Form.Control className='inputsRecuperar' type="text" placeholder="Usuario" />

            <label className='indicacionRecuperar'>Colocar número télefonico:</label>
            <Form.Control className='inputsRecuperar' type="text" placeholder="Ejem: 9605658789" />
            <Button className='bt-Recuperar' variant='warning'>Eviar mensaje</Button>

            <label className='indicacionRecuperar'>Ingrese contraseña nueva:</label>
            <Form.Control className='inputsRecuperar' type="password" placeholder="Contraseña Nueva" 
            disabled/>

            <Button className='bt-Recuperar' variant='warning'>Acceder</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecuperarContrasenia
