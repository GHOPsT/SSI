import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './globals.css';
import './style.css';
import imagenes from "./imagenes";

const Inicio = () => {
  return (
    <div className="inicio">
      <div className="div">
        <div className="mask-group">
          <Carousel showThumbs={false} showArrows={false} autoPlay infiniteLoop>
            <div>
              <img className="frame" src={imagenes.frame303} alt="" />
            </div>
            <div>
              <img className="frame" src={imagenes.slide2} alt="" />
            </div>
            <div>
              <img className="frame" src={imagenes.slide3} alt="" />
            </div>
          </Carousel>
        </div>
        <div className="overlap">
          <img className="group" src={imagenes.group72} alt="" />
          <Link to={"/venta-nuevos"} >
            <img className="img" src={imagenes.frame282} alt="" />
          </Link>
          <img className="line" src={imagenes.line8} alt="" />
          <div className="frame-2">
            <div className="frame-3">
              <Carousel showThumbs={false} showArrows={true} autoPlay infiniteLoop showIndicators={false}>
                <div>
                  <img className='frame' src={imagenes.slide4} alt='' />
                  <div className="button-md"><div className="btn-text">Ver más</div></div>
                </div>
                <div>
                  <img className='frame' src={imagenes.slide5} alt='' />
                  <div className="button-md"><div className="btn-text">Ver más</div></div>
                </div>
                <div>
                  <img className='frame' src={imagenes.slide6} alt='' />
                  <div className="button-md"><div className="btn-text">Ver más</div></div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
