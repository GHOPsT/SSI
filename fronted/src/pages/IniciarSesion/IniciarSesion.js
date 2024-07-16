import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './globals.css';
import './style.css';
import userpng from './img/usuario.png';
import contraseniapng from './img/contrasenia.png';
import GuardarUsuario from './UsuarioGuardado';

const IniciarSesion = () => {
  const [ID_Usuario, setNombre_usuario] = useState('');
  const [Contrasenia, setContrasena] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const iniciarSesion = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/iniciar-sesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ID_Usuario, Contrasenia }),
      });
      const data = await response.json();
      if (data.ID_Usuario) {
        GuardarUsuario(data.ID_Usuario); 
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
       <div className="group-2">
          <div className="text-wrapper-7">Sistema Integral de Información y Recursos Educativos </div>
        </div>
              <div className="rectangle"></div>
              <div className="div">
                <div className="text-wrapper">Iniciar sesión</div>
                <Link to="/registrarse" className="text-wrapper-2">Registrarse</Link>
                <form className="frame" onSubmit={iniciarSesion}>
                  <div className="frame-2">
                    <input
                      className="box-txt"
                      placeholder="Usuario"
                      value={ID_Usuario}
                      onChange={(e) => setNombre_usuario(e.target.value)}
                    />
                    <img className="img" src={userpng} alt="img" />
                  </div>
                  <div className="frame-4">
                    <input
                      type="password"
                      className="box-txt"
                      placeholder="*********"
                      value={Contrasenia}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                    <img className="img" src={contraseniapng} alt="img" />
                  </div>
                  <div className="frame-3">
                    <button type="submit" className="rectangle-2">Ingresar</button>
                  </div>
                </form>
              </div>
          </div>
    </div>
  );
};

export default IniciarSesion;