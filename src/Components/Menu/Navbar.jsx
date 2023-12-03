import './Navbar.css';
import Logo from '../../Image/LogoGym.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf,faPersonWalkingArrowRight,faComments } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';

function Navbar() {
  const descargarPDF = () => {
    const rutaPDF = '/Manual de Usuario.pdf';
    fetch(rutaPDF)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, 'Manual de Usuario.pdf');
      })
      .catch((error) => {
        console.error('Error al descargar el PDF', error);
      });
  };

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

          <div className='cajaPdfCerrarSesion'>

            <a href="/chats"> 
              <button className='FinalizarM'>
                  <FontAwesomeIcon icon={faComments} size="2xl" style={{ color: '#ffff00'}}/>
                  <br/>
                    Mensajes
              </button>
            </a>
            
          <button onClick={descargarPDF} className='bt-PDFManual'>
            <FontAwesomeIcon icon={faFilePdf} size="2xl" style={{color: "#ffff00",}} /><br/>
              Manual
            </button>
            <a href="/"> 
              <button className='FinalizarM'>
                <FontAwesomeIcon icon={faPersonWalkingArrowRight} size="2xl" style={{color: "#ff0000",}} /> 
                <br/>
                Finalizar Día
              </button>
            </a>
          </div>
        </div>
    </div>
    </>
  );
}

export default Navbar;
