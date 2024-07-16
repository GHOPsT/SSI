import React, { useEffect, useState } from 'react';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import axios from 'axios';
import imagenes from './imagenes.js';
import { Link } from 'react-router-dom';
import GuardarUsuario from '../IniciarSesion/UsuarioGuardado.js';
import Footer from '../../common/footer/footer.js';

  const PerfilUsuario = () =>  {
    const [perfil, setPerfil] = useState(null);
  
    useEffect(() => {
      const fetchPerfil = async () => {
        const usuarioId = GuardarUsuario();
        if (!usuarioId) {
          console.error('Usuario no encontrado');
          return;
        }
        try {
          const response = await fetch(`http://localhost:3001/perfil/${usuarioId}`);
          const data = await response.json();
          setPerfil(data);
        } catch (error) {
          console.error('Error fetching perfil:', error);
        }
      };

    fetchPerfil();
    }, []);

    if (!perfil){
      return <div>Cargando perfil ...</div>;
    }

  return (
    <div>
      <Header/>
      <div className='perfil-usuario'>
        <div className='div'>
          <div className='frame'>
              <div className="perfil-icono">
                <img src={imagenes.perfil} alt="User Icon" />
              </div>
              <div className="perfil-detalles">
                <div><strong>Nombre:</strong> {perfil.Nombre}</div>
                <div><strong>Apellido:</strong> {perfil.Apellido}</div>
                <div><strong>Email:</strong> {perfil.Email}</div>
                <div><strong>Role:</strong> {perfil.role}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
