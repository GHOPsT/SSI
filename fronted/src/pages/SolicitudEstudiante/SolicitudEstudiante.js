import React, { useState } from 'react';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GuardarUsuario from '../IniciarSesion/UsuarioGuardado.js';

const SolicitudEstudiante = () => {
  const [justificacion, setJustificacion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = GuardarUsuario();

    if (!usuarioId) {
      console.error('Usuario no encontrado');
      return;
    }

    try {
      await axios.post('http://localhost:3001/solicitud', {
        usuarioId,
        justificacion,
        fecha: new Date().toISOString()
      });
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
