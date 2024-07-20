import React from 'react';
import { Navigate } from 'react-router-dom';
import GuardarUsuario from '../Logica/Registro/UsuarioGuardado';

const ProtectedRoute = ({ children }) => {
  const usuario = GuardarUsuario();

  if (!usuario) {
    return <Navigate to="/iniciar-sesion" />;
  }

  return children;
};

export default ProtectedRoute;
