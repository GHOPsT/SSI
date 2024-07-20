import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './globals.css';
import './style.css';
import imagenes from './imagenes';
import { ObtenerRol } from '../../Logica/Registro/UsuarioRole.js'; // Corrección en el nombre del archivo

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const userRol = ObtenerRol();
    setRol(userRol);
  }, []); // Agrega un array vacío para ejecutar solo una vez al montar el componente

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <div className="header">
      <div className="inicio">
        <div className="frame-13">
          <div className="group-3">
            <div className="text-wrapper-8">SIIRE</div>
            <img className="vector" src={imagenes.libro} alt="Logo" />
          </div>

          <div className="frame-24">
            <Link to="/perfil">
              <img className="user" src={imagenes.user} alt="User" />
            </Link>
            <div className="frame-25">
              <Link to="/iniciar-sesion">
                <img className="cerrar" src={imagenes.cerrar} alt="Cerrar sesión" />
              </Link>
            </div>
          </div>
        </div>
        <div className="frame-31">
          <div className="navbar">
            <Link
              to="/inicio"
              className={`text-wrapper-15 nav-link ${hoveredLink === 'inicio' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('inicio')}
              onMouseLeave={handleMouseLeave}
            >
              Inicio
            </Link>
            <Link
              to={rol === 'Profesor' ? '/perfil-profesor' : '/perfil'}
              className={`text-wrapper-16 nav-link ${hoveredLink === 'perfil' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('perfil')}
              onMouseLeave={handleMouseLeave}
            >
              Perfil
            </Link>
            <Link
              to="/biblioteca"
              className={`text-wrapper-17 nav-link ${hoveredLink === 'biblioteca' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('biblioteca')}
              onMouseLeave={handleMouseLeave}
            >
              Biblioteca
            </Link>
            <Link
              to="/foro"
              className={`text-wrapper-18 nav-link ${hoveredLink === 'foro' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('foro')}
              onMouseLeave={handleMouseLeave}
            >
              Foro
            </Link>
            <div className="header-overlay" style={{ display: hoveredLink ? 'block' : 'none' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
