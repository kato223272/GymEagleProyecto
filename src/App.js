import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './RutaProtejida.js';

import Navbar from './Components/Navbar';
import Inicio from '../src/Inicio';
import Rutina from './Pages/AgregarRutina';
import Menu from './Pages/Menu';
import Asistencias from './Pages/ListaAsistencias';
import Editar from './Pages/EditarUsuario.jsx';
import Recuperar from './Pages/RecuperarContrasenia';
import Ganancias from './Pages/Ganancias';

function App() {
  const currentPath = window.location.pathname.toLowerCase(); // Convertir a minúsculas
  const navbarDisplay = (currentPath !== '/' && currentPath !== '/menu' && currentPath !== '/recuperarcontrasenia') ? "block" : "none";

  return (
    <Router>
      <div style={{ display: navbarDisplay }}>
        <Navbar />
      </div>
      <Routes>
      <Route path="/" element={<Inicio />} />
        <ProtectedRoute path="/menu" element={<Menu />} />
        <ProtectedRoute path="/rutinas" element={<Rutina />} />
        <ProtectedRoute path="/asistencias" element={<Asistencias />} />
        <ProtectedRoute path="/editar" element={<Editar />} />
        <Route path="/recuperarcontrasenia" element={<Recuperar />} />
        <ProtectedRoute path="/ganancias" element={<Ganancias />} />
      </Routes>
    </Router>
  );
}


export default App;
