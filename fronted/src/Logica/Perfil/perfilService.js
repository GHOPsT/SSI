// src/Logica/perfilService.js
import axios from 'axios';

export const obtenerPerfil = async (usuarioId) => {
  try {
    const response = await axios.get(`http://localhost:3001/perfil/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching perfil:', error);
    throw error;
  }
};
