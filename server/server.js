import apiRouter from './router/apiRouter';

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const logger = morgan('dev');

app.use(logger);
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1800000,
//     },
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(flash());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/image', express.static(path.join(__dirname, 'uploads', 'projects')));
app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

export default app;
