import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './globals.css';
import './style.css';
import imagenes from './imagenes';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Header from '../../common/header/header';
import useCarrito from '../auxiliar';
import CarritoCompras from '../CarritoCompras';

const VentaDatos = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const {
    juegosSeleccionados,
    isDropdownVisible,
    setIsDropdownVisible,
    handleRemoverJuego,
    mostrarCarrito,
    carritoKey
  } = useCarrito();

  useEffect(() => {
    axios.get('http://localhost:3001/categorias')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      image: null,
      title: '',
      description: '',
      price: '',
      release_date: '',
      category_id: '',
      estado_id: 2,
      stock: 1,
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required('Image is required'),
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      price: Yup.number().required('Price is required'),
      release_date: Yup.date().required('Release date is required'),
      category_id: Yup.number().required('Category is required'),
    
    }),
    onSubmit: values => {
      const formData = new FormData();
      const newTitle = `${values.image.name}`;

      formData.append('image', values.image);
      formData.append('title', newTitle);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('release_date', values.release_date);
      formData.append('category_id', values.category_id);
      formData.append('estado_id', values.estado_id); // assuming you have this field
      formData.append('stock', values.stock); // assuming you have this field

      axios.post('http://localhost:3001/configuraciones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Product successfully added', response.data);
        navigate('/venta-final');
      })
      .catch(error => {
        console.error('There was an error uploading the product!', error);
      });
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      formik.setFieldValue('image', file);
    }
  };

  const handleFileInputClick = () => {
    document.getElementById('fileInput').click();
  };

  console.log(formik.values);

  return (
    <div>
     <Header 
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      /> 
    <div className="VENTA-datos">
      <div className="div">
        <div className="main">
          <div className="text-wrapper">DATOS DEL VIDEOJUEGO</div>
          <form onSubmit={formik.handleSubmit}>
            <div className="TITULO">
              <div className="label"><div className="label-2">Título</div></div>
              <input
                className="container"
                name="title"
                placeholder="Título del producto"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.errors.title && <div className="error">{formik.errors.title}</div>}
            </div>
            <div className="div-wrapper">
              <div className="overlap-group">
                <div className="CONSOLA">
                  <div className="label">
                    <div className="label-2">Género</div>
                  </div>
                  <div className="container-2">
                    <select
                      id="category_id"
                      name='category_id'
                      className="text"
                      value={formik.values.category_id}
                      onChange={formik.handleChange}
                    >
                      <option value="" label="Selecciona una categoría" />
                      {categories.map(category => (
                        <option key={category.categoria_id} value={category.categoria_id}>
                          {category.nombre}
                        </option>
                      ))}
                    </select>
                    {formik.errors.category_id && <div className="error">{formik.errors.category_id}</div>}
                  </div>
                </div>
                <img className="ep-arrow-up-bold" src={imagenes.epArrowUpBold} />
              </div>
            </div>
            <div className="div-wrapper">
              <div className="CONSOLA-2">
                <div className="label"><div className="label-2">PRECIO</div></div>
                <input
                  className="input"
                  name="price"
                  placeholder="Precio"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && <div className="error">{formik.errors.price}</div>}
              </div>
            </div>
            <div className="div-wrapper">
              <div className="CONSOLA-2">
                <div className="label"><div className="label-2">DESCRIPCIÓN (OPCIONAL)</div></div>
                <input
                  className="input"
                  name="description"
                  placeholder="Descripción"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && <div className="error">{formik.errors.description}</div>}
              </div>
            </div>
            <div className="div-wrapper">
              <div className="CONSOLA-2">
                <div className="label"><div className="label-2">FECHA DE LANZAMIENTO</div></div>
                <input
                  className="input"
                  name="release_date"
                  type="date"
                  value={formik.values.release_date}
                  onChange={formik.handleChange}
                />
                {formik.errors.release_date && <div className="error">{formik.errors.release_date}</div>}
              </div>
            </div>
            <div className="imagen">
              <div className="overlap">
                <div className="CONSOLA-3">
                  <div className="label"><div className="label-2">Agregar imágenes</div></div>
                </div>
                <img
                  className="vector"
                  src={selectedImage || imagenes.vector}
                  alt="Imagen seleccionada o predeterminada"
                />
              </div>
              <button type="button" className="frame" onClick={handleFileInputClick}>
                <div className="text-wrapper-2">Seleccionar archivo</div>
              </button>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div className="text-wrapper-3">
                {selectedImage ? 'Archivo seleccionado' : 'Ningún archivo seleccionado'}
              </div>
            </div>
            <button type="submit" className="frame-2">
              <div className="text-wrapper-44">VENDER</div>
            </button>
          </form>
        </div>
      </div>
    </div>
    {mostrarCarrito && (
          <CarritoCompras
            key={carritoKey}
            juegosSeleccionados={juegosSeleccionados}
            handleRemoverJuego={handleRemoverJuego}
            isDropdownVisible={isDropdownVisible}
            setIsComprasDropdownVisible={setIsDropdownVisible}
          />
        )}
    </div>
  );
};

export default VentaDatos;