import React, { useEffect, useState } from 'react';
import './globals.css';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/header/header.js';
import axios from 'axios';
import imagenes from './imagenes.js';
import { Card } from 'antd';

const Biblioteca = () => {
    const [libros, setLibros] = useState([]);
    const [genero, setGenero] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(null);
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
        setGenero(e.target.value);
    };

    const handleSearchChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleImageClick = async () => {
        let url = 'http://localhost:3001/libros?';
        if (genero) {
            url += `genero=${genero}&`;
        }
        if (busqueda) {
            url += `nombre=${busqueda}`;
        }
        try {
            const response = await axios.get(url);
            const filteredBooks = response.data.filter(libro => 
              (!genero || libro.genero === genero) && 
              (!busqueda || libro.Nombre.toLowerCase() === busqueda.toLowerCase())
          );
            setLibros(response.data.sort((a, b) => a.Id_Libro - b.Id_Libro));
        } catch (error) {
            setError('Error searching books:', error);
        }
    };

    const handleDownload = async (rutaPdf) => {
        try {
            const response = await axios({
                url: `http://localhost:3001/descargar-pdf/${rutaPdf}`,
                method: 'GET',
                responseType: 'blob', // Indica que la respuesta es un archivo
            });

            // Crear una URL para el archivo descargado
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', rutaPdf.split('/').pop()); // Usar el nombre del archivo
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='venta-usados'>
                <div className='div'>
                    <div className="frame-14">
                        <input 
                            className="buscar-libro" 
                            placeholder="Buscar libro" 
                            value={busqueda} 
                            onChange={handleSearchChange} 
                        />
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
                        </div>
                        <img className="line-5" src={imagenes.line7} alt="Line" />
                        <img className="frame-15" src={imagenes.frame198} alt="Buscar" onClick={handleImageClick} />
                    </div>
                    <div className="libros-grid">
                        {error && <p>{error}</p>}
                        {libros.map(libro => (
                            <div key={libro.Id_Libro} className="libro-item">
                                <div className="libro-card">
                                    <div style={{ background: '#ECECEC', padding: '30px' }}>
                                        <Card title={libro.Nombre} bordered={false}>
                                            {libro.Descripcion}
                                            <button onClick={() => handleDownload(libro.Ruta_pdf)}>
                                                Descargar PDF
                                            </button>
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
