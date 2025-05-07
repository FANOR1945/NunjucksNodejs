// 🌐 Core
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';
import helmet from 'helmet';
import http from 'http'; // ⚠️ importante para socket.io

// 🛢️ Config & DB
import { connectDB } from './config/database.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// 🧠 Autenticación
import passport from 'passport';
import './config/passport.js';

// 🖥️ Motor de plantillas
import nunjucks from 'nunjucks';

// 📁 Rutas
import webRoutes from './routes/webRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // 📌 necesario para socket.io
const { Server } = await import('socket.io');
const io = new Server(server); // 💬 socket.io conectado

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

await connectDB();

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV !== 'production',
  noCache: process.env.NODE_ENV !== 'production'
});

// 🛠️ Middlewares
const staticPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, 'dist') 
  : path.join(__dirname, 'public');

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';`
  );
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🌐 Rutas
app.use('/webRoutes', webRoutes);
app.use('/api', apiRoutes);
app.use(helmet());

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

// 💬 Socket.IO events
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);

  socket.on('mensaje', (msg) => {
    console.log('📩 Mensaje recibido:', msg);
    io.emit('mensaje', msg); // reenviar a todos
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

// 🚀 Iniciar servidor con socket.io
server.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
