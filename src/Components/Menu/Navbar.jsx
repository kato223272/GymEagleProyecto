import './Navbar.css';
import Logo from '../../Image/LogoGym.png';


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
          <div>
            <a href="/"> <button   className='Finalizar' >FINALIZAR DÍA</button></a>
           
          </div>
        </div>
       
       
    </div>
    </>
  );
}

export default Navbar;
