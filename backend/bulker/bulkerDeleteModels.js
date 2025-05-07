const mongoose = require('mongoose');
const connectDB = require('./database'); // Importa la función connectDB

// Función para eliminar todos los documentos de varios modelos
const bulkDeleteModels = async (models) => {
  try {
    await connectDB(); // Establecer la conexión a la base de datos

    // Recorrer cada modelo en el array y eliminar todos sus documentos
    for (const model of models) {
      const result = await model.deleteMany({}); // Eliminar todos los documentos
      console.log(
        `Se eliminaron ${result.deletedCount} documentos de ${model.modelName}.`
      );
    }

    // Cerrar la conexión de Mongoose
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al eliminar documentos:', error);
    mongoose.connection.close();
  }
};

// Ejemplo de uso
const { User, Director, Paciente } = require('../models/userModel'); // Importar el modelo User
const permissionModel = require('../models/permissionModel');
const Account = require('../models/accountModel'); // Modelo Account
const modelsToDelete = [Account]; // Array de modelos a limpiar

bulkDeleteModels(modelsToDelete); // Llamar a la función para eliminar documentos
