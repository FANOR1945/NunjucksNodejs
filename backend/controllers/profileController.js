const {
  User,
  Doctor,
  Admin,
  ChiefMedical,
  Patient,
} = require('../models/userModel');
const profileController = {
  // Mostrar la página de perfil con todos los datos del usuario y sus cuentas
  showProfile: async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    try {
      const user = await User.findById(req.session.user.id).populate('cuentas');
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Enviar al frontend toda la información necesaria (usuario y sus cuentas)
      res.json({
        user: getUserData(user),
        cuentas: user.cuentas,
      });
    } catch (error) {
      console.error('Error al mostrar el perfil:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Obtener información del perfil según el rol del usuario
  getProfile: async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: 'No autorizado' });
      }

      // Recuperamos los roles del usuario
      const user = await User.findById(req.session.user.id).populate('roles');
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Resolvemos el modelo adecuado basado en los roles
      const Model = resolveRole(user.roles); // Resolvemos el modelo basado en los roles

      // Consultamos al usuario en el modelo resuelto
      const resolvedUser = await Model.findById(req.session.user.id).populate(
        'cuentas'
      );

      if (!resolvedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Enviar toda la información del usuario y sus cuentas al frontend
      return res.json({
        user: getUserData(resolvedUser), // Llamar a la función que elimina campos no necesarios
        cuentas: resolvedUser.cuentas, // Las cuentas asociadas
      });
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Actualizar el perfil del usuario, solo datos básicos
  updateProfile: async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: 'No autorizado' });
      }

      // Recuperamos los roles del usuario
      const user = await User.findById(req.session.user.id).populate('roles');
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Resolvemos el modelo adecuado basado en los roles
      const Model = resolveRole(user.roles); // Resolvemos el modelo basado en los roles

      // Consultamos al usuario en el modelo resuelto
      const resolvedUser = await Model.findById(req.session.user.id);

      if (!resolvedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Filtramos los datos que deben actualizarse, sin tocar referencias como 'cuentas'
      const updateData = { ...req.body };

      // Solo actualizamos los campos básicos del usuario (sin tocar contraseñas ni cuentas)
      Object.keys(updateData).forEach((key) => {
        if (
          resolvedUser[key] !== undefined &&
          key !== 'cuentas' &&
          key !== '_id' &&
          key !== 'password'
        ) {
          resolvedUser[key] = updateData[key]; // Actualizamos solo los campos permitidos
        }
      });

      // Guardamos los cambios en el usuario
      await resolvedUser.save();

      // Regresar la información actualizada al frontend
      return res.json({
        message: 'Perfil actualizado exitosamente',
        user: getUserData(resolvedUser), // Regresamos los datos del usuario actualizados
        cuentas: resolvedUser.cuentas, // Las cuentas no se actualizan, pero se incluyen en la respuesta
      });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

// Función para obtener los datos del usuario de manera dinámica y sin campos innecesarios
function getUserData(user) {
  const userData = {};
  // Usamos Object.keys() para recorrer las propiedades del usuario
  Object.keys(user._doc).forEach((key) => {
    // Filtrar las propiedades no necesarias como '_id', 'password', '__v', etc.
    if (key !== '_id' && key !== 'password' && key !== '__v') {
      userData[key] = user[key]; // Asignamos el valor de los campos necesarios
    }
  });
  return userData;
}

// Resolver el modelo basado en los roles del usuario
function resolveRole(rolesFound) {
  const roleNames = rolesFound.map((role) => role.name);
  if (roleNames.includes('Patient')) {
    return Patient;
  } else if (roleNames.includes('Doctor')) {
    return Doctor;
  } else if (roleNames.includes('Admin')) {
    return Admin;
  } else if (roleNames.includes('ChiefMedical')) {
    return ChiefMedical;
  } else {
    return User; // Si no hay coincidencia, devolvemos el modelo base User
  }
}

module.exports = profileController;
