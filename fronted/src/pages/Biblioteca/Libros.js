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
    const [generos, setGeneros] = useState('');
    const [error, setError] = useState(null);
    const [selectedGenero, setSelectedGenero] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchLibros();
      fetchGeneros();
    }, []);
  
    const fetchLibros = async () => {
      try {
        const response = await axios.get('http://localhost:3001/libros');
        setLibros(response.data);
      } catch (error) {
        setError('Error fetching books:', error);
      }
    };

    const fetchGeneros = async () => {
      try {
        const response = await axios.get('http://localhost:3001/generos');
        setGeneros(response.data);
      } catch (error) {
        setError('Error fetching genres:', error);
      }
    };

    const handleSearch = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:3001/libros?genero=${generos}`);
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
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Buscar libro"
              className="search-input"
            />
            <select
              id="genero"
              name="genero"
              className="text-wrapper-9"
              value={selectedGenero}
              onChange={(e) => setSelectedGenero(e.target.value)}
            >
              <option value="">Selecciona un género</option>
              {generos.map((genero, index) => (
                <option key={index} value={genero.Genero}>
                  {genero.Genero}
                </option>
              ))}
            </select>
            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>
            <div className="frame-14">
              <input className="buscar-libro" placeholder="Buscar libro" />
              <div className="overlap-group-2">
                <select
                  id="genero"
                  name="genero"
                  className="text-wrapper-9"
                  value={selectedGenero}
                  onChange={(e) => setSelectedGenero(e.target.value)}
                >
                  <option value="">Selecciona un género</option>
                    {generos.map((genero, index) => (
                      <option key={index} value={genero.Genero}>
                        {genero.Genero}
                  </option>
                    ))}
                </select>
              </div>  
              <img className="frame-15" src={imagenes.frame198} alt="Buscar"/>
            </div>
            <div className="libros-grid">
              {error && <p>{error}</p>}
              {libros.map(libro => (
                <div key={libro.Id_Libro} className="libro-item">
                  <div className="libro-card">
                      <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Card title={libro.Nombre} bordered={false}>
                              {libro.Descripcion}
                            </Card>
                      </div>
                      <img src={`http://localhost:3001/uploads/${libro.Imagen}`} alt={libro.Nombre} />

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
