import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

import Navbar from './Components/Navbar';
import Inicio from '../src/Inicio';
import Rutina from './Pages/AgregarRutina';
import Menu from './Pages/Menu';
import Asistencias from './Pages/ListaAsistencias';
import Editar from './Pages/EditarUsuario.jsx';
import Recuperar from './Pages/RecuperarContrasenia';
import Ganancias from './Pages/Ganancias';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentPath = window.location.pathname.toLowerCase(); // Convierte a minusculas 
  const navbarDisplay = (currentPath !== '/' && currentPath !== '/menu' && currentPath !== '/recuperarcontrasenia') ? "block" : "none";

  return (
    <Router>
      <div style={{ display: navbarDisplay }}>
        <Navbar />
      </div>
      <Routes>
      <Route path="/" element={<Inicio setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
        <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/" />} />
        <Route path="/rutinas" element={isAuthenticated ? <Rutina /> : <Navigate to="/" />} />
        <Route path="/asistencias" element={isAuthenticated ? <Asistencias /> : <Navigate to="/" />} />
        <Route path="/editar" element={isAuthenticated ? <Editar /> : <Navigate to="/" />} />
        <Route path="/recuperarcontrasenia" element={<Recuperar />} />
        <Route path="/ganancias" element={isAuthenticated ? <Ganancias /> : <Navigate to="/" />} />
      </Routes>
    
    </Router>
  );
}


export default App;
