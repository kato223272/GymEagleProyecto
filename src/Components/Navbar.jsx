import './Navbar.css';
import Logo from '../Image/LogoGym.png';
import { NavLink, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {Row, Image} from 'react-bootstrap';

import imgAsistencia from '../Image/imgNavbar/asistenciaGymNavH.png';
import imgRutina from '../Image/imgNavbar/RutinaGymNavH.png'; 
import imgGanancia from '../Image/imgNavbar/GananciaGymNavH.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons';
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
              <a href="/menu">
                <Image className='LogoNav' src={Logo} alt="" />
              </a>
            </div>

            <span>
              <h1 className='tituloNavbar'>BLACK EAGLE GYM</h1>
            </span>
          </div>

          <div className='contenedorLinksIcon'>
            <NavLink
              to="/Asistencias" activeClassName="nav-active"
              style={{textDecoration:'none'}}
              onClick={() => handleLinkClick('/Asistencias')}
              className={activeLink === '/Asistencias' ? 'nav-active' : ''}>
              <Image className='IconoNavbar' src={imgAsistencia}/>
              <h4 className='TituloLink'>ASISTENCIA</h4>
            </NavLink> 
          </div>

          <div className='contenedorLinksIcon'>
            <NavLink
              to="/editar" activeClassName="nav-active"
              style={{textDecoration:'none'}}
              onClick={() => handleLinkClick('/editar')}
              className={activeLink === '/editar' ? 'nav-active' : ''}>
              <Image className='IconoNavbar' src={imgUsuario}/>
              <h4 className='TituloLink'>USUARIOS</h4>
            </NavLink>
          </div>

          <div className='contenedorLinksIcon'>
            <NavLink
              to="/Rutinas" activeClassName="nav-active"
              style={{textDecoration:'none'}}
              onClick={() => handleLinkClick('/Rutinas')}
              className={activeLink === '/Rutinas' ? 'nav-active' : ''}>
              <Image className='IconoNavbar' src={imgRutina}/>
              <h4 className='TituloLink'>RUTINAS</h4>
            </NavLink>
          </div>

          {/* <div className='contenedorLinksIcon'>
            
            <NavLink
              to="/Ganancias" activeClassName="nav-active"
              style={{textDecoration:'none'}}
              onClick={() => handleLinkClick('/Ganancias')}
              className={activeLink === '/Ganancias' ? 'nav-active' : ''}>
              <Image className='IconoNavbar' src={imgGanancia}/>
              <h4 className='TituloLink'>GANANCIAS</h4>
            </NavLink>
          </div> */}
          
          <div className='contenedorLinksIcon'>
            <NavLink
              to="/chats" activeClassName="nav-active"
              style={{textDecoration:'none'}}
              onClick={() => handleLinkClick('/chats')}
              className={activeLink === '/chats' ? 'nav-active' : ''}>
              <FontAwesomeIcon icon={faComments} size="2xl"
              style={{ color: '#ffff00'}}/>
              <h4 className='TituloLink'>Mensajes</h4>
            </NavLink>
          </div>
        </div>

      </Row>
    </header>

  );
}

export default Navbar;
