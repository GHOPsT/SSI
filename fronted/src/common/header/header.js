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
            <div className="text-wrapper-8">GAME CYCLE</div>
            <img className="vector" src={imagenes.vector} alt="Logo" />
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
          <div className="group-4">
            <div className="frame-16">
              <div className="frame-17">
                <div className="frame-18">
                  <img className="group-5" src={imagenes.group} alt="Delivery" />
                  <div className="frame-19">
                    <div className="text-wrapper-10">Delivery</div>
                  </div>
                </div>
                <div className="frame-20">
                  <img className="group-6" src={imagenes.group95} alt="Retornar" />
                  <div className="frame-21">
                    <div className="text-wrapper-11">Retornar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-22">
            <div className="ll-menos-wrapper">
              <div className="ll-menos">Llámenos</div>
            </div>
            <div className="frame-23">
              <img className="headphones-svgrepo" src={imagenes.headphonesSvg} alt="Headphones" />
              <div className="text-wrapper-12">+51 964542293</div>
            </div>
          </div>
          <div className="frame-24">
            <Link to="/historial" >
            <img className="user" src={imagenes.user} alt="User" />
            </Link>
            <div className="frame-25">
              <div className="frame-26" onClick={toggleComprasDropdown}>
                <div className="frame-27">
                  <div className="group-7">
                    <div className="overlap-group-3">
                      <div className="text-wrapper-13">{juegosSeleccionados.reduce((total, juego) => total + juego.cantidad, 0)}</div>
                      <img className="shopping-cart" src={imagenes.shoppingCart} alt="Shopping Cart" />
                    </div>
                  </div>
                </div>
              </div>
              {isComprasDropdownVisible && (
                <div className="dropdown-container">
                  <PagoDesplegableCompras juegosSeleccionados={juegosSeleccionados} onRemoverJuego={onRemoverJuego} />
                </div>
              )}
            </div>
            <Link to="/iniciar-sesion" onClick={handleCerrarSesion}>
              <img className="vector-2" src={imagenes.vector1} alt="Ventas" />
            </Link>
            {/* {isVentasDropdownVisible && (
              <div className="dropdown-container2">
                <PagoDesplegableVentas />
              </div>
            )} */}

            {/*isVentasDropdownVisible && (
              <div className="dropdown-container2">
                <PagoDesplegableVentas />
              </div>
            )*/}
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
              to="/venta-nuevos"
              className={`text-wrapper-16 nav-link ${hoveredLink === 'nuevo' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('nuevo')}
              onMouseLeave={handleMouseLeave}
            >
              Nuevo
            </Link>
            <Link
              to="/venta-usados"
              className={`text-wrapper-17 nav-link ${hoveredLink === 'usado' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('usado')}
              onMouseLeave={handleMouseLeave}
            >
              Usado
            </Link>
            <Link
              to="/venta-codigo"
              className={`text-wrapper-18 nav-link ${hoveredLink === 'vender' ? 'header-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter('vender')}
              onMouseLeave={handleMouseLeave}
            >
              Vender
            </Link>
            <div className="header-overlay" style={{ display: hoveredLink ? 'block' : 'none' }}></div>
          </div>
          <img className="frame-30" src={imagenes.frame118_1} alt="Banner" />
        </div>
      </div>
    </div>
  );
};


export default Header;
