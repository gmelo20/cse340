import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', { tituloPagina: 'Home' });
});

app.get('/organizations', (req, res) => {
  res.render('organizations', { tituloPagina: 'Organizations' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { tituloPagina: 'Projects' });
});

app.get('/categories', (req, res) => {
  const categorias = [
    'Environmental',
    'Educational',
    'Community Service',
    'Health & Wellness'
  ];
  res.render('categories', { tituloPagina: 'Categories', categorias });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});