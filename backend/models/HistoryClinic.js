const mongoose = require('mongoose');

const historyClinicSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    motivoConsulta: {
      type: String,
      required: true,
    },
    diagnostico: {
      type: String,
      required: true,
    },
    tratamiento: {
      type: String,
      required: true,
    },
    observaciones: {
      type: String,
    },
    fechaConsulta: {
      type: Date,
      default: Date.now,
    },
    // archivos: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Upload', // Si usas un sistema de subida de archivos
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('HistoryClinic', historyClinicSchema);
