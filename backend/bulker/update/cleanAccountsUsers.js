const Account = require('../../models/accountModel');
const User = require('../../models/userModel');
const connectDB = require('../database'); // Asegúrate de que la conexión esté configurada correctamente

async function cleanOrphanedAccounts() {
  try {
    await connectDB(); // Establecer la conexión a la base de datos
    // Paso 1: Obtener todos los usuarios existentes
    const existingUsers = await User.find().select('_id');
    console.log(`Usuarios existentes: ${existingUsers.length}`); // Ver cuántos usuarios existen

    // Paso 2: Crear un Set con los ObjectIds de los usuarios existentes
    const existingUserIds = new Set(
      existingUsers.map((user) => user._id.toString())
    );
    console.log(
      `IDs de usuarios existentes: ${[...existingUserIds].join(', ')}`
    ); // Mostrar todos los IDs de usuarios existentes

    // Paso 3: Obtener todas las cuentas con un campo 'user' asociado
    const allAccounts = await Account.find({ user: { $exists: true } });
    console.log(`Total de cuentas a verificar: ${allAccounts.length}`); // Ver cuántas cuentas hay

    // Paso 4: Iterar sobre todas las cuentas y eliminar aquellas cuyo 'user' no exista en 'User'
    for (const account of allAccounts) {
      console.log(`Verificando cuenta con ID de usuario: ${account.user}`);

      // Si el ID del usuario de la cuenta no está en los usuarios existentes, eliminar la cuenta
      if (!existingUserIds.has(account.user.toString())) {
        console.log(`Eliminando cuenta huérfana con ID: ${account._id}`); // Mostrar ID de cuenta a eliminar
        await Account.deleteOne({ _id: account._id }); // Usar deleteOne para eliminar la cuenta
      }
    }

    console.log('Proceso completado.');
  } catch (error) {
    console.error('Error al limpiar las cuentas huérfanas:', error);
  }
}

cleanOrphanedAccounts(); // Ejecutar la función
