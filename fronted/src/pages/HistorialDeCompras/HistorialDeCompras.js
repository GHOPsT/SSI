import React, {useEffect} from 'react';
import './globals.css';
import './style.css';
import imagenes from "./imagenes";
import axios from 'axios';
import { useState } from 'react';
import Header from '../../common/header/header.js';
import GuardarUsuario from '../IniciarSesion/UsuarioGuardado.js';

const HistorialDeCompras = () => {
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [historialCompras, setHistorialCompras] = useState([]);
  const usuario_id = GuardarUsuario();

  useEffect(() => {
    const fetchHistorialDeCompras = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/historial/${usuario_id}`);
        setHistorialCompras(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchHistorialDeCompras();
  }, [usuario_id]);
  
  console.log(historialCompras);
  console.log(usuario_id);

  const handleRemoverJuego = (juegoId) => {
    const juegoExistente = juegosSeleccionados.find(juego => juego.juego_id === juegoId);
    let nuevosJuegosSeleccionados;
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
  }
  const actualizarJuegosSeleccionados = (juegosSeleccionados) => {
    axios.post('http://localhost:3001/juegos-seleccionados', juegosSeleccionados)
      .then(response => console.log('Selected games updated successfully:', response))
      .catch(error => console.error('Error updating selected games:', error));
  };
  

  
  return (
    <div>
    <Header
      juegosSeleccionados={juegosSeleccionados}
      onRemoverJuego={handleRemoverJuego}
      isComprasDropdownVisible={isDropdownVisible}
      setIsComprasDropdownVisible={setIsDropdownVisible}
    />
    <div className="historial-de-compras">
      <div className="div">
        <img className="line" src={imagenes.line4} alt="linea 4" />
        <img className="img" src={imagenes.line5} alt="linea 5" />
        <div className="text-wrapper">Historial de compras</div>
        <div className="historial">
          <div className="navbar-2">
            <div className="videojuegos">VIDEOJUEGOS</div>
            <div className="text-wrapper-18">FECHA</div>
            <div className="text-wrapper-18">PRECIO TOTAL</div>
            <div className="tipo-de-pago">TIPO DE PAGO</div>
          </div>
          <div className="products">
            {historialCompras.map((compra, index) => (
              <div className="product" key={index}>
                <div className="product-2">
                  <p className="p">{compra.titulo} - {compra.categoria} - {compra.estado}</p>
                </div>
                <div className="frame-28"><div className="text-wrapper-19">{new Date(compra.fecha).toLocaleDateString()}</div></div>
                <div className="text-wrapper-20">S/ {compra.precio}</div>
                <div className="frame-28"><div className="text-wrapper-19">{compra.tipo_pago}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default HistorialDeCompras;
