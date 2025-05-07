const mongoose = require('mongoose');

// Definimos el esquema de horarios en español
const scheduleSchema = new mongoose.Schema(
  {
    // Relacionado con el Doctor
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },

    // Día de la semana
    diaSemana: {
      type: String,
      enum: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ],
      required: true,
    },

    // Hora de inicio
    horaInicio: {
      type: String,
      required: true,
      match: /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, // Formato HH:mm
    },

    // Hora de fin
    horaFin: {
      type: String,
      required: true,
      match: /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, // Formato HH:mm
    },
  },
  {
    timestamps: true, // createdAt y updatedAt automáticos
  }
);

// Creamos el modelo "Horario"
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Exportamos el modelo
module.exports = Schedule;
