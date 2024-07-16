import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './globals.css';
import './style.css';
import userpng from './img/usuario.png';
import contraseniapng from './img/contrasenia.png';
import GuardarUsuario from './UsuarioGuardado';

const IniciarSesion = () => {
  const [nombre_usuario, setNombre_usuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const iniciarSesion = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/iniciar-sesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_usuario, contrasena }),
      });
      const data = await response.json();
      if (data.usuario_id) {
        GuardarUsuario(data.usuario_id); 
        navigate('/inicio'); // Redirige a la página de inicio
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la solicitud');
    }
  };

  return (
    <div className="iniciar-sesin">
      <div className="group-wrapper">
        <div className="group">
          <div className="frame">
            <div className="overlap">
              <div className="rectangle"></div>
              <div className="div">
                <div className="text-wrapper">Iniciar sesión</div>
                <Link to="/registrarse" className="text-wrapper-2">Registrarse</Link>
                <form onSubmit={iniciarSesion}>
                  <div className="frame-2">
                    <input
                      className="correo-electrnico"
                      placeholder="Usuario"
                      value={nombre_usuario}
                      onChange={(e) => setNombre_usuario(e.target.value)}
                    />
                    <img className="mail" src={userpng} alt="mail" />
                  </div>
                  <div className="frame-6">
                    <input
                      type="password"
                      className="contrasea"
                      placeholder="*********"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                    <img className="lock" src={contraseniapng} alt="lock" />
                  </div>
                  <div className="button">
                    <input type="submit" className="rectangle-2" value="Ingresar" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="group-2">
            <div className="text-wrapper-7">Sistema Integral de Información y Recursos Educativos </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;

