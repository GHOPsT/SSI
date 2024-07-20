// src/Logica/Registro/UsuarioRole.js
export const GuardarRol = (rol) => {
  localStorage.setItem('usuarioRol', rol);
};

export const ObtenerRol = () => {
  return localStorage.getItem('usuarioRol');
};