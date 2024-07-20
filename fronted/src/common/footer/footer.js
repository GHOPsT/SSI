import React from 'react';
import './globals.css';
import './style.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="frame-wrapper">
        <div className="frame-4">
          <div className="div-wrapper">
            <div className="frame-5">
              <div className="frame-6">
                <p className="RESEARCH">
                  <span className="text-wrapper-2">¿Alguna pregunta? Llámenos 24/7</span>
                  <span className="text-wrapper-3">&nbsp;</span>
                </p>
                <p className="stratus-RESEARCH">999 888 777<br />999 666 555</p>
                <p className="cont-ctenos">
                  <span className="text-wrapper-2">Contáctenos<br /></span>
                  <span className="text-wrapper-4">siire@gmail.com</span>
                </p>
              </div>
              <div className="frame-10">
                <div className="text-wrapper-5">Información</div>
                <div className="frame-9">
                  <div className="text-wrapper-6">Sobre nosotros</div>
                  <div className="text-wrapper-7">Contactenos</div>
                  <div className="text-wrapper-7">FAQs</div>
                  <div className="text-wrapper-7">Políticas</div>
                  <div className="text-wrapper-7">Terminos y condiciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="element-e">©2024 Sistema Integral de Información y Recursos Educativos</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
