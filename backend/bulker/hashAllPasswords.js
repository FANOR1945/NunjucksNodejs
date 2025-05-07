// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const User = require('../models/userModel'); // Importar el modelo de usuario
// const connectDB = require('./database'); // Importar la función connectDB

// // Función para hashear todas las contraseñas existentes
// const hashAllPasswords = async () => {
//   try {
//     await connectDB(); // Conectar a la base de datos

//     // Obtener todos los usuarios con contraseñas sin hashear
//     const users = await User.find({ contraseña: { $not: /^\$2b\$/ } });

//     // Hashear las contraseñas y actualizar los usuarios
//     const updates = users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.contraseña, 10);
//       return User.updateOne(
//         { _id: user._id },
//         { $set: { contraseña: hashedPassword } }
//       );
//     });

//     // Ejecutar todas las actualizaciones
//     await Promise.all(updates);

//     console.log('Todas las contraseñas han sido hasheadas.');
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error al hashear contraseñas:', error);
//     mongoose.connection.close();
//   }
// };

// hashAllPasswords(); // Ejecutar el script

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Importar el modelo de usuario
const connectDB = require('./database'); // Importar la función connectDB

// Función para hashear todas las contraseñas existentes
const hashAllPasswords = async () => {
  try {
    await connectDB(); // Conectar a la base de datos

    // Obtener todos los usuarios
    const users = await User.find();

    // Desactivar el hook `pre('save')` temporalmente
    User.schema.removeListener('save', User.schema.pre('save'));

    // Hashear la contraseña de cada usuario
    for (const user of users) {
      if (!user.contraseña.startsWith('$2b$')) {
        // Verificar si la contraseña ya está hasheada
        user.contraseña = await bcrypt.hash(user.contraseña, 10);
        await user.save();
      }
    }

    console.log('Todas las contraseñas han sido hasheadas.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al hashear contraseñas:', error);
    mongoose.connection.close();
  }
};

hashAllPasswords(); // Ejecutar el script
