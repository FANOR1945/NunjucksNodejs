import express from 'express';
import passport from 'passport';
import User from '../models/userModel.js'; // Importar el modelo

const router = express.Router();

// Login (versión mejorada)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: info.message || 'Credenciales inválidas'
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      
      // Eliminar password del objeto user antes de enviarlo
      const userData = user.toObject();
      delete userData.password;
      
      return res.json({
        success: true,
        message: 'Login exitoso',
        user: userData
      });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ 
      success: true,
      message: 'Sesión cerrada correctamente' 
    });
  });
});

// Registro (versión mejorada)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validación básica
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Usuario y contraseña son requeridos'
      });
    }

    const user = new User({ 
      username, 
      password, 
      roles: ['user'] 
    });
    
    await user.save();
    
    // Eliminar password antes de enviar respuesta
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado con éxito',
      user: userResponse
    });
  } catch (err) {
    const errorMessage = err.code === 11000 
      ? 'El nombre de usuario ya existe' 
      : 'Error al registrar usuario';
    
    res.status(500).json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;