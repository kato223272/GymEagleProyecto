
import './Navbar.css';
import Logo from '../Image/LogoGym.png';

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
          <a href="/Asistencias"> <h3>LISTA DE ASISTENCIAS</h3></a>
          <a href="/Editar"><h3>EDITAR USUARIO</h3></a>
          <a href="/Ganancias"><h3>VER GANANCIAS</h3></a>
          <a href="/Rutinas"><h3>AGREGAR RUTINAS</h3></a>
        </div>
      
    </div>
    </>
  );
}

export default Navbar;
