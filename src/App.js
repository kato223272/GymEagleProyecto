import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Inicio from '../src/Inicio';
import Rutina from './Pages/AgregarRutina';
import Menu from './Pages/Menu';
import Asistencias from './Pages/ListaAsistencias';
import Editar from './Pages/EditarUsuario.jsx';
import Recuperar from './Pages/RecuperarContrasenia';
import Ganancias from './Pages/Ganancias';
import ChatsClientes from './Pages/ChatsClientes.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentPath =window.location.pathname.toLowerCase();
const navbarDisplay = (currentPath !== '/' && currentPath !== '/menu' && currentPath !== '/recuperarcontrasenia') ? "block" : "none";

  const renderProtectedRoute = (Component) => {
    return isAuthenticated ? <Component /> : <Navigate to="/" />;
  };

  return (
    <Router>
      <div style={{ display: isAuthenticated ? 'block' : 'none' }}>
      {isAuthenticated }
      </div>
      <div style={{display: navbarDisplay}}>
       
        <Navbar></Navbar>
        </div>
      <Routes>
        <Route
          exact path="/"
          element={<Inicio setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}
        />
        <Route
          exact path="/menu"
          element={<Menu />}
        />
         <Route
          exact path="/rutinas"
          element={<Rutina />}
        />
        <Route
          exact path="/asistencias"
          element={<Asistencias />}
        />
        <Route
          exact path="/editar"
          element={<Editar />}
        />
        <Route 
          exact path="/recuperarcontrasenia" 
          element={<Recuperar />} />
        <Route
          exact path="/ganancias"
          element={<Ganancias />}
        />
        <Route
          exact path="/chats"
          element={<ChatsClientes />}
        />
      </Routes>
    </Router>
  );
}

export default App;
