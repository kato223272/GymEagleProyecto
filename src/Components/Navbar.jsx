
import './Navbar.css';
import Logo from '../Image/LogoGym.png';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="Columna">
      <div className="Fila1">
        <div className='ContenedorImg'>
          <a href="/Menu">
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className='ContenedorLetra'>
          <h1>BLACK EAGLE GYM</h1>
        </div>
      </div>
      <div className="Fila2">
        <NavLink
          to="/Asistencias"
          onClick={() => handleLinkClick('/Asistencias')}
          className={activeLink === '/Asistencias' ? 'nav-active' : ''}
        >
          <h4>LISTA DE ASISTENCIA</h4>
        </NavLink>
        
        {/* <NavLink
          to="/Editar"
          onClick={() => handleLinkClick('/Editar')}
          className={activeLink === '/Editar' ? 'nav-active' : ''}
        >
          <h4>EDITAR USUARIO</h4>
        </NavLink> */}

        <NavLink
          to="/Rutinas"
          onClick={() => handleLinkClick('/Rutinas')}
          className={activeLink === '/Rutinas' ? 'nav-active' : ''}
        >
          <h4>AGREGAR RUTINAS</h4>
        </NavLink>
        <NavLink
          to="/Ganancias"
          onClick={() => handleLinkClick('/Ganancias')}
          className={activeLink === '/Ganancias' ? 'nav-active' : ''}
        >
          <h4>VER GANANCIAS</h4>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
