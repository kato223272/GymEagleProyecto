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
  const currentPath = window.location.pathname.toLowerCase(); // Convertir a minúsculas
  const navbarDisplay = (currentPath !== '/' && currentPath !== '/menu' && currentPath !== '/recuperarcontrasenia') ? "block" : "none";

  return (
    <Router>
      <div style={{ display: navbarDisplay }}>
        <Navbar />
      </div>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/rutinas" element={<Rutina />} />
        <Route exact path="/asistencias" element={<Asistencias />} />
        <Route exact path="/editar" element={<Editar />} />
        <Route exact path="/recuperarcontrasenia" element={<Recuperar />} />
        <Route exact path="/ganancias" element={<Ganancias />}></Route>
      </Routes>
    </Router>
  );
}


export default App;
