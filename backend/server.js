const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ux',
});


DB.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/registrarse', (req, res) => {
  const { nombre_usuario, correo, contrasena, apellido } = req.body;
  console.log('Datos recibidos:', req.body);

  const SQL = 'INSERT INTO usuarios (nombre_usuario, contrasena, correo, apellido) VALUES (?, ?, ?, ?)';
  const values = [nombre_usuario, contrasena, correo, apellido];

  DB.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    console.log('Usuario registrado correctamente:', result);
    res.json({ message: 'Usuario registrado correctamente' });
  });
});

app.post('/iniciar-sesion', (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  console.log('Datos recibidos:', req.body);

  const SQL = 'SELECT nombre_usuario, contrasena FROM usuarios WHERE nombre_usuario = ? AND contrasena = ?';
  const values = [nombre_usuario, contrasena];

  DB.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    if (result.length > 0) {
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
  });
});

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const filename = `${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Ruta para guardar los datos del formulario y la imagen
app.post('/configuraciones', upload.single('image'), (req, res) => {
  const { title, description, price, release_date, category_id, stock } = req.body;
  const image = req.file.filename;
  const currentDate = new Date().toISOString().slice(0, 10);
  const newTitle = `${title}`;

  const SQL = 'INSERT INTO juegos (titulo, descripcion, precio, fecha_lanzamiento, categoria_id, stock, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  const values = [newTitle, description, price, release_date, category_id, stock];

  DB.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json({ message: 'Product successfully added', image });
  });
});

// Ruta para obtener las categorías
app.get('/categorias', (req, res) => {
  const SQL = 'SELECT categoria_id, nombre FROM categorias';
  DB.query(SQL, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  });
});


// Ruta para obtener los datos de los juegos y enviarlos a la ruta /venta-nuevos 
app.get('/venta-nuevos', (req, res) => {
  const SQL = 'SELECT * FROM juegos';
  DB.query(SQL, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(rows);
  });
});

// Servir imágenes desde el directorio de imágenes
app.use('/venta-nuevos', express.static('../uploads'));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
