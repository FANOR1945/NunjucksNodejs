const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  especialidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty', // Referencia a la especialidad
  },
  codigo: {
    type: String,
    required: true,
    unique: true, // Aseguramos que el código sea único
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
