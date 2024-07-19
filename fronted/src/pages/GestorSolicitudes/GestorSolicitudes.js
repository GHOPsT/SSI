// src/pages/GestorSolicitudes.js
import React, { useEffect, useState } from 'react';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import axios from 'axios';

const GestorSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/solicitudes');
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleRespuesta = async (id, aceptar) => {
    try {
      await axios.post(`http://localhost:3001/responder-solicitud/${id}`, { aceptar });
      alert('Solicitud procesada');
      // Actualizar el estado de las solicitudes para remover la solicitud procesada
      setSolicitudes(prevSolicitudes => prevSolicitudes.filter(solicitud => solicitud.ID !== id));
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      // Manejar el error, mostrar mensaje al usuario, etc.
    }
  };

  return (
    <div>
      <Header />
      <div className='gestor-solicitudes'>
        <h2 className='titulo'>Gestión de Solicitudes</h2>
        <table>
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Justificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map(solicitud => (
              <tr key={solicitud.ID}>
                <td>{solicitud.ID_Usuario}</td>
                <td>{solicitud.Nombre}</td>
                <td>{new Date(solicitud.Fecha).toLocaleDateString()}</td>
                <td>{solicitud.Justificacion}</td>
                <td>
                  <button onClick={() => handleRespuesta(solicitud.ID, true)}>Aceptar</button>
                  <button onClick={() => handleRespuesta(solicitud.ID, false)}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestorSolicitudes;
