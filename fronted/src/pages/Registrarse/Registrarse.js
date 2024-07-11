import React, { useState } from 'react';
import './globals.css';
import './style.css';
import { Link } from 'react-router-dom';
import imagenes from "./imagenes"

const Registrarse = () => {
  const [nombre_usuario, setNombre_usuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [apellido, setApellido] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes hacer la solicitud HTTP a tu servidor
    const response = await fetch('http://localhost:3001/registrarse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_usuario, correo, contrasena, apellido }),
    });
    const data = await response.json();
    // Mensaje de confirmación de registro
    alert(data.message);
  };

  return (
    <div className="registrarse">
      <div className="frame-wrapper">
        <form className="frame" onSubmit={handleSubmit}>
          <div className="div">
            <div className="text-wrapper">Registro</div>
            <img className="line" src={imagenes.line} alt="line" />
          </div>
          <div className="div-wrapper"><div className="text-wrapper-2">Rellena los siguientes campos</div></div>
          <div className="frame-2"><input
            className="nombre-completo"
            placeholder="Nombre Completo"
            value={nombre_usuario}
            onChange={(e) => setNombre_usuario(e.target.value)}
          /> <img className="user" src={imagenes.user} alt="user" /></div>
          <div className="frame-2"><input
            className="e-mail"
            placeholder="ejemplo@gmail.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          /> <img className="mail" src={imagenes.mail} alt="mail" /></div>
          <div className="frame-2">
            <input
              
              className="contrasea"
              placeholder='Contraseña'
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              
            />
            <img className="lock" src={imagenes.lock} alt="lock" />
            <div className="group">
              <div className="overlap-group"><div className="ellipse"></div></div>
            </div>
          </div>
          <div className="frame-2">
            <input
              className="confirmar-contrasea"
              placeholder="Confirmar contraseña"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            <div className="overlap-group-wrapper">
              <div className="overlap-group"><div className="ellipse"></div></div>
            </div>
            <img className="img" src={imagenes.lock} alt="lock" />
          </div>
          <div className="frame-3">
            <button type="submit">Registrarse</button>          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;
