import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

import pool from './database.js';

import staticRoute from './routes/static.js';
import categoryRoute from './routes/categoryRoute.js';
import projectRoute from './routes/projectRoute.js';
import organizationRoute from './routes/organizationRoute.js';
import accountRoute from './routes/accountRoute.js';
import volunteerRoute from './routes/volunteerRoute.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

/*
SESSION
*/

app.use(session({
  secret: process.env.SESSION_SECRET || 'cse340secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

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
ROUTES
*/

app.use('/', staticRoute);

app.use('/', categoryRoute);

app.use('/projects', projectRoute);

app.use('/organizations', organizationRoute);

app.use('/account', accountRoute);

app.use('/volunteer', volunteerRoute);

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