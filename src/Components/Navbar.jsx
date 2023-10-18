import './Navbar.css';
import Logo from '../Image/LogoGym.png';

function Navbar() {
  return (
    <>
    <div className="Columna">
        
        <div className="Fila1">
          <div className='ContenedorImg'>
          <a href="/"><img src={Logo} alt="" /></a>
          </div>
          <div className='ContenedorLetra'>
            <h1>GYM EAGLE</h1>
          </div>
        </div>
        <div className="Fila2">
          <a href=""> <h3>LISTA DE ASISTENCIAS</h3></a>
          <a href=""><h3>EDITAR USUARIO</h3></a>
          <a href=""><h3>LISTA DE ASISTENCIAS</h3></a>
        </div>
    </div>
    </>
  );
}

export default Navbar;
