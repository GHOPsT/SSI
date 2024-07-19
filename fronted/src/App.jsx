//C:\Users\PROGRESA HUACHIPA\OneDrive\Escritorio\ProyectoUXFinal\ProjectUX\fronted\src\App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import IniciarSesion from './pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './pages/Registrarse/Registrarse.js';
import Inicio from "./pages/Inicio/Inicio.js";
import Perfil from "./pages/PerfilUser/PerfilUsuario.js";
import Biblioteca from "./pages/Biblioteca/Libros.js";
import VentaFuncionalidadDelCodigo from "./pages/VentaFuncionalidadDelCodigo/VentaFuncionalidadDelCodigo.js";
import Foro from "./pages/ForoUser/ForoLogic.js";
import InsertarLibro from "./pages/InsertLibroBiblioteca/InsertarLibro.js";
import CompraExitosa from "./pages/CompraExitosa/CompraExitosa.js";
import DetalleProducto from "./pages/DetalleDelProducto/DetalleDelProducto.js";
import DetalleCompras from "./pages/CarritoDeCompras/DetalleCompras.js";
import DetalleProductoUsado from "./pages/DetalleDelProductoUsado/DetalleDelProducto.js";
import Header from './common/header/header.js';
import MaybeShowHeader from './common/MaybeShowHeader/MaybeShowHeader.js';
import SaveImage from "./pages/Configuraciones/ImagenConfig.js"; 
import MaybeShowFooter from "./common/MaybeShowFooter/MaybeShowFooter.js";
import Footer from "./common/footer/footer.js";
import HistorialDeCompras from './pages/HistorialDeCompras/HistorialDeCompras.js';
import JuegosPorCategoria from "./pages/JuegosVenta/JuegosVenta.js";
import ProtectedRoute from './pages/ProtectedRoutes.js';
import PerfilProfesor from './pages/PerfilProfesor/PerfilAdmin.js';
import GestorSolicitudes from './pages/GestorSolicitudes/GestorSolicitudes.js';
import SolicitudEstudiante from './pages/SolicitudEstudiante/SolicitudEstudiante.js';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/detalle-producto/:juego_id" element={<ProtectedRoute><DetalleProducto /></ProtectedRoute>} />
        <Route path="/juegos-por-categoria/:categoria_id" element={<ProtectedRoute><JuegosPorCategoria /></ProtectedRoute>} />
        <Route path="/configuraciones" element={<SaveImage />} />
        <Route path="/carrito-compras" element={<ProtectedRoute><DetalleCompras /></ProtectedRoute>} />
        <Route path="/detalle-producto-usado" element={<ProtectedRoute><DetalleProductoUsado /></ProtectedRoute>} />
        <Route path="/detalle-producto" element={<ProtectedRoute><DetalleProducto /></ProtectedRoute>} />
        <Route path="/compra-exitosa" element={<ProtectedRoute><CompraExitosa /></ProtectedRoute>} />
        <Route path="/insertar-libro" element={<ProtectedRoute><InsertarLibro /></ProtectedRoute>} />
        <Route path="/Foro" element={<ProtectedRoute><Foro /></ProtectedRoute>} />
        <Route path="/gestor-solicitudes" element={<ProtectedRoute><GestorSolicitudes/></ProtectedRoute>}/>
        <Route path="/solicitud-estudiante" element={<ProtectedRoute><SolicitudEstudiante/></ProtectedRoute>}/>
        <Route path="/venta-funcionalidad" element={<ProtectedRoute><VentaFuncionalidadDelCodigo /></ProtectedRoute>} />
        <Route path="/perfil-profesor" element={<ProtectedRoute><PerfilProfesor /></ProtectedRoute>} />
        <Route path="/biblioteca" element={<ProtectedRoute><Biblioteca /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/historial" element={<ProtectedRoute><HistorialDeCompras /></ProtectedRoute>} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          }
        />        
        <Route path="/" element={<IniciarSesion />} />
      </Routes>
      <MaybeShowFooter>
        <Footer />
      </MaybeShowFooter>
    </Router>
  );
}

export default App;