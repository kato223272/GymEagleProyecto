import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Inicio from '../src/Inicio';
import Rutina from './Pages/AgregarRutina';
import Menu from './Pages/Menu';
import Asistencias from './Pages/ListaAsistencias';
import Editar from './Pages/EditarUsuario.jsx';
import Recuperar from './Pages/RecuperarContrasenia';
import Ganancias from './Pages/Ganancias';

function App() {
  const currentPath = window.location.pathname;
  const navbarDisplay = currentPath !== '/' && currentPath !== '/Menu' && currentPath !== '/RecuperarContraseña' ? "block" : "none";

  return (
    <Router>
      <div style={{ display: navbarDisplay }}>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Rutinas" element={<Rutina />} />
        <Route path="/Asistencias" element={<Asistencias />} />
        <Route path="/Editar" element={<Editar />} />
        <Route path="/RecuperarContraseña" element={<Recuperar />} />
        <Route path="/Ganancias" element={<Ganancias />} />
      </Routes>
    </Router>
  );
}

export default App;
