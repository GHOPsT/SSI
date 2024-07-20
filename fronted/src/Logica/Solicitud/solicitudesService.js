// src/Logica/solicitudesService.js
import axios from 'axios';

export const obtenerSolicitudes = async () => {
  try {
    const response = await axios.get('http://localhost:3001/solicitudes');
    return response.data;
  } catch (error) {
    console.error('Error fetching solicitudes:', error);
    throw error;
  }
};

export const responderSolicitud = async (id, aceptar) => {
  try {
    await axios.post(`http://localhost:3001/responder-solicitud/${id}`, { aceptar });
    return true;
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    throw error;
  }
};
