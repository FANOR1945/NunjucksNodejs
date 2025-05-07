// controllers/accountController.js
const Account = require('../models/accountModel'); // Modelo Account
const User = require('../models/userModel'); // Modelo User

// Función para crear una cuenta asociada a un usuario específico
const createAccount = async (req, res) => {
  try {
    const { email, contraseña } = req.body; // Obtener datos de la cuenta del cuerpo de la solicitud
    const { userId } = req.params; // Obtener el userId de los parámetros de la ruta

    // Verificar que el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear una nueva cuenta
    const newAccount = new Account({
      email,
      contraseña,
      user: userId, // Asociamos la cuenta al usuario
    });

    // Guardar la cuenta
    await newAccount.save();

    // Agregar la cuenta al array de cuentas del usuario
    user.cuentas.push(newAccount._id);
    await user.save();

    res.status(201).json({
      message: 'Cuenta creada exitosamente',
      account: newAccount,
    });
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    res.status(500).json({ message: 'Error al crear la cuenta' });
  }
};

module.exports = {
  createAccount,

};
