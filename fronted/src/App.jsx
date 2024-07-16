//C:\Users\PROGRESA HUACHIPA\OneDrive\Escritorio\ProyectoUXFinal\ProjectUX\fronted\src\App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import IniciarSesion from './pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './pages/Registrarse/Registrarse.js';
import Inicio from "./pages/Inicio/Inicio.js";
import Perfil from "./pages/PerfilUser/PerfilUsuario.js";
import VentaUsados from "./pages/VentaUsados/VentaUsados.js";
import VentaDatos from "./pages/VentaDatos/VentaDatos.js";
import VentaFinal from "./pages/VentaFinal/VentaFinal.js";
import VentaFuncionalidadDelCodigo from "./pages/VentaFuncionalidadDelCodigo/VentaFuncionalidadDelCodigo.js";
import PantallaDesplegableVenta from "./pages/PantallaDespegableVenta/PantallaDesplegableVenta.js";
import VentaCodigo from "./pages/VentaCodigo/VentaCodigo.js";
import PagoConTarjetas from "./pages/PagoConTarjetas/PagoConTarjetas.js";
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
        <Route path="/pago-tarjetas" element={<ProtectedRoute><PagoConTarjetas /></ProtectedRoute>} />
        <Route path="/venta-codigo" element={<ProtectedRoute><VentaCodigo /></ProtectedRoute>} />
        <Route path="/pantalla-venta" element={<ProtectedRoute><PantallaDesplegableVenta /></ProtectedRoute>} />
        <Route path="/venta-funcionalidad" element={<ProtectedRoute><VentaFuncionalidadDelCodigo /></ProtectedRoute>} />
        <Route path="/venta-final" element={<ProtectedRoute><VentaFinal /></ProtectedRoute>} />
        <Route path="/venta-datos" element={<ProtectedRoute><VentaDatos /></ProtectedRoute>} />
        <Route path="/venta-usados" element={<ProtectedRoute><VentaUsados /></ProtectedRoute>} />
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