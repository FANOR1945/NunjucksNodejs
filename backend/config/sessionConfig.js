// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// require('dotenv').config();

// const sessionConfig = session({
//   secret: process.env.SESSION_SECRET || 'supersecretkey',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }, // true si usas HTTPS
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI, // URL de MongoDB
//     collectionName: 'sessions',
//     ttl: 14 * 24 * 60 * 60, // 14 días de expiración
//   }),
// });

// module.exports = sessionConfig;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionConfig = () => {
  return session({
    secret: process.env.SESSION_SECRET || 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // maxAge: 1000 * 60 * 60 * 1, // Establecer a 5 horas
      maxAge: 1000 * 60 * 30, // Expira en 30 minutos

      sameSite: 'lax',
    },
  });
};

module.exports = sessionConfig;
