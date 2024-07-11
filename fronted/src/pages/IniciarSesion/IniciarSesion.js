import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './globals.css';
import './style.css';
import mailSvg from './img/mail.svg';
import lockSvg from './img/lock.svg';
import frame444Svg from './img/frame-444.svg';
import bienvenidoASvg from './img/bienvenido-a-gamecycle-com.png';
import vectorSvg from './img/vector.svg';
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
                      placeholder="ejemplo@gmail.com"
                      value={nombre_usuario}
                      onChange={(e) => setNombre_usuario(e.target.value)}
                    />
                    <img className="mail" src={mailSvg} alt="mail" />
                  </div>
                  <div className="frame-3">
                    <div className="frame-4">
                      <input type="checkbox" id="rememberPassword" name="rememberPassword" />
                      <label className="text-wrapper-3" htmlFor="rememberPassword">Recordar contraseña</label>
                    </div>
                    <div className="text-wrapper-4">Olvidé mi contraseña</div>
                  </div>
                  <div className="text-wrapper-5">o conéctate con</div>
                  <img className="frame-5" src={frame444Svg} alt="frame" />
                  <div className="frame-6">
                    <input
                      type="password"
                      className="contrasea"
                      placeholder="*********"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                    <img className="lock" src={lockSvg} alt="lock" />
                  </div>
                  <div className="frame-7">
                    <div className="overlap-2">
                      <input type="submit" className="rectangle-2" value="Ingresar" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <img className="bienvenido-a" src={bienvenidoASvg} alt="bienvenido" />
          <div className="group-2">
            <div className="text-wrapper-7">GAME CYCLE</div>
            <img className="vector" src={vectorSvg} alt="vector" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;

