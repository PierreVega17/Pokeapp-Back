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

app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});

export default app;