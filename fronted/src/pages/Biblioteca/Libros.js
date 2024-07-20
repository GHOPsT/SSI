// Biblioteca.js
import React, { useEffect, useState } from 'react';
import './globals.css';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/header/header.js';
import { Card } from 'antd';
import imagenes from './imagenes.js';
import { fetchLibros, searchLibros } from '../../Logica/Libros/catalogService.js';
import { downloadPdf, viewPdf } from '../../Logica/Libros/fileService.js';

const Biblioteca = () => {
  const [libros, setLibros] = useState([]);
  const [genero, setGenero] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLibros = async () => {
      try {
        const data = await fetchLibros();
        setLibros(data);
      } catch (error) {
        setError(error.message);
      }
    };
    loadLibros();
  }, []);

  const handleCategoryChange = (e) => {
    setGenero(e.target.value);
  };

  const handleSearchChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleImageClick = async () => {
    try {
      const data = await searchLibros(genero, busqueda);
      const filteredBooks = data.filter(libro =>
        (!genero || libro.genero === genero) &&
        (!busqueda || libro.Nombre.toLowerCase() === busqueda.toLowerCase())
      );
      setLibros(filteredBooks.sort((a, b) => a.Id_Libro - b.Id_Libro));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownload = async (rutaPdf) => {
    try {
      await downloadPdf(rutaPdf);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleView = (rutaPdf) => {
    try {
      viewPdf(rutaPdf);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className='venta-usados'>
        <div className='div'>
          <div className="frame-14">
            <div className="overlap-group-2">
              <select
                id="genero"
                name="genero"
                className="text-wrapper-9"
                value={genero}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>Selecciona un género</option>
                <option value="Ficcion">Ficción</option>
                <option value="No ficcion">No ficción</option>
              </select>
              <img className="frame-15" src={imagenes.buscar} alt="Buscar" onClick={handleImageClick} />
            </div>
          </div>
          <div className="libros-grid">
            {error && <p>{error}</p>}
            {libros.map(libro => (
              <div key={libro.Id_Libro} className="libro-item">
                <div className="libro-card">
                  <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Card title={libro.Nombre} bordered={false}>
                      {libro.Descripcion}
                      <div>
                        <button onClick={() => handleDownload(libro.Ruta_pdf)}>Descargar PDF</button>
                        <button onClick={() => handleView(libro.Ruta_pdf)}>Ver PDF</button>
                      </div>
                    </Card>
                  </div>
                  <img src={libro.Imagen} alt={libro.Nombre} />
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
