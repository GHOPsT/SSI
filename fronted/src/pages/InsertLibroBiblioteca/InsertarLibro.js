// InsertarLibro.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import { subirLibro } from '../../Logica/Libros/bookService.js'; // Importa la función desde bookService

const InsertarLibro = () => {
  const [nombre, setNombre] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [anioPublicacion, setAnioPublicacion] = useState('');
  const [editorial, setEditorial] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [genero, setGenero] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [cantidad, setCantidad] = useState(1);
  const [imagen, setImagen] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleLibroSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Nombre', nombre);
    formData.append('Autor', autor);
    formData.append('ISBN', isbn);
    formData.append('Anio_publicacion', anioPublicacion);
    formData.append('Editorial', editorial);
    formData.append('Descripcion', descripcion);
    formData.append('Genero', genero);
    formData.append('Estado', estado);
    formData.append('Cantidad', cantidad);
    formData.append('Imagen', imagen);
    formData.append('Pdf', pdf);

    try {
      const data = await subirLibro(formData);
      console.log('Libro subido con éxito:', data);
      // Puedes mostrar un mensaje de éxito o redirigir al usuario aquí
    } catch (error) {
      console.error('Error al subir el libro:', error);
      // Manejar el error, mostrar mensaje al usuario, etc.
    }
  };

  return (
    <div>
      <Header />

      <div className="pago-con-tarjeta">
        <div className="frame-14">
          <div className='regresar'>
            <Link to="/perfil" className="boton">Regresar</Link>
          </div>

          <div className="text-wrapper-14">Añadir Nuevo Libro</div>
          <form onSubmit={handleLibroSubmit} className="frame-6">
            <div className="frame-5">
              <div className="frame-6">
                <div className="text-wrapper-16">Nombre</div>
                <input
                  className="element"
                  placeholder="Nombre del libro"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Autor</div>
                <input
                  className="element"
                  placeholder="Autor del libro"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">ISBN</div>
                <input
                  className="element"
                  placeholder="ISBN del libro"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Año de Publicación</div>
                <input
                  className="element"
                  placeholder="Año de publicación"
                  type="number"
                  value={anioPublicacion}
                  onChange={(e) => setAnioPublicacion(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Editorial</div>
                <input
                  className="element"
                  placeholder="Editorial del libro"
                  value={editorial}
                  onChange={(e) => setEditorial(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Descripción</div>
                <textarea
                  className="element"
                  placeholder="Descripción del libro"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Género</div>
                <input
                  className="element"
                  placeholder="Género del libro"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Estado</div>
                <select
                  className="element"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Prestado">Prestado</option>
                  <option value="En reparación">En reparación</option>
                </select>
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Cantidad</div>
                <input
                  className="element"
                  placeholder="Cantidad de libros"
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">Imagen</div>
                <input
                  className="element"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagen(e.target.files[0])}
                  required
                />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-16">PDF</div>
                <input
                  className="element"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                  required
                />
              </div>
              <div className='guardar'>
                <button type="submit" className="boton">Guardar Libro</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsertarLibro;
