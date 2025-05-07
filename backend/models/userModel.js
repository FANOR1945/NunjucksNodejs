// models/userModel.js
const mongoose = require('mongoose');
const Account = require('./accountModel'); // Importar el modelo Account

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  nacionalidad: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  cuentas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
  ],
});

const User = mongoose.model('User', userSchema);
const Admin = User.discriminator(
  'Admin',
  new mongoose.Schema({
    nivelAdministrador: {
      type: String,
      enum: ['bajo', 'medio', 'alto'],
      default: 'bajo',
    },
  })
);
const Director = User.discriminator(
  'Director',
  new mongoose.Schema({
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Horarios de atención que gestiona el jefe médico.
    especialidades: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty' },
    ], // Especialidades médicas gestionadas por este jefe.
    horariosAtencion: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
    ], // Horarios de atención que gestiona el jefe médico.
  })
);

const Doctor = User.discriminator(
  'Doctor',
  new mongoose.Schema({
    especialidades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
      },
    ], //se llena al actualiar//e n princpio array vacio
    horarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],

    programacionCitas: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    ],
    //se llena al actualiar //e n princpio array vacio
  })
);
const Paciente = User.discriminator(
  'Paciente',
  new mongoose.Schema({
    citas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }], // Citas médicas del paciente.
    historialClinico: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'HistoryClinic' },
    ], // Historial clínico del paciente.
  })
);

module.exports = { User, Admin, Director, Doctor, Paciente };
