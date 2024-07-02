// src/pages/IniciarSesion/IniciarSesion.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import imagenes from './imagenes';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import GuardarUsuario from '../IniciarSesion/UsuarioGuardado.js';
import useCarrito from '../auxiliar.js';
import axios from 'axios';


const PagoConTarjetas = () => {
  const {
    juegosSeleccionados,
    isDropdownVisible,
    setIsDropdownVisible,
    mostrarCarrito,
    carritoKey,
    handleRemoverJuego
  } = useCarrito();

  console.log(juegosSeleccionados);

  const precioTotal = juegosSeleccionados.reduce((total, juego) => total + juego.precio * juego.cantidad, 0);

  const handleCompraExitosa = async () => {
    try {
      const usuario_id = GuardarUsuario(); // Obtener usuario_id del localStorage o donde lo tengas almacenado
      console.log(usuario_id);
      const response = await axios.post('http://localhost:3001/guardar-compra', {
        usuario_id,
        juegosSeleccionados,
        precioTotal
      });

      console.log(response.data); // Mensaje de éxito desde el backend
      axios.delete('http://localhost:3001/juegos-seleccionados')
        .then(response => console.log(response.data))
        .catch(error => console.error('Error deleting selected games:', error));

      // Redirigir o hacer otras acciones después de guardar la compra
    } catch (error) {
      console.error('Error al guardar la compra:', error);
      // Manejar el error, mostrar mensaje al usuario, etc.
    }
  };
  
  return (
    <div>
      <Header
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      />

    <div class="pago-con-tarjeta">
      <div class="div">
        <div class="overlap">
          <div class="overlap-group">
            <div class="order-summary">
              <div class="frame">
                <div class="frame-2">
                  <div class="text-wrapper">Resumen</div>
                  <img class="line" src={imagenes.line4} />
                </div>
                <div class="frame-3">
                  <img class="img" src={imagenes.line4} />
                  <div class="frame-4">
                    <input class="cdigo-de-promocin" placeholder="Codigo de promocion" />
                    <div class="div-wrapper"><div class="text-wrapper-2">Aplicar</div></div>
                  </div>
                </div>
                <div class="frame-5">
                  <img class="img" src={imagenes.line4} />
                  <div class="frame-6">
                    <div class="frame-7">
                      <div class="text-wrapper-3">Subtotal</div>
                      <div class="text-wrapper-4">{precioTotal}</div>
                    </div>
                    <div class="frame-7">
                      <div class="text-wrapper-5">Descuento</div>
                      <div class="text-wrapper-4">{precioTotal*0.2}</div>
                    </div>
                    <div class="frame-7">
                      <div class="text-wrapper-5">Delivery</div>
                      <div class="text-wrapper-4">S/ 20</div>
                    </div>
                  </div>
                </div>
                <div class="frame-8"></div>
                <div class="frame-5">
                  <img class="img" src={imagenes.line4} />
                  <div class="frame-9">
                    <div class="frame-10">
                      <div class="text-wrapper-6">Total</div>
                      <div class="text-wrapper-7">Cantidad a pagar:</div>
                    </div>
                    <div class="text-wrapper-8">{precioTotal *0.8 + 20}</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div class="frame-14">
            <div class="frame-2">
              <div class="text-wrapper-14">Pago</div>
              <img class="line" src={imagenes.line4} />
            </div>
            <div class="frame-6">
              <div class="text-wrapper-15">Pagar con:</div>
              <div class="card-wrapper">
                <div class="card">
                  <div class="overlap-group-wrapper">
                    <div class="overlap-group-2">
                      <input type="checkbox" className="ellipse"/>
                    </div>
                  </div>
                  <div class="card-2">Tarjeta</div>
                </div>
              </div>
            </div>
            <div class="frame-6">
              <div class="frame-5">
                <div class="frame-6">
                  <div class="text-wrapper-16">Número de tarjeta</div>
                  <input class="element" placeholder="1234 5678 9101 1101"/>
                </div>
                <div class="frame-15">
                  <div class="frame-6">
                    <div for="caducidad" class="text-wrapper-16">Fecha de caducidad</div>
                    <input type="month" id="caducidad" class="frame-16"/>
                  </div>
                  <div class="frame-6">
                    <div class="text-wrapper-16">CVV</div>
                    <input class="element-wrapper" placeholder="123" />
                  </div>
                </div>
                <div class="save-card-details">
                <input type="checkbox" className="frame-17" />
                  <div class="save-card-details-2">Guardar datos</div>
                </div>
              </div>
            </div>
            <div class="frame-18">
              <Link to="/compra-exitosa" class="pay" onClick={handleCompraExitosa}><div class="pay-usd">S/ {precioTotal *0.8 + 20}</div></Link>
              <img class="vector" src={imagenes.vector1} />
              <p class="p">
                Sus datos personales se utilizarán para procesar su pedido, respaldar su experiencia en este sitio web y
                para otros fines descritos en nuestra política de privacidad.
              </p>
            </div>
          </div>
        </div>
        
      </div>

    </div>
    </div>
  );
};

export default PagoConTarjetas;
