// solicitudService.js
import axios from 'axios';
import GuardarUsuario from '../Registro/UsuarioGuardado';

const enviarSolicitud = async (justificacion) => {
  const usuarioId = GuardarUsuario();

  if (!usuarioId) {
    throw new Error('Usuario no encontrado');
  }

  const response = await axios.post('http://localhost:3001/solicitud', {
    usuarioId,
    justificacion,
    fecha: new Date().toISOString(),
  });

  return response.data;
};

export default enviarSolicitud;
