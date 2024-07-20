//C:\Users\PROGRESA HUACHIPA\OneDrive\Escritorio\ProyectoUXFinal\ProjectUX\fronted\src\App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import IniciarSesion from './pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './pages/Registrarse/Registrarse.js';
import Inicio from "./pages/Inicio/Inicio.js";
import Perfil from "./pages/PerfilUser/PerfilUsuario.js";
import Biblioteca from "./pages/Biblioteca/Libros.js";
import Foro from "./pages/ForoUser/ForoLogic.js";
import InsertarLibro from "./pages/InsertLibroBiblioteca/InsertarLibro.js";
import Footer from "./common/footer/footer.js";
import ProtectedRoute from './pages/ProtectedRoutes.js';
import GestorSolicitudes from './pages/GestorSolicitudes/GestorSolicitudes.js';
import SolicitudEstudiante from './pages/SolicitudEstudiante/SolicitudEstudiante.js';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/insertar-libro" element={<ProtectedRoute><InsertarLibro /></ProtectedRoute>} />
        <Route path="/Foro" element={<ProtectedRoute><Foro /></ProtectedRoute>} />
        <Route path="/gestor-solicitudes" element={<ProtectedRoute><GestorSolicitudes/></ProtectedRoute>}/>
        <Route path="/solicitud-estudiante" element={<ProtectedRoute><SolicitudEstudiante/></ProtectedRoute>}/>
        <Route path="/biblioteca" element={<ProtectedRoute><Biblioteca /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/inicio" element={<ProtectedRoute><Inicio /></ProtectedRoute>}/>        
        <Route path="/" element={<IniciarSesion />} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;