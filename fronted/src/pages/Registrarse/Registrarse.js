import React, { useState } from 'react';
import './globals.css';
import './style.css';
import { Link } from 'react-router-dom';
import imagenes from "./imagenes"

const Registrarse = () => {
  const [ID_Usuario, setUsuario] = useState('');
  const [Contrasenia, setContrasena] = useState('');
  const [Nombre, setNombre_usuario] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Email, setCorreo] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/registrarse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID_Usuario, Contrasenia , Nombre, Apellido, Email}),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="registrarse">
      <div className="frame-wrapper">
      <Link to="/iniciar-sesion" className='button-back'>
        <div className="back-button-container">
          <img src={imagenes.back} alt="Botón de regreso"/>
        </div>
      </Link>
        <form className="frame" onSubmit={handleSubmit}>

            <div className="text-wrapper">Registro</div>
            <img className="line" src={imagenes.line} alt="line" />

          <div className="div-wrapper"><div className="text-wrapper-2">Rellena los siguientes campos</div></div>
          <div className="frame-2"><input
            className="box-txt"
            placeholder="Usuario"
            value={ID_Usuario}
            onChange={(e) => setUsuario(e.target.value)}/> 
            <img className="img" src={imagenes.user} alt="img" />
          </div>
          <div className="frame-2"><input
            className="box-txt"
            placeholder="Nombre"
            value={Nombre}
            onChange={(e) => setNombre_usuario(e.target.value)}
          /> <img className="img" src={imagenes.user} alt="img" />
          </div>
          <div className="frame-2"><input
            className="box-txt"
            placeholder="Apellido"
            value={Apellido}
            onChange={(e) => setApellido(e.target.value)}/> 
            <img className="img" src={imagenes.user} alt="img" />
          </div>
          <div className="frame-2">
            <input
              className="box-txt"
              placeholder="E-mail"
              value={Email}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <img className="img" src={imagenes.mail} alt="img" />
          </div>
          <div className="frame-2">
            <input
              type="password"
              className="box-txt"
              placeholder='Contraseña'
              value={Contrasenia}
              onChange={(e) => setContrasena(e.target.value)}/>
              <img className="img" src={imagenes.lock} alt="img" />
          </div>
          <div className="frame-3">
            <button type="submit" className="rectangle-2">Registrarse</button>        
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;