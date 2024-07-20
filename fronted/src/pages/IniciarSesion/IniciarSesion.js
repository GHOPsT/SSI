// IniciarSesion.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './globals.css';
import './style.css';
import userpng from './img/usuario.png';
import contraseniapng from './img/contrasenia.png';
import { iniciarSesion } from '../../Logica/Registro/authService.js'; // Importa la función desde authService

const IniciarSesion = () => {
  const [ID_Usuario, setNombre_usuario] = useState('');
  const [Contrasenia, setContrasena] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleIniciarSesion = async (event) => {
    event.preventDefault();
    const result = await iniciarSesion(ID_Usuario, Contrasenia);
    if (result.success) {
      navigate('/inicio'); // Redirige a la página de inicio
    } else {
      alert(result.message); // Muestra mensaje de error
    }
  };

  const irARegistrarse = () => {
    navigate('/registrarse'); // Navega a la página de registro
  };

  return (
    <div className="iniciar-sesin">
      <div className="group-wrapper">
        <div className="group-2">
          <div className="text-wrapper-7">Sistema Integral de Información y Recursos Educativos</div>
        </div>
        <div className="rectangle"></div>
        <div className="div">
          <div className="text-wrapper">Iniciar sesión</div>
          <button onClick={irARegistrarse} className="text-wrapper-2">Registrarse</button>
          <form className="frame" onSubmit={handleIniciarSesion}>
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
