import React, { useEffect, useState } from 'react';
import './globals.css';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/header/header.js';
import axios from 'axios';
import { Card } from 'antd';
import imagenes from './imagenes.js';

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
            setLibros(filteredBooks.sort((a, b) => a.Id_Libro - b.Id_Libro));
        } catch (error) {
            setError('Error searching books:', error);
        }
    };

    const handleDownload = async (rutaPdf) => {
        try {
            const filename = rutaPdf.split('/').pop();
            const response = await axios({
                url: `http://localhost:3001/descargar-pdf/${filename}`,
                method: 'GET',
                responseType: 'blob',
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };
    

    const handleView = (rutaPdf) => {
        const pdfUrl = `http://localhost:3001/descargar-pdf/${rutaPdf.split('/').pop()}`;
        window.open(pdfUrl, '_blank');
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
                        </div>
                        <img className="frame-15" src={imagenes.buscar} alt="Buscar" onClick={handleImageClick} />
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
