// UsuarioRol.js
export const GuardarRol = (rol) => {
    localStorage.setItem('usuario_rol', rol);
  };
  
  export const ObtenerRol = () => {
    return localStorage.getItem('usuario_rol');
  };
  
  export const BorrarRol = () => {
    localStorage.removeItem('usuario_rol');
  };
  