import React from 'react';
import './inicio.css';
import Button from 'react-bootstrap/Button';

const Inicio = () => {
  return (
    <div className='containerGlobal'>
      <header>
        <nav className='NavbarSesion'>
          <h1>HOLA NAVBAR</h1>
        </nav>
      </header>

      <main className='mainSesion'>
        <div className='containerSesion'>
          <h3>Bienvenido Administrador</h3>
          <label>Ingrese Usuario:</label>
          <Button variant="dark">Dark</Button>
        </div>
      </main>

    </div>
  )
}

export default Inicio
