import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import imagenes from './imagenes';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import useCarrito from '../auxiliar.js';
import CarritoCompras from '../CarritoCompras.js';

const DetalleProducto = () => {
  const { juego_id } = useParams();
  const [juego, setJuego] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [error, setError] = useState(null);

  const {
    juegosSeleccionados,
    isDropdownVisible,
    setIsDropdownVisible,
    handleRemoverJuego,
    mostrarCarrito,
    carritoKey
  } = useCarrito();
  
  useEffect(() => {
    const fetchJuego = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/detalle-producto/${juego_id}`);
        setJuego(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setError('Error fetching game details');
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchEstados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/estados');
        setEstados(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchJuego();
    fetchCategorias();
    fetchEstados();
  }, [juego_id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!juego) {
    return <p>Cargando...</p>;
  }

  // Encuentra el nombre de la categoría y el estado
  const categoriaNombre = categorias.find(cat => cat.categoria_id === juego.categoria_id)?.nombre;
  const estadoNombre = estados.find(est => est.estado_id === juego.estado_id)?.nombre;

  console.log(juego);
  return (
    <div>
      <Header
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      />
    <div className="detalle-del-producto">

      <div className="div">
        <div className="frame">
          <div className="div-wrapper2"><div className="text-wrapper">{categoriaNombre}</div></div>
        </div>
        <Link to="/carrito-compras" className="frame-222"><div className="text-wrapper-222">Añadir al carro</div></Link>
        <div className="text-wrapper-52">{juego.titulo}</div>
        <div className="frame-52">
          <div className="text-wrapper-6">S/{juego.precio}</div>
        </div>
        <div className="text-wrapper-82">Estado: {estadoNombre}</div>
        <p className="p2">
          {juego.descripcion}
        </p>
        <div className="frame-62">
          <div className="frame-7">
            <img className="star" src={imagenes.starL} alt="star-1" />
            <img className="star" src={imagenes.star2} alt="star-2" />
            <img className="star" src={imagenes.star3} alt="star-3" />
            <img className="star" src={imagenes.star4} alt="star-4" />
            <img className="star-2" src={imagenes.star5} alt="star-5" />
          </div>
          <p className="element"><span className="span">4.5/</span> <span className="text-wrapper-10">5</span></p>
        </div>
        <div className="text-wrapper-92">Géneros</div>
        <img className="img2" src={`http://localhost:3001/uploads/${juego.titulo}`} alt={juego.titulo} />
        <div className="frame-6">
          <div className="frame-7">
          </div>
        </div>
      </div>
      <img className="line22" src={imagenes.line3} alt="line-3" />
      <img className="line-22" src={imagenes.line3} alt="line-3" />
      <img className="line-32" src={imagenes.line3} alt="line-3" />
    </div>
    {mostrarCarrito && (
          <CarritoCompras
            key={carritoKey}
            juegosSeleccionados={juegosSeleccionados}
            handleRemoverJuego={handleRemoverJuego}
            isDropdownVisible={isDropdownVisible}
            setIsComprasDropdownVisible={setIsDropdownVisible}
          />
      )}
    </div>
  );
};

export default DetalleProducto;
