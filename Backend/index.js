const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


//se reemplaza segun datos bd
const pool = new Pool({
  user: 'yourusername',
  host: 'localhost',
  database: 'likeme',
  password: 'yourpassword',
  port: 5432,
});


app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});


app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  try {
    await pool.query('INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)', [titulo, img, descripcion, likes]);
    res.status(201).json({ message: 'Post created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
