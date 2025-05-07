// middlewares/checkUserStatus.js
const User = require('../models/userModel');
const Account = require('../models/accountModel');

const checkUserStatus = async (req, res, next) => {
  try {
    // Obtener la cuenta y el usuario asociado
    const account = await Account.findById(req.params.accountId).populate(
      'user'
    );

    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }

    const user = account.user;

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Usuario asociado no encontrado' });
    }

    // Verificar si el usuario está activo
    if (!user.active) {
      return res
        .status(400)
        .json({ message: 'El usuario asociado ha sido desactivado' });
    }

    next(); // Si todo está bien, continuar con la ejecución del controlador
  } catch (error) {
    console.error('Error en el middleware checkUserStatus:', error);
    return res
      .status(500)
      .json({ message: 'Error al verificar el estado del usuario' });
  }
};

module.exports = checkUserStatus;
