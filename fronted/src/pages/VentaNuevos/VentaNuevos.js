import React, { useEffect, useState } from 'react';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import axios from 'axios';
import imagenes from './imagenes.js';
import { Link } from 'react-router-dom';
import { ObtenerUsuario } from '../IniciarSesion/UsuarioGuardado.js';
import CarritoCompras from '../CarritoCompras';

const NuevosJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [error, setError] = useState(null);
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [carritoKey, setCarritoKey] = useState(0); 

  useEffect(() => {
    fetch('http://localhost:3001/venta-nuevos')
      .then(response => response.json())
      .then(data => setJuegos(data))
      .catch(error => setError('Error fetching used games:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/juegos-seleccionados')
      .then(response => setJuegosSeleccionados(response.data))
      .catch(error => console.error('Error fetching selected games:', error));
  }, []);

  const handleRemoverJuego = (juegoId) => {
    const juegoExistente = juegosSeleccionados.find(juego => juego.juego_id === juegoId);
    let nuevosJuegosSeleccionados;
    eliminarJuegos();
    if (juegoExistente.cantidad > 1) {
      nuevosJuegosSeleccionados = juegosSeleccionados.map(juego =>
        juego.juego_id === juegoId ? { ...juego, cantidad: juego.cantidad - 1 } : juego
      );
    } else {
      nuevosJuegosSeleccionados = juegosSeleccionados.filter(juego => juego.juego_id !== juegoId);
      setIsDropdownVisible(nuevosJuegosSeleccionados.length > 0);
    }
    setJuegosSeleccionados(nuevosJuegosSeleccionados);
    actualizarJuegosSeleccionados(nuevosJuegosSeleccionados);
    setIsDropdownVisible(true);
    setMostrarCarrito(true);  // Actualiza el estado para mostrar el carrito
    setCarritoKey(prevKey => prevKey + 1); // Incrementa la clave del carrito para forzar re-render
  };

  const PerfilUsuario = () => {
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
      const fetchUserData = async () => {
        const ID_Usuario = ObtenerUsuario();
        if (!ID_Usuario) {
          console.error('Usuario no encontrado');
          return;
        }
        try {
          const response = await fetch(`http://localhost:3001/perfil/${ID_Usuario}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

  return (
    <div>
      <Header
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      />
      <div className='venta-usados'>
        <div className='div'>
          <div className='frame'>
            <div className="perfil-usuario">
              <div className="perfil-icono">
                <img src={imagenes.perfil} alt="User Icon" />
              </div>
              <div className="perfil-detalles">
                <div><strong>Nombre:</strong> {userData.Nombre}</div>
                <div><strong>Apellido:</strong> {userData.Apellido}</div>
                <div><strong>Email:</strong> {userData.Email}</div>
              </div>
           </div>
          </div>
        </div>
      </div>
      {mostrarCarrito && (
        <CarritoCompras
          key={carritoKey} // Clave dinámica para forzar re-render
          juegosSeleccionados={juegosSeleccionados}
          handleRemoverJuego={handleRemoverJuego}
          isDropdownVisible={isDropdownVisible}
          setIsComprasDropdownVisible={setIsDropdownVisible}
        />
      )}
    </div>
  );

export default NuevosJuegos;
