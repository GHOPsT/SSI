// src/Logica/foroService.js
import axios from 'axios';

export const obtenerPreguntas = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/preguntas');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const registrarPregunta = async (ID_Usuario, Pregunta) => {
  try {
    await axios.post('http://localhost:3001/api/preguntas', {
      ID_Usuario,
      Pregunta
    });
  } catch (error) {
    console.error('Error al registrar la pregunta:', error);
    throw error;
  }
};

export const responderPregunta = async (ID_Pregunta, ID_Usuario, Respuesta) => {
  try {
    await axios.post('http://localhost:3001/api/respuestas', {
      ID_Pregunta,
      ID_Usuario,
      Respuesta
    });
  } catch (error) {
    console.error('Error al responder la pregunta:', error);
    throw error;
  }
};
