const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const ImageKit = require('imagekit');
const serveIndex = require('serve-index');


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const imagekit = new ImageKit({
  publicKey: 'public_a+N/BSQezZfBzMTChmUn2lWjduU=',
  privateKey: 'private_G0vqNkU6Is/5L33nU4ZICfsLe+4=',
  urlEndpoint: 'https://ik.imagekit.io/lvnjganbk'
});

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

app.post('/subir-libro', upload.fields([{ name: 'Imagen' }, { name: 'Pdf' }]), async (req, res) => {
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

      if (!req.files.Imagen || !req.files.Pdf) {
          res.status(400).json({ message: 'Missing files' });
          return;
      }

      const imagenPath = req.files.Imagen[0].path;
      const pdfPath = req.files.Pdf[0].path;

      // Subir imagen a ImageKit.io
      const uploadImageResponse = await imagekit.upload({
          file: fs.readFileSync(imagenPath),
          fileName: req.files.Imagen[0].originalname
      });

      const imagenUrl = uploadImageResponse.url;

      // Puedes eliminar el archivo local después de subirlo
      fs.unlinkSync(imagenPath);

      const pdfFilename = req.files.Pdf[0].filename;
      const pdfPathInDb = `backend/pdfs/${pdfFilename}`;

      const query = 'INSERT INTO libros (Nombre, Autor, ISBN, Anio_publicacion, Editorial, Descripcion, Genero, Estado, Cantidad, Imagen, Ruta_pdf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      DB.query(query, [Nombre, Autor, ISBN, Anio_publicacion, Editorial, Descripcion, Genero, Estado, Cantidad, imagenUrl, pdfPathInDb], (err, results) => {
          if (err) {
              res.status(500).json({ message: 'Error inserting data into the database', error: err.message });
              return;
          }
          res.json({ message: 'Libro subido exitosamente' });
      });
  } catch (error) {
      res.status(500).json({ message: 'Error al subir el libro', error: error.message });
  }
});


// Ruta para guardar solicitudes
app.post('/solicitud', (req, res) => {
  const { usuarioId, justificacion, fecha } = req.body;
  const query = 'INSERT INTO solicitudes (ID_Usuario, Nombre, Fecha, Justificacion) VALUES (?, ?, ?, ?)';
  
  // Obtener nombre del usuario
  DB.query('SELECT Nombre FROM usuarios WHERE ID_Usuario = ?', [usuarioId], (err, results) => {
    if (err) {
      console.error('Error fetching user name:', err);
      res.status(500).json({ message: 'Error fetching user name' });
      return;
    }
    
    const nombre = results[0].Nombre;
    
    DB.query(query, [usuarioId, nombre, fecha, justificacion], (err) => {
      if (err) {
        console.error('Error inserting solicitud into database:', err);
        res.status(500).json({ message: 'Error inserting solicitud into database' });
        return;
      }
      res.json({ message: 'Solicitud enviada' });
    });
  });
});

// Ruta para obtener todas las solicitudes
app.get('/solicitudes', (req, res) => {
  const query = `
    SELECT s.ID, s.ID_Usuario, u.Nombre, s.Fecha, s.Justificacion
    FROM solicitudes s
    JOIN usuarios u ON s.ID_Usuario = u.ID_Usuario
  `;

  DB.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching solicitudes:', err);
      res.status(500).json({ message: 'Error fetching solicitudes' });
      return;
    }
    res.json(results);
  });
});

app.post('/responder-solicitud/:id', async (req, res) => {
  const { id } = req.params;
  const { aceptar } = req.body;

  try {
    // Verificar si la solicitud existe
    const solicitud = await new Promise((resolve, reject) => {
      DB.query('SELECT * FROM solicitudes WHERE ID = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (!solicitud || solicitud.length === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Obtener el ID de usuario y el nombre de la solicitud
    const { ID_Usuario, Nombre } = solicitud[0];

    if (aceptar) {
      // Aceptar solicitud y cambiar rol a Profesor
      await new Promise((resolve, reject) => {
        DB.query('UPDATE usuarios SET role = ? WHERE ID_Usuario = ?', ['Profesor', ID_Usuario], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      // Eliminar la solicitud después de aceptarla
      await new Promise((resolve, reject) => {
        DB.query('DELETE FROM solicitudes WHERE ID = ?', [id], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      res.json({ message: `Solicitud aceptada. El usuario ${Nombre} ahora es Profesor.` });
    } else {
      // Rechazar solicitud (simplemente eliminarla)
      await new Promise((resolve, reject) => {
        DB.query('DELETE FROM solicitudes WHERE ID = ?', [id], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      res.json({ message: `Solicitud rechazada. El usuario ${Nombre} permanece como Estudiante.` });
    }
  } catch (error) {
    console.error('Error al responder la solicitud:', error);
    res.status(500).json({ message: 'Error al responder la solicitud' });
  }
});

// Servir archivos estáticos
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Servir índice de archivos
app.use('/pdfs', serveIndex(path.join(__dirname, 'pdfs'), { icons: true }));

// Endpoint para obtener la lista de PDFs
app.get('/pdfs', (req, res) => {
  const pdfsDir = path.join(__dirname, 'pdfs');
  fs.readdir(pdfsDir, (err, files) => {
      if (err) {
          res.status(500).json({ message: 'Error reading directory', error: err.message });
      } else {
          res.json(files);
      }
  });
});

// Endpoint para servir un archivo específico
app.get('/descargar-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'pdfs', filename);
  res.sendFile(filePath, (err) => {
      if (err) {
          console.error('Error sending file:', err);
          res.status(500).json({ message: 'Error sending file', error: err.message });
      }
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



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});