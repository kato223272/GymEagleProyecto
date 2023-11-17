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
  const currentPath = window.location.pathname.toLowerCase(); // Convierte a minusculas 
  const navbarDisplay = (currentPath !== '/' && currentPath !== '/menu' && currentPath !== '/recuperarcontrasenia') ? "block" : "none";

  return (
    <Router>
      <div style={{ display: navbarDisplay }}>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/rutinas" element={<Rutina />} />
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/editar" element={<Editar />} />
        <Route path="/recuperarcontrasenia" element={<Recuperar />} />
        <Route path="/ganancias" element={<Ganancias />} />
      </Routes>
    
    </Router>
  );
}


export default App;
