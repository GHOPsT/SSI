import React, { useState } from 'react';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import { useNavigate } from 'react-router-dom';
import enviarSolicitud from '../../Logica/Solicitud/solicitudService.js'; // Importar la lógica de envío de solicitud

const SolicitudEstudiante = () => {
  const [justificacion, setJustificacion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await enviarSolicitud(justificacion);
      alert('Solicitud enviada');
      navigate('/perfil'); // Redirige a la página de perfil
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Manejar el error, mostrar mensaje al usuario, etc.
    }
  };

  return (
    <div>
      <Header />
      <div className='solicitud'>
        <div className='formulario'>
          <p className='titulo'>Solicitar Cambio de Rol</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="justificacion">Justificación:</label>
              <textarea
                id="justificacion"
                value={justificacion}
                onChange={(e) => setJustificacion(e.target.value)}
                required
              />
            </div>
            <button className='boton' type="submit">Enviar Solicitud</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolicitudEstudiante;
