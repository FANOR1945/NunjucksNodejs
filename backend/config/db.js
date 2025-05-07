const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Usamos la URI de MongoDB desde el archivo .env
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1); // Detenemos el proceso si hay error
  }
};

module.exports = { connectDB };
