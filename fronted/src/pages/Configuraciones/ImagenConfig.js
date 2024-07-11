import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImagenConfig = () => {
  const [categories, setCategories] = useState([]);
  const [estados, setEstados] = useState([]);  // Nuevo estado para los estados

  useEffect(() => {
    axios.get('http://localhost:3001/categorias')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    axios.get('http://localhost:3001/estados')  // Nueva llamada para obtener los estados
      .then(response => {
        setEstados(response.data);
      })
      .catch(error => {
        console.error('Error fetching estados:', error);
      });
  }, []);

  const initialValues = {
    image: null,
    title: '',
    description: '',
    price: '',
    release_date: '',
    category_id: '',
    stock: '',
    estado_id: ''  // Nuevo campo para estado
  };

  const validationSchema = Yup.object({
    image: Yup.mixed().required('Image is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    release_date: Yup.date().required('Release date is required'),
    category_id: Yup.number().required('Category is required'),
    stock: Yup.number().required('Stock is required'),
    estado_id: Yup.string().required('Estado is required')  // Validación para estado
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append('image', values.image);
    const currentDate = new Date().toISOString().slice(0, 10);
    const newTitle = `${values.image.name}`;
    formData.append('title', newTitle);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('release_date', values.release_date);
    formData.append('category_id', values.category_id);
    formData.append('stock', values.stock);
    formData.append('estado_id', values.estado_id);  // Añadido estado_id

    axios.post('http://localhost:3001/configuraciones', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Product successfully added', response.data);
    })
    .catch(error => {
      console.error('There was an error uploading the product!', error);
    });

    console.log('Form data:', values);
  };

  return (
    <div className="container mt-5">
      <h2>Add New Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
              />
              <ErrorMessage name="image" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                className="form-control"
              />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="form-control"
              />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <Field
                type="number"
                id="price"
                name="price"
                className="form-control"
              />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="release_date">Release Date</label>
              <Field
                type="date"
                id="release_date"
                name="release_date"
                className="form-control"
              />
              <ErrorMessage name="release_date" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="category_id">Category</label>
              <Field
                as="select"
                id="category_id"
                name="category_id"
                className="form-control"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.categoria_id} value={category.categoria_id}>
                    {category.nombre}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category_id" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="estado_id">Estado</label>
              <Field
                as="select"
                id="estado_id"  // Campo para estado
                name="estado_id"  // Campo para estado
                className="form-control"
              >
                <option value="">Select Estado</option>
                {estados.map(estado => (
                  <option key={estado.estado_id} value={estado.estado_id}>
                    {estado.nombre}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="estado_id" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <Field
                type="number"
                id="stock"
                name="stock"
                className="form-control"
              />
              <ErrorMessage name="stock" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImagenConfig;
