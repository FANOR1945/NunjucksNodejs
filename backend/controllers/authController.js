const Account = require('../models/accountModel'); // Modelo Account
const User = require('../models/userModel'); // Modelo User
const { generateToken } = require('../utils/authUtils');
const bcrypt = require('bcryptjs'); // Para el hashing de contraseñas

const authController = {
  // Método para mostrar la página de login
  showLogin: (req, res) => {
    res.render('login.njk', { title: 'Login' });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const account = await Account.findOne({ email }).populate('user');
      if (!account) return res.status(401).json({ error: 'Email incorrecto' });

      const user = account.user;
      await user.populate('roles');

      const isPasswordValid = await bcrypt.compare(
        password,
        account.contraseña
      );
      if (!isPasswordValid)
        return res.status(401).json({ error: 'Contraseña incorrecta' });

      const roleAliases = user.roles.map((role) => role.alias);

      // Guardar en la sesión
      req.session.isAuthenticated = true;
      req.session.user = {
        id: user._id,
        email: account.email,
        roles: roleAliases,
      };

      return res.json({
        message: 'Autenticación exitosa',
        user: req.session.user,
        isAuthenticated: req.session.isAuthenticated,
      });
    } catch (error) {
      console.error('Error al autenticar:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Método para registrar un nuevo usuario
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: 'El correo electrónico ya está en uso' });
      }

      // Crear un nuevo usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save();
      const token = generateToken(newUser);

      req.session.user = { id: newUser._id, email: newUser.email };

      // Almacenar el token en la cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60, // 1 hora
      });

      return res.json({
        message: 'Registro exitoso',
        user: { id: newUser._id, email: newUser.email },
        token,
      });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
        return res
          .status(500)
          .json({ success: false, error: 'Error al cerrar sesión' });
      }

      // Borrar la cookie de sesión
      res.clearCookie('connect.sid', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Para producción, si usas HTTPS
        sameSite: 'lax',
      });

      return res.json({
        success: true,
        message: 'Sesión cerrada exitosamente',
      });
    });
  },
};

module.exports = authController;
