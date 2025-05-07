const mongoose = require('mongoose');
const Service = require('../models/serviceModel'); // Asegúrate de que la ruta es correcta
const connectDB = require('./database'); // Importar la función de conexión a MongoDB
const Specialty = require('../models/specialtyModel'); // Asegúrate de que la ruta es correcta

const serviceNames = [
  'Consulta General',
  'Cirugía Cardiaca',
  'Neurología Preventiva',
  'Radiología Diagnóstica',
  'Ecografía Abdominal',
  'Endoscopia',
  'Hemodiálisis',
  'Quimioterapia',
  'Fisioterapia',
  'Psicoterapia',
  'Análisis de Sangre',
  'Monitoreo de Cáncer',
  'Vacunación',
  'Pruebas de Función Pulmonar',
  'Consultas de Nutrición',
  'Asesoramiento Genético',
];

// Función para generar un código único
const generateUniqueCode = (specialtyCode) => {
  const randomSuffix = Math.floor(100 + Math.random() * 900); // Genera un número aleatorio de 3 dígitos
  return specialtyCode.toUpperCase() + randomSuffix; // Combina el código de la especialidad con el sufijo aleatorio
};

// Función para registrar servicios en bloque
const bulkRegisterServices = async () => {
  try {
    await connectDB(); // Conectar a la base de datos

    for (const serviceName of serviceNames) {
      // Tomar la especialidad del servicio
      const specialtyName = serviceName.split(' ')[0]; // Asumimos que la especialidad está en el primer término del servicio
      const specialty = await Specialty.findOne({
        nombre: { $regex: new RegExp('^' + specialtyName, 'i') }, // Buscamos la especialidad sin importar mayúsculas/minúsculas
      });

      if (!specialty) {
        console.log(
          `❌ Especialidad para el servicio "${serviceName}" no encontrada.`
        );
        continue; // Si la especialidad no existe, saltamos al siguiente servicio
      }

      const specialtyCode = specialty.nombre.substring(0, 3); // Usamos los primeros 3 caracteres del nombre de la especialidad

      // Generar un código único para el servicio
      const uniqueCode = generateUniqueCode(specialtyCode);

      // Crear el servicio con el código único
      const newService = new Service({
        nombre: serviceName,
        descripcion: `${serviceName} Descripción`,
        especialidad: specialty._id, // Asociamos el servicio con la especialidad
        codigo: uniqueCode, // Asignamos el código único generado
      });

      // Guardar el servicio en la base de datos
      await newService.save();
      console.log(
        `✅ Servicio "${serviceName}" creado con código "${uniqueCode}".`
      );

      // Actualizar la especialidad con el nuevo servicio
      specialty.servicios.push(newService._id);
      await specialty.save();
    }

    // Cerrar conexión con la base de datos
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error registrando servicios:', error);
    mongoose.connection.close();
  }
};

bulkRegisterServices(); // Llamar a la función para registrar los servicios
