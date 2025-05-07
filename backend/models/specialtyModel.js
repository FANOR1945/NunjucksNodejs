const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  codigo: {
    // Agregamos el campo código
    type: String,
    required: true,
    unique: true,
  },
  servicios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service', // Referencia al modelo de Servicios
    },
  ],
});

const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = Specialty;
