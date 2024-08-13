const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const pool = new Pool({
  user: 'yourusername',
  host: 'localhost',
  database: 'likeme',
  password: 'yourpassword',
  port: 5432,
});


// Ruta GET para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Ruta POST para crear un nuevo post
app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  try {
    await pool.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)',
      [titulo, img, descripcion, likes]
    );
    res.status(201).json({ message: 'Post created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});
// Ruta PUT para actualizar un post existente
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, img, descripcion, likes } = req.body;
  try {
    await pool.query(
      'UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5',
      [titulo, img, descripcion, likes, id]
    );
    res.status(200).json({ message: 'Post updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// **Ruta DELETE para eliminar un post**
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
