
import './Navbar.css';
import Logo from '../Image/LogoGym.png';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
    <div className="Columna">
        <div className="Fila1">
          <div className='ContenedorImg'>
          <a href="/Menu"><img src={Logo} alt="" /></a>
          </div>
          <div className='ContenedorLetra'>
            <h1>BLACK EAGLE GYM</h1>
          </div>
        </div>
        <div className="Fila2">
          <NavLink to="/Asistencias"><h4>LISTA DE ASISTENCIA</h4></NavLink>
          <NavLink to="/Editar"><h4>EDITAR USUARIO</h4></NavLink>
          <NavLink to="/Rutinas"><h4>AGREGAR RUTINAS</h4></NavLink>
          <NavLink to="/Ganancias"><h4>VER GANANCIAS</h4></NavLink>
          <NavLink to="/Ganancias"><h4>VER GANANCIAS</h4></NavLink>
          <NavLink to="/Rutinas"><h4>AGREGAR RUTINAS</h4></NavLink>
        </div>
      
    </div>
    </>
  );
}

export default Navbar;
