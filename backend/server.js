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
app.use(bodyParser.urlencoded({ extended: true }));

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
  const { ID_Usuario, Contrasenia } = req.body;
  console.log('Datos recibidos:', req.body);

  const queryUser = 'SELECT ID_Usuario, Contrasenia FROM usuarios WHERE ID_Usuario = ?';
  const valuesUser = [ID_Usuario];
  console.log(valuesUser);

  DB.query(queryUser, valuesUser, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    if (result.length > 0) {
      const user = result[0]; // Obtener el usuario_id si existe
      if (user.Contrasenia === Contrasenia){
        res.json({ ID_Usuario: user.ID_Usuario});
      } else {
        console.log('Contraseña incorrecta');
        res.json({ID_Usuario: false});
      }
    } else {
      console.log('Usuario no encontrado');
      res.json({ID_Usuario: false});
    }
  });
});

app.get('/libros', (req, res) => {
  let sql = 'SELECT * FROM libros';
  if (req.query.genero) {
    sql += ` WHERE Genero = ${mysql.escape(req.query.genero)}`;
  }
  DB.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching books');
    } else {
      res.json(result);
    }
  });
});

// Ruta exclusiva para la barra de búsqueda
app.get('/buscar-libro', (req, res) => {
  const nombre = req.query.nombre;
  if (!nombre) {
    return res.status(400).send('El nombre del libro es requerido');
  }

  const sql = `SELECT * FROM libros WHERE Nombre = ${mysql.escape(nombre)}`;

  DB.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send('Error fetching book');
    } else {
      return res.json(result);
    }
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para registrar una pregunta en el foro
app.post('/api/preguntas', (req, res) => {
  const { ID_Usuario, Pregunta } = req.body;
  const sql = 'INSERT INTO preguntas (ID_Usuario, Pregunta) VALUES (?, ?)';
  DB.query(sql, [ID_Usuario, Pregunta], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al registrar la pregunta' });
    } else {
      res.status(201).json({ message: 'Pregunta registrada correctamente' });
    }
  });
});

// Ruta para obtener todas las preguntas del foro (ordenadas por fecha)
app.get('/api/preguntas', (req, res) => {
  const sql = `
    SELECT preguntas.*, usuarios.Nombre, usuarios.Apellido 
    FROM preguntas 
    JOIN usuarios ON preguntas.ID_Usuario = usuarios.ID_Usuario 
    ORDER BY FechaRegistro DESC
  `;
  DB.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las preguntas' });
    } else {
      const preguntas = result;

      const respuestasSql = `
        SELECT respuestas.*, usuarios.Nombre, usuarios.Apellido 
        FROM respuestas 
        JOIN usuarios ON respuestas.ID_Usuario = usuarios.ID_Usuario 
        WHERE respuestas.ID_Pregunta = ?
        ORDER BY FechaRegistro
      `;

      const preguntasConRespuestas = preguntas.map(pregunta => {
        return new Promise((resolve, reject) => {
          DB.query(respuestasSql, [pregunta.ID_Pregunta], (err, respuestas) => {
            if (err) {
              reject(err);
            } else {
              pregunta.respuestas = respuestas;
              resolve(pregunta);
            }
          });
        });
      });

      Promise.all(preguntasConRespuestas)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error: 'Error al obtener las respuestas' }));
    }
  });
});

// Ruta para registrar una respuesta a una pregunta
app.post('/api/respuestas', (req, res) => {
  const { ID_Pregunta, ID_Usuario, Respuesta } = req.body;
  const sql = 'INSERT INTO respuestas (ID_Pregunta, ID_Usuario, Respuesta) VALUES (?, ?, ?)';
  DB.query(sql, [ID_Pregunta, ID_Usuario, Respuesta], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al registrar la respuesta' });
    } else {
      res.status(201).json({ message: 'Respuesta registrada correctamente' });
    }
  });
});

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'Imagen') {
      cb(null, 'image_pdfs/');
    } else if (file.fieldname === 'Pdf') {
      cb(null, 'pdfs/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Ruta para guardar los datos del formulario y la imagen
app.post('/subir-libro', upload.fields([{ name: 'Imagen' }, { name: 'Pdf' }]), async (req, res) => {
  console.log('Request received');
  try {
    const {
      Nombre,
      Autor,
      ISBN,
      Anio_publicacion,
      Editorial,
      Descripcion,
      Genero,
      Estado,
      Cantidad
    } = req.body;
    
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    if (!req.files.Imagen || !req.files.Pdf) {
      console.error('Missing files');
      res.status(400).json({ message: 'Missing files' });
      return;
    }

    // Construcción de rutas relativas para almacenar en la base de datos
    const imagenFilename = req.files.Imagen[0].filename;
    const pdfFilename = req.files.Pdf[0].filename;

    // Ajustar las rutas a tu formato deseado
    const imagenPath = `backend/image_pdfs/${imagenFilename}`;
    const pdfPath = `backend/pdfs/${pdfFilename}`;

    const query = 'INSERT INTO libros (Nombre, Autor, ISBN, Anio_publicacion, Editorial, Descripcion, Genero, Estado, Cantidad, Imagen, Ruta_pdf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    DB.query(query, [Nombre, Autor, ISBN, Anio_publicacion, Editorial, Descripcion, Genero, Estado, Cantidad, imagenPath, pdfPath], (err, results) => {
      if (err) {
        console.error('Error inserting data into the database:', err.message);
        res.status(500).json({ message: 'Error inserting data into the database', error: err.message });
        return;
      }
      res.json({ message: 'Libro subido exitosamente' });
    });
  } catch (error) {
    console.error('Error al subir el libro:', error.message);
    res.status(500).json({ message: 'Error al subir el libro', error: error.message });
  }
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


app.get('/perfil/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT Nombre, Apellido, Email, role FROM usuarios WHERE ID_Usuario = ?';

  DB.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      res.status(500).json({ error: 'Error fetching user profile' });
      return;
    }

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
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