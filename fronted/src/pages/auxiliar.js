import { useState, useEffect } from 'react';
import axios from 'axios';

const useCarrito = () => {
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [carritoKey, setCarritoKey] = useState(0);

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
    setMostrarCarrito(true);
    setCarritoKey(prevKey => prevKey + 1);
  };

  const handleAgregarJuego = (juegoId) => {
    eliminarJuegos();
    const nuevosJuegosSeleccionados = juegosSeleccionados.map(juego =>
      juego.juego_id === juegoId ? { ...juego, cantidad: juego.cantidad + 1 } : juego
    );

    setJuegosSeleccionados(nuevosJuegosSeleccionados);
    actualizarJuegosSeleccionados(nuevosJuegosSeleccionados);
    setCarritoKey(prevKey => prevKey + 1);
  };

  const actualizarJuegosSeleccionados = (juegosSeleccionados) => {
    axios.post('http://localhost:3001/juegos-seleccionados', juegosSeleccionados)
      .then(response => console.log('Selected games updated successfully:', response))
      .catch(error => console.error('Error updating selected games:', error));
  };

  const eliminarJuegos = () => {
    axios.delete('http://localhost:3001/juegos-seleccionados')
      .then(response => console.log(response.data))
      .catch(error => console.error('Error deleting selected games:', error));
    setJuegosSeleccionados([]);
  };

  return {
    juegosSeleccionados,
    isDropdownVisible,
    setIsDropdownVisible,
    mostrarCarrito,
    carritoKey,
    handleRemoverJuego,
    handleAgregarJuego,
  };
};

export default useCarrito;
