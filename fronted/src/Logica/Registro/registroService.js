// src/Logica/registroService.js

export const registrarUsuario = async (ID_Usuario, Contrasenia, Nombre, Apellido, Email) => {
    try {
      const response = await fetch('http://localhost:3001/registrarse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID_Usuario, Contrasenia, Nombre, Apellido, Email }),
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  };
  