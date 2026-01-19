import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let posts = [];
let idCounter = 1;

/* Listar */
app.get('/posts', (req, res) => {
  res.json(posts);
});

/* Obtener uno */
app.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

/* Crear */
app.post('/posts', (req, res) => {
  const newPost = {
    id: idCounter++,
    title: req.body.title,
    body: req.body.body,
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

/* Editar */
app.put('/posts/:id', (req, res) => {
  const index = posts.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  posts[index] = { ...posts[index], ...req.body };
  res.json(posts[index]);
});

/* Eliminar */
app.delete('/posts/:id', (req, res) => {
  posts = posts.filter((p) => p.id !== Number(req.params.id));
  res.json({ success: true });
});

/* Status visual */
app.get('/status', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Backend Status</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f0f0f0; }
        .status { color: green; font-size: 2em; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Backend Status</h1>
        <p class="status">✅ El backend está corriendo correctamente</p>
        <p>Fecha y hora: ${new Date().toLocaleString('es-ES')}</p>
        <p>Total de posts: ${posts.length}</p>
      </div>
    </body>
    </html>
  `);
});

app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});

export default app;