import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import pool from './database.js';

import categoriesRoute from './routes/categoriesRoute.js';
import projectsRoute from './routes/projectsRoute.js';
import organizationsRoute from './routes/organizationsRoute.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

/*
VIEW ENGINE
*/

app.set('view engine', 'ejs');

app.set(
  'views',
  path.join(__dirname, 'views')
);

/*
STATIC FILES
*/

app.use(
  express.static(
    path.join(__dirname, 'public')
  )
);

/*
DATABASE
*/

pool.connect()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error(err);
  });

/*
HOME
*/

app.get('/', (req, res) => {

  res.render('home', {
    title: 'Home'
  });

});

/*
ROUTES
*/

app.use('/', categoriesRoute);

app.use('/project', projectsRoute);

app.use('/organizations', organizationsRoute);

/*
404 PAGE
*/

app.use((req, res) => {

  res.status(404).render('404', {
    title: '404 - Page Not Found'
  });

});

/*
500 PAGE
*/

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).render('500', {
    title: '500 - Server Error'
  });

});

/*
SERVER
*/

app.listen(PORT, () => {

  console.log(
    `Server running at http://localhost:${PORT}`
  );

});