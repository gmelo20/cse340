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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import categoriesModel from './models/categories.js';

app.get("/categories", async (req, res) => {

    const categories =
        await categoriesModel.getAllCategories()

res.render("categories", {
    title: "Categories",
    categories: categories
})
})

import pool from './database.js';

pool.connect()
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err));