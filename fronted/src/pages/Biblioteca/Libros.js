import React, { useEffect, useState } from 'react';
import './globals.css';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/header/header.js';
import axios from 'axios';
import CarritoCompras from '../CarritoCompras.js';
import imagenes from './imagenes.js';
import { Card, Col, Row } from 'antd';


const Biblioteca = () => {
    const [libros, setLibros] = useState([]);
    const [genero, setGenero] = useState('');
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchLibros();
    }, []);
  
    const fetchLibros = async () => {
      try {
        const response = await axios.get('http://localhost:3001/libros');
        setLibros(response.data);
      } catch (error) {
        setError('Error fetching books:', error);
      }
    };

    const handleCategoryChange = (e) => {
      const categoryId = e.target.value;
      setSelectedCategory(categoryId);
    };
  
    const handleImageClick = () => {
      if (selectedCategory) {
        navigate('');
      } else {
        alert('Por favor, selecciona una categoría primero');
      }
    };


    const handleSearch = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:3001/libros?genero=${genero}`);
        setLibros(response.data);
      } catch (error) {
        setError('Error searching books:', error);
      }
    };

    return (
      <div>
        <Header />
        <div className='venta-usados'>
          <div className='div'>
            <div className="frame-14">
              <input className="buscar-libro" placeholder="Buscar libro" />
              <div className="overlap-group-2">
                <select
                  id="genero"
                  name="genero"
                  className="text-wrapper-9"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled>Selecciona un género</option>
                </select>
              </div>
              <img className="line-5" src={imagenes.line7} alt="Line" />
              <img className="frame-15" src={imagenes.frame198} alt="Buscar" onClick={handleImageClick} />
            </div>
            <div className="libros-grid">
              {error && <p>{error}</p>}
              {libros.map(libro => (
                <div key={libro.Id_Libro} className="libro-item">
                  <div className="libro-card">
                    <img
                      src={`http://localhost:3001/uploads/${libro.Nombre}.jpg`}
                      alt={libro.Nombre}
                      className="libro-imagen"
                      onError={(e) => e.target.src = 'http://localhost:3001/uploads/default.jpg'} // Default image
                    />
                    <h3>{libro.Nombre}</h3>
                      <div style={{ background: '#ECECEC', padding: '30px' }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Card title="Card title" bordered={false}>Card content</Card>
                          </Col>
                          <Col span={8}>
                            <Card title="Card title" bordered={false}>Card content</Card>
                          </Col>
                          <Col span={8}>
                            <Card title="Card title" bordered={false}>Card content</Card>
                          </Col>
                        </Row>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Biblioteca;
