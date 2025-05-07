// 1. IMPORTACIONES BÁSICAS
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';
import helmet from 'helmet';
import http from 'http';
import nunjucks from 'nunjucks';

import { sessionMiddleware } from './config/sessionConfig.js';

// 2. CONFIGURACIÓN INICIAL
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// 3. BASE DE DATOS
import { connectDB } from './config/database.js';
await connectDB();

// 4. SESSION (EXTRAÍDA A config/sessionConfig.js)
app.use(sessionMiddleware);

// 5. PASSPORT
import passport from 'passport';
import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session());

// 6. NUNJUCKS
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV !== 'production',
  noCache: process.env.NODE_ENV !== 'production'
});

// 7. MIDDLEWARES GENERALES
app.use(helmet());

// CSP con Nonce
app.use((req, res, next) => {
  // Generar un nonce seguro con SHA256
  const nonce = crypto.randomBytes(16).toString('base64'); // 16 bytes aleatorios
  res.locals.nonce = nonce;
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' 'nonce-${nonce}';`
  );
  next();
});

// Archivos estáticos
const staticPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, 'dist')
  : path.join(__dirname, 'public');
app.use(express.static(staticPath));

// JSON y Formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 8. RUTAS
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import webRoutes from './routes/webRoutes.js';

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/webRoutes', webRoutes);

app.get('/', (req, res) => {
  return req.user ? res.redirect('/dashboard') : res.redirect('/home');
});
app.get('*', (req, res) => {
  res.render('layout.njk', {
    title: 'Mi Aplicación',
    nonce: res.locals.nonce,
    scriptPath: process.env.NODE_ENV === 'production' ? 'bundle.min.js' : 'js/main.js',
    env: JSON.stringify({ NODE_ENV: process.env.NODE_ENV }),
  });
});
// 9. ERRORES
app.use((req, res, next) => {
  res.status(404).render('error.njk', {
    title: 'Página no encontrada',
    error: 'La página que buscas no existe'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).render('error.njk', {
    title: 'Error del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error'
  });
});

// 10. INICIO SERVIDOR (sin socket.io)
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});



