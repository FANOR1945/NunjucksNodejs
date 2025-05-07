const mongoose = require('mongoose');
const Specialty = require('../models/specialtyModel'); // Asegúrate de que la ruta es correcta
const Service = require('../models/serviceModel'); // Asegúrate de que la ruta es correcta
const connectDB = require('./database'); // Importar la función de conexión a MongoDB

// Lista de especialidades médicas
const specialtyNames = [
  'Cardiología',
  'Neurología',
  'Pediatría',
  'Dermatología',
  'Gastroenterología',
  'Oncología',
  'Traumatología',
  'Endocrinología',
  'Urología',
  'Oftalmología',
  'Neumología',
  'Otorrinolaringología',
  'Reumatología',
  'Psiquiatría',
  'Cirugía General',
  'Ginecología',
  'Nefrología',
  'Hematología',
  'Alergología',
  'Medicina Interna',
  'Medicina de Familia',
  'Anestesiología',
  'Radiología',
  'Inmunología',
  'Genética Médica',
];

// Función para generar un código único basado en el nombre de la especialidad
const generateSpecialtyCode = (name) => {
  const specialtyCode = name.substring(0, 3).toUpperCase(); // Primeras tres letras en mayúsculas
  const randomSuffix = Math.floor(100 + Math.random() * 900); // Genera un número aleatorio de 3 dígitos
  return specialtyCode + randomSuffix; // Combina el código de la especialidad con el sufijo aleatorio
};

// Generar especialidades dinámicamente
const generateSpecialties = () => {
  return specialtyNames.map((name) => ({
    nombre: name,
    codigo: generateSpecialtyCode(name), // Generamos un código único para cada especialidad
    servicios: [], // Inicialmente sin servicios
  }));
};

// Función para registrar especialidades en bloque y asignar servicios
const bulkRegisterSpecialties = async () => {
  try {
    await connectDB(); // Conectar a la base de datos

    const specialties = generateSpecialties(); // Generar especialidades

    // Insertar especialidades en MongoDB
    const result = await Specialty.insertMany(specialties);
    console.log(
      `✅ Se registraron ${result.length} especialidades exitosamente.`
    );

    // Asignar servicios a las especialidades
    for (const specialty of result) {
      // Buscar los servicios cuyo código comience con los tres primeros caracteres del código de la especialidad
      const relatedServices = await Service.find({
        codigo: {
          $regex: `^${specialty.codigo.substring(0, 3)}`,
          $options: 'i',
        }, // Coincidir con los primeros 3 caracteres del código
      });

      if (relatedServices.length > 0) {
        // Actualizar la especialidad con los servicios encontrados
        specialty.servicios = relatedServices.map((service) => service._id);
        await specialty.save(); // Guardar la especialidad con los servicios asignados
        console.log(
          `✅ Se asignaron ${relatedServices.length} servicios a la especialidad "${specialty.nombre}".`
        );
      } else {
        console.log(
          `❌ No se encontraron servicios para la especialidad "${specialty.nombre}".`
        );
      }
    }

    // Cerrar conexión con la base de datos
    mongoose.connection.close();
  } catch (error) {
    console.error(
      '❌ Error registrando especialidades y asignando servicios:',
      error
    );
    mongoose.connection.close();
  }
};

bulkRegisterSpecialties(); // Llamar a la función para registrar especialidades y asignar servicios
