// catalogService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchLibros = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/libros`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching books:', error);
  }
};

export const searchLibros = async (genero, busqueda) => {
  let url = `${BASE_URL}/libros?`;
  if (genero) url += `genero=${genero}&`;
  if (busqueda) url += `nombre=${busqueda}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error searching books:', error);
  }
};
