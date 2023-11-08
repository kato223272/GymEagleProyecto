import './Navbar.css';
import Logo from '../../Image/LogoGym.png';

function Navbar() {
  return (
    <>
    <div className="ColumnaM">
        <div className="Fila1">
          <div className='ContenedorImgM'>
          <a href="/Menu"><img src={Logo} alt="" /></a>
          </div>
          <div className='ContenedorLetraM'>
            <h1>BLACK EAGLE GYM</h1>
          </div>
          <div>
            <a href="/"> <button className='FinalizarM'>FINALIZAR DÍA</button></a>
          </div>
        </div>
    </div>
    </>
  );
}

export default Navbar;
