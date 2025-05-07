// config/passport.js
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/userModel.js';

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialización del usuario
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});