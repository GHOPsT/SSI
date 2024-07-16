const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const port = 3001;

const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'siire',
});

DB.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/registrarse', (req, res) => {
  const { ID_Usuario, Contrasenia, Nombre, Apellido, Email} = req.body;
  const role = 'Estudiante';
  console.log('Datos recibidos:', req.body);
  const query = 'INSERT INTO usuarios (ID_Usuario, Contrasenia, Nombre, Apellido, Email, role) VALUES (?, ?, ?, ?, ?, ?)';
  
  const values = [ID_Usuario, Contrasenia, Nombre, Apellido, Email, role];

  DB.query(query, values, (err, result) => {
    if (err) {
      console.error('Error Registrando usuario:', err);
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

  const SQL = 'SELECT usuario_id FROM usuarios WHERE nombre_usuario = ? AND contrasena = ?';
  const values = [nombre_usuario, contrasena];

  DB.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    if (result.length > 0) {
      const usuario_id = result[0].usuario_id; // Obtener el usuario_id si existe
      res.json({ usuario_id }); // Devolver el usuario_id
    } else {
      res.json({ usuario_id: false }); // Devolver false si no se encontró coincidencia
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
  const { title, description, price, release_date, category_id, stock, estado_id } = req.body;
  const image = req.file.filename;
  const currentDate = new Date().toISOString().slice(0, 10);
  const newTitle = `${title}`;


  const getStockQuery = 'SELECT stock FROM juegos WHERE titulo = ?';
  DB.query(getStockQuery, [newTitle], (err, result) => {
    if (err) {
      console.error('Error fetching stock:', err);
      res.status(500).json({ error: 'Error fetching stock' });
      return;
    }

    let currentStock = 0;
    if (result.length > 0) {
      currentStock = result[0].stock;
    }
    const updatedStock = currentStock + 1;

  const SQL = 'INSERT INTO juegos (titulo, descripcion, precio, fecha_lanzamiento, categoria_id, stock, fecha_creacion, estado_id) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)';
  const values = [newTitle, description, price, release_date, category_id, stock, estado_id];

  DB.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json({ message: 'Product successfully added', image });
  });
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

app.get('/estados', (req, res) => {
  const SQL = 'SELECT estado_id, nombre FROM estado';
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
  const SQL = 'SELECT * FROM juegos WHERE estado_id = 1';
  DB.query(SQL, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(rows);
  });
});

app.get('/venta-usados', (req, res) => {
  const SQL = 'SELECT * FROM juegos WHERE estado_id = 2';
  DB.query(SQL, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    console.log("Hola")
    res.json(rows);
  });
});
 
app.get('/juegos-por-categoria', (req, res) => {
  const categoriaId = req.query.categoria_id;

  if (!categoriaId) {
    res.status(400).json({ error: 'Falta categoria_id en la consulta' });
    return;
  }

  const SQL = 'SELECT * FROM juegos WHERE categoria_id = ?';
  DB.query(SQL, [categoriaId], (err, rows) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(rows);
  });
});

app.get('/detalle-producto/:juego_id', (req, res) => {
  const { juego_id } = req.params;

  const SQL = 'SELECT * FROM juegos WHERE juego_id = ?';
  DB.query(SQL, [juego_id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Juego no encontrado' });
      return;
    }
    res.json(result[0]);
  });
});

// Ruta para obtener el título y el precio de un juego específico por su ID
app.get('/juego-detalle/:juego_id', (req, res) => {
  const { juego_id } = req.params;

  const SQL = 'SELECT titulo, precio FROM juegos WHERE juego_id = ?';
  DB.query(SQL, [juego_id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Juego no encontrado' });
      return;
    }
    const juegoDetalle = result[0];
    res.json(juegoDetalle);
  });
});

const filePath = path.join(__dirname, 'juegos-seleccionados.json');

app.get('/juegos-seleccionados', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          return res.status(500).send('Error reading file');
      }
      try {
          const juegosExistentes = data ? JSON.parse(data) : [];
          res.json(juegosExistentes);
      } catch (err) {
          res.status(500).send('Error parsing JSON data');
      }
  });
});

// Endpoint para actualizar los juegos seleccionados
app.post('/juegos-seleccionados', (req, res) => {

  const nuevosJuegosSeleccionados = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          return res.status(500).send('Error reading file');
      }
      try {
          const juegosExistentes = data ? JSON.parse(data) : [];
          const juegosActualizados = [...juegosExistentes, ...nuevosJuegosSeleccionados];

          fs.writeFile(filePath, JSON.stringify(juegosActualizados, null, 2), (err) => {
              if (err) {
                  return res.status(500).send('Error writing file');
              }
              res.send('Juegos seleccionados actualizados');
          });
      } catch (err) {
          res.status(500).send('Error parsing JSON data');
      }
  });
});

// Endpoint para eliminar todos los datos del archivo JSON
app.delete('/juegos-seleccionados', (req, res) => {
  fs.writeFile(filePath, '', (err) => {
      if (err) {
          return res.status(500).send('Error writing file');
      }
      res.send('Juegos seleccionados eliminados');
  });
});


// Endpoint para guardar la compra
app.post('/guardar-compra', (req, res) => {
  const { usuario_id, juegosSeleccionados, precioTotal } = req.body;

  const SQLPedido = 'INSERT INTO Pedido (usuario_id) VALUES (?)';
  DB.query(SQLPedido, [usuario_id], (err, resultPedido) => {
    if (err) {
      console.error('Error al insertar pedido:', err);
      res.status(500).json({ error: 'Error al guardar la compra' });
      return;
    }

    const pedido_id = resultPedido.insertId;

    const detalles = juegosSeleccionados.map(juego => [pedido_id, juego.juego_id, juego.cantidad]);

    const SQLDetalle = 'INSERT INTO Detalle (pedido_id, juego_id, cantidad) VALUES ?';
    DB.query(SQLDetalle, [detalles], (err, resultDetalle) => {
      if (err) {
        console.error('Error al insertar detalle:', err);
        res.status(500).json({ error: 'Error al guardar la compra' });
        return;
      }

      res.json({ message: 'Compra guardada correctamente' });
    });
  });
});

app.get('/historial/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const SQL = `
    SELECT 
      p.pedido_id,
      p.fecha,
      j.titulo,
      d.cantidad,
      j.precio,
      c.nombre AS categoria,
      e.nombre AS estado
    FROM pedido p
    JOIN detalle d ON p.pedido_id = d.pedido_id
    JOIN juegos j ON d.juego_id = j.juego_id
    JOIN categorias c ON j.categoria_id = c.categoria_id
    JOIN estado e ON j.estado_id = e.estado_id
    WHERE p.usuario_id = ?
  `;

  DB.query(SQL, [usuario_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  });
});

app.get('/buscar', async (req, res) => {
  const { titulo } = req.query;
  if (!titulo) {
    return res.status(400).json({ error: 'Se requiere un título para la búsqueda' });
  }

  try {
    const query = `
      SELECT * FROM juegos
      WHERE LOWER(titulo) LIKE LOWER($1)
    `;
    const values = [`%${titulo}%`];
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al buscar juegos:', error);
    res.status(500).json({ error: 'Error al buscar juegos' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});