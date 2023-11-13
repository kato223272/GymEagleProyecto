import './Navbar.css';
import Logo from '../Image/LogoGym.png';
import { NavLink, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {Row, Image} from 'react-bootstrap';

import imgAsistencia from '../Image/imgNavbar/asistenciaGymNavH.png';
import imgRutina from '../Image/imgNavbar/RutinaGymNavH.png'; 
import imgGanancia from '../Image/imgNavbar/GananciaGymNavH.png';
import imgUsuario from '../Image/imgNavbar/usuarioGym.png';

function Navbar() {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    setActiveLink(pathname); 
  }, [pathname]);

  return (
    <header className='NavbarPrincipal'>
      <Row>
        <div className='contenedorLink'>

          <div className='IconoTitulo'>
            <div className='ContenedorImg'>
              <a href="/Menu">
                <Image className='LogoNav' src={Logo} alt="" />
              </a>
            </div>

            <span>
              <h1 className='tituloNavbar'>BLACK EAGLE GYM</h1>
            </span>
          </div>

          <div className='contenedorLinksIcon'>
            <Image className='IconoNavbar' src={imgAsistencia}/>
            <NavLink
              to="/Asistencias" activeClassName="nav-active"
              onClick={() => handleLinkClick('/Asistencias')}
              className={activeLink === '/Asistencias' ? 'nav-active' : ''}>
              <h4 className='TituloLink'>ASISTENCIA</h4>
            </NavLink> 
          </div>

          <div className='contenedorLinksIcon'>
            <Image className='IconoNavbar' src={imgUsuario}/>
            <NavLink
              to="/editar" activeClassName="nav-active"
              onClick={() => handleLinkClick('/editar')}
              className={activeLink === '/editar' ? 'nav-active' : ''}>
              <h4 className='TituloLink'>USUARIOS</h4>
            </NavLink>
          </div>

          <div className='contenedorLinksIcon'>
            <Image className='IconoNavbar' src={imgRutina}/>
            <NavLink
              to="/Rutinas" activeClassName="nav-active"
              onClick={() => handleLinkClick('/Rutinas')}
              className={activeLink === '/Rutinas' ? 'nav-active' : ''}>
              <h4 className='TituloLink'>RUTINAS</h4>
            </NavLink>
          </div>

          <div className='contenedorLinksIcon'>
            <Image className='IconoNavbar' src={imgGanancia}/>
            <NavLink
              to="/Ganancias" activeClassName="nav-active"
              onClick={() => handleLinkClick('/Ganancias')}
              className={activeLink === '/Ganancias' ? 'nav-active' : ''}>
              <h4 className='TituloLink'>GANANCIAS</h4>
            </NavLink>
          </div>
        </div>

      </Row>
    </header>

  );
}

export default Navbar;
