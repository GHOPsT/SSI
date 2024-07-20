// bookService.js
import axios from 'axios';

export const subirLibro = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3001/subir-libro', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error al subir el libro:', error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
