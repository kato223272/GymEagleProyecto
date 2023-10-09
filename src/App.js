import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Inicio from "./Inicio"
import Rutina from './Pages/AgregarRutina';
import Menu from './Pages/Menu';
import Asistencias from './Pages/ListaAsistencias';
import Editar from './Pages/EditarUsuario.jsx';
import Recuperar from './Pages/RecuperarContrasenia';
import Ganancias from './Pages/Ganancias';
import Navbar from './Components/Navbar';

function App() {
  return (
   <>
   <Navbar></Navbar>
    <Router>
    <Routes>
      <Route path="/" element={<Inicio/>}>
        <Route path="/Menu" element={<Menu/>} />
        <Route path="/Rutinas" element={<Rutina/>} />
        <Route path="/Asistencias" element={<Asistencias/>} />
        <Route path="/Editar" element={<Editar/>} />
        <Route path="/RecuperarContraseña" element={<Recuperar/>} />
        <Route path="/Ganancias" element={<Ganancias/>} />
      </Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;

 // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
