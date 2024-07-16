import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PagoDesplegableCompras from '../../common/PantallaDespegableCompras/PagoDesplegableCompras.js';
import axios from 'axios';
import './globals.css';
import './style.css';
import imagenes from "./imagenes";
import GuardarUsuario from '../../pages/IniciarSesion/UsuarioGuardado.js';


const Header = ({ juegosPreSeleccionados = [], onRemoverJuego, isComprasDropdownVisible, setIsComprasDropdownVisible }) => {
  const [isVentasDropdownVisible, setIsVentasDropdownVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const [juegosSeleccionados, setJuegosSeleccionados] = useState(juegosPreSeleccionados);


  useEffect(() => {
    
    axios.get('http://localhost:3001/juegos-seleccionados')
      .then(response => setJuegosSeleccionados(response.data))
      .catch(error => console.error('Error fetching selected games:', error));
    
    axios.get('http://localhost:3001/categorias')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
  };

  const handleImageClick = () => {
    if (selectedCategory) {
      navigate(`/juegos-por-categoria/${selectedCategory}`);
    } else {
      alert('Por favor, selecciona una categoría primero');
    }
  };

  const handleNuevoClick = () => {
    navigate("/venta-nuevos", { state: { juegosSeleccionados } });
  };

  const handleUsadoClick = () => {
    navigate("/venta-usados", { state: { juegosSeleccionados } });
  };

  const toggleComprasDropdown = () => {
    setIsComprasDropdownVisible(!isComprasDropdownVisible);
    if (isVentasDropdownVisible) {
      setIsVentasDropdownVisible(false);
    }
  };

  const handleCerrarSesion = () => {
    axios.delete('http://localhost:3001/juegos-seleccionados')
      .then(response => console.log(response.data))
      .catch(error => console.error('Error deleting selected games:', error));
  }
  const actualizarJuegosSeleccionados = (nuevosJuegos) => {
    axios.post('http://localhost:3001/juegos-seleccionados', nuevosJuegos)
      .then(response => {
        console.log('Juegos seleccionados actualizados');
      })
      .catch(error => {
        console.error('Error actualizando juegos seleccionados:', error);
      });
  };

  const handleRemoverJuego = (juegoId) => {
    const juegosActualizados = juegosSeleccionados.filter(juego => juego.juego_id !== juegoId);
    actualizarJuegosSeleccionados(juegosActualizados);
    onRemoverJuego(juegosActualizados);
  }

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
          <div className="frame-14">
            <input className="buscar-producto" placeholder="Buscar producto" />
            <div className="overlap-group-2">
              <select
                id="category_id"
                name="category_id"
                className="text-wrapper-9"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>Selecciona un género</option>
                {categories.map(category => (
                  <option key={category.categoria_id} value={category.categoria_id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>
            <img className="line-5" src={imagenes.line7} alt="Line" />
            <img className="frame-15" src={imagenes.frame198} alt="Buscar" onClick={handleImageClick} />
          </div>
          <div className="frame-24">
            <Link to="/historial" >
            <img className="user" src={imagenes.user} alt="User" />
            </Link>
            <div className="frame-25">
              <Link to ="/iniciar-sesion">
                <img className="cerrar" src={imagenes.cerrar} alt="Cerrar sesion" /> 
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
              to="/perfil"
              className={`text-wrapper-16 nav-link ${hoveredLink === 'nuevo' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('nuevo')}
              onMouseLeave={handleMouseLeave}
            >
              Perfil
            </Link>
            <Link
              to="/venta-usados"
              className={`text-wrapper-17 nav-link ${hoveredLink === 'usado' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('usado')}
              onMouseLeave={handleMouseLeave}
            >
              Ver Libros
            </Link>
            <Link
              to="/venta-codigo"
              className={`text-wrapper-18 nav-link ${hoveredLink === 'vender' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('vender')}
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
