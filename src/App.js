import { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Inicio from '../src/Inicio';
import Rutina from './Pages/AgregarRutina';
import Menu from './Pages/Menu';
import Asistencias from './Pages/ListaAsistencias';
import Editar from './Pages/EditarUsuario.jsx';
import Recuperar from './Pages/RecuperarContrasenia';
import Ganancias from './Pages/Ganancias';
import ProtectedRoute from './PrivateRoute.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ display: isAuthenticated ? 'block' : 'none' }}>
        {isAuthenticated && <Navbar />}
      </div>
      <Routes>
        <Route
          path="/"
          element={<Inicio setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/menu"
          element={<ProtectedRoute element={<Menu />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/rutinas"
          element={<ProtectedRoute element={<Rutina />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/asistencias"
          element={<ProtectedRoute element={<Asistencias />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/editar"
          element={<ProtectedRoute element={<Editar />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/recuperarcontrasenia"
          element={<Recuperar />}
        />
        <Route
          path="/ganancias"
          element={<ProtectedRoute element={<Ganancias />} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
