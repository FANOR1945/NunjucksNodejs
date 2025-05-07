//Admin
// const mongoose = require('mongoose');
// const connectDB = require('./database');
// const { Doctor } = require('../models/userModel');
// const Role = require('../models/roleModel');

// const sudAmericaCountries = [
//   'Argentina',
//   'Bolivia',
//   'Chile',
//   'Colombia',
//   'Ecuador',
//   'Paraguay',
//   'Perú',
//   'Uruguay',
//   'Venezuela',
//   'Surinam',
//   'Guyana',
//   'Belice',
// ];

// const citiesByCountry = {
//   Argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
//   Bolivia: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Potosí'],
//   Chile: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'La Serena'],
//   Colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
//   Ecuador: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Machala'],
//   Paraguay: ['Asunción', 'Ciudad del Este', 'Encarnación', 'PJC'],
//   Perú: ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo'],
//   Uruguay: ['Montevideo', 'Salto', 'Paysandú', 'Maldonado', 'Tacuarembó'],
//   Venezuela: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maturín'],
//   Surinam: ['Paramaribo', 'Nickerie', 'Albina', 'Moengo', 'Zanderij'],
//   Guyana: ['Georgetown', 'New Amsterdam', 'Anna Regina', 'Linden', 'Bartica'],
//   Belice: ['Belmopan', 'Belice', 'San Ignacio', 'Corozal', 'Orange Walk'],
// };

// const generateDNI = () =>
//   Math.floor(Math.random() * 1000000000)
//     .toString()
//     .padStart(9, '0');

// const generateUsers = (numUsers, allRoles, baseRoleAlias, nombrePrefix) => {
//   const users = [];
//   const apellidos = ['Perez', 'Lopez', 'Ramirez', 'Gonzalez', 'Martinez'];
//   const niveles = ['bajo', 'medio', 'alto'];

//   const baseRole = allRoles.find((r) => r.alias === baseRoleAlias);
//   if (!baseRole) {
//     throw new Error(`❌ No se encontró el rol con alias: ${baseRoleAlias}`);
//   }

//   const otherRoles = allRoles.filter((r) => r.alias !== baseRoleAlias);

//   for (let i = 1; i <= numUsers; i++) {
//     const apellido = apellidos[i % apellidos.length];
//     const nationality =
//       sudAmericaCountries[
//         Math.floor(Math.random() * sudAmericaCountries.length)
//       ];
//     const city =
//       citiesByCountry[nationality][
//         Math.floor(Math.random() * citiesByCountry[nationality].length)
//       ];

//     const userRoles = [baseRole._id];
//     const extraCount = Math.floor(Math.random() * 2); // 0 o 1 rol extra
//     for (let j = 0; j < extraCount; j++) {
//       const randomRole =
//         otherRoles[Math.floor(Math.random() * otherRoles.length)]._id;
//       if (!userRoles.includes(randomRole)) userRoles.push(randomRole);
//     }

//     users.push({
//       __t: 'Doctor', // importante para que se guarde como Doctor
//       nombre: `${nombrePrefix} ${i}`,
//       apellido,
//       dni: generateDNI(),
//       nacionalidad: nationality,
//       ciudad: city,
//       roles: userRoles,
//       cuentas: [],
//       nivelDoctoristrador: niveles[Math.floor(Math.random() * niveles.length)],
//     });
//   }

//   return users;
// };

// const bulkRegisterUsers = async () => {
//   try {
//     await connectDB();

//     const roles = await Role.find();
//     if (!roles.length) {
//       console.log('⚠️ No hay roles definidos en la BD.');
//       return;
//     }

//     const Doctors = generateUsers(10, roles, 'Doctoristrador', 'Doctor');

//     const insertados = await Doctor.insertMany(Doctors);

//     console.log(
//       `✅ Se insertaron ${insertados.length} usuarios como modelo Doctor.`
//     );

//     mongoose.connection.close();
//   } catch (error) {
//     console.error('❌ Error al registrar usuarios:', error.message);
//     mongoose.connection.close();
//   }
// };

// bulkRegisterUsers();

//Director

// const mongoose = require('mongoose');
// const connectDB = require('./database');
// const { Director } = require('../models/userModel');
// const Role = require('../models/roleModel');

// const sudAmericaCountries = [
//   'Argentina',
//   'Bolivia',
//   'Chile',
//   'Colombia',
//   'Ecuador',
//   'Paraguay',
//   'Perú',
//   'Uruguay',
//   'Venezuela',
//   'Surinam',
//   'Guyana',
//   'Belice',
// ];

// const citiesByCountry = {
//   Argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
//   Bolivia: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Potosí'],
//   Chile: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'La Serena'],
//   Colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
//   Ecuador: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Machala'],
//   Paraguay: ['Asunción', 'Ciudad del Este', 'Encarnación', 'PJC'],
//   Perú: ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo'],
//   Uruguay: ['Montevideo', 'Salto', 'Paysandú', 'Maldonado', 'Tacuarembó'],
//   Venezuela: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maturín'],
//   Surinam: ['Paramaribo', 'Nickerie', 'Albina', 'Moengo', 'Zanderij'],
//   Guyana: ['Georgetown', 'New Amsterdam', 'Anna Regina', 'Linden', 'Bartica'],
//   Belice: ['Belmopan', 'Belice', 'San Ignacio', 'Corozal', 'Orange Walk'],
// };

// const generateDNI = () =>
//   Math.floor(Math.random() * 1000000000)
//     .toString()
//     .padStart(9, '0');

// const generateUsers = (numUsers, allRoles, baseRoleAlias, nombrePrefix) => {
//   const users = [];
//   const apellidos = ['Perez', 'Lopez', 'Ramirez', 'Gonzalez', 'Martinez'];

//   const baseRole = allRoles.find((r) => r.alias === baseRoleAlias);
//   if (!baseRole) {
//     throw new Error(`❌ No se encontró el rol con alias: ${baseRoleAlias}`);
//   }

//   const otherRoles = allRoles.filter((r) => r.alias !== baseRoleAlias);

//   for (let i = 1; i <= numUsers; i++) {
//     const apellido = apellidos[i % apellidos.length];
//     const nationality =
//       sudAmericaCountries[
//         Math.floor(Math.random() * sudAmericaCountries.length)
//       ];
//     const city =
//       citiesByCountry[nationality][
//         Math.floor(Math.random() * citiesByCountry[nationality].length)
//       ];

//     const userRoles = [baseRole._id];
//     const extraCount = Math.floor(Math.random() * 2); // 0 o 1 rol extra
//     for (let j = 0; j < extraCount; j++) {
//       const randomRole =
//         otherRoles[Math.floor(Math.random() * otherRoles.length)]._id;
//       if (!userRoles.includes(randomRole)) userRoles.push(randomRole);
//     }

//     users.push({
//       __t: 'Director', // importante para que se guarde como Doctor
//       nombre: `${nombrePrefix} ${i}`,
//       apellido,
//       dni: generateDNI(),
//       nacionalidad: nationality,
//       ciudad: city,
//       roles: userRoles,
//       cuentas: [],
//       servicios: [],
//       especialaides: [],
//       horariosAtencion: [],
//     });
//   }

//   return users;
// };

// const bulkRegisterUsers = async () => {
//   try {
//     await connectDB();

//     const roles = await Role.find();
//     if (!roles.length) {
//       console.log('⚠️ No hay roles definidos en la BD.');
//       return;
//     }

//     const DirectoresMedicos = generateUsers(10, roles, 'director', 'Director');

//     const insertados = await Director.insertMany(DirectoresMedicos);

//     console.log(
//       `✅ Se insertaron ${insertados.length} usuarios como modelo JefeMedico.`
//     );

//     mongoose.connection.close();
//   } catch (error) {
//     console.error('❌ Error al registrar usuarios:', error.message);
//     mongoose.connection.close();
//   }
// };

// bulkRegisterUsers();

//Doctor

const mongoose = require('mongoose')
const connectDB = require('./database')
const { Doctor } = require('../models/userModel')
const Role = require('../models/roleModel')

const sudAmericaCountries = [
  'Argentina',
  'Bolivia',
  'Chile',
  'Colombia',
  'Ecuador',
  'Paraguay',
  'Perú',
  'Uruguay',
  'Venezuela',
  'Surinam',
  'Guyana',
  'Belice'
]

const citiesByCountry = {
  Argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
  Bolivia: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Potosí'],
  Chile: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'La Serena'],
  Colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
  Ecuador: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Machala'],
  Paraguay: ['Asunción', 'Ciudad del Este', 'Encarnación', 'PJC'],
  Perú: ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo'],
  Uruguay: ['Montevideo', 'Salto', 'Paysandú', 'Maldonado', 'Tacuarembó'],
  Venezuela: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maturín'],
  Surinam: ['Paramaribo', 'Nickerie', 'Albina', 'Moengo', 'Zanderij'],
  Guyana: ['Georgetown', 'New Amsterdam', 'Anna Regina', 'Linden', 'Bartica'],
  Belice: ['Belmopan', 'Belice', 'San Ignacio', 'Corozal', 'Orange Walk']
}

const generateDNI = () =>
  Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0')

const generateUsers = (numUsers, allRoles, baseRoleAlias, nombrePrefix) => {
  const users = []
  const apellidos = ['Perez', 'Lopez', 'Ramirez', 'Gonzalez', 'Martinez']

  const baseRole = allRoles.find(r => r.alias === baseRoleAlias)
  if (!baseRole) {
    throw new Error(`❌ No se encontró el rol con alias: ${baseRoleAlias}`)
  }

  const otherRoles = allRoles.filter(r => r.alias !== baseRoleAlias)

  for (let i = 1; i <= numUsers; i++) {
    const apellido = apellidos[i % apellidos.length]
    const nationality =
      sudAmericaCountries[
        Math.floor(Math.random() * sudAmericaCountries.length)
      ]
    const city =
      citiesByCountry[nationality][
        Math.floor(Math.random() * citiesByCountry[nationality].length)
      ]

    const userRoles = [baseRole._id]
    const extraCount = Math.floor(Math.random() * 2) // 0 o 1 rol extra
    for (let j = 0; j < extraCount; j++) {
      const randomRole =
        otherRoles[Math.floor(Math.random() * otherRoles.length)]._id
      if (!userRoles.includes(randomRole)) userRoles.push(randomRole)
    }

    users.push({
      __t: 'Doctor', // importante para que se guarde como Doctor
      nombre: `${nombrePrefix} ${i}`,
      apellido,
      dni: generateDNI(),
      nacionalidad: nationality,
      ciudad: city,
      roles: userRoles,
      cuentas: [],
      especialaides: [],
      horarios: [],
      programacionCitas: []
    })
  }

  return users
}

const bulkRegisterUsers = async () => {
  try {
    await connectDB()

    const roles = await Role.find()
    if (!roles.length) {
      console.log('⚠️ No hay roles definidos en la BD.')
      return
    }

    const Doctors = generateUsers(10, roles, 'doctor', 'Doctor')

    const insertados = await Doctor.insertMany(Doctors)

    console.log(
      `✅ Se insertaron ${insertados.length} usuarios como modelo Doctor.`
    )

    mongoose.connection.close()
  } catch (error) {
    console.error('❌ Error al registrar usuarios:', error.message)
    mongoose.connection.close()
  }
}

bulkRegisterUsers()

//paciente;

// const mongoose = require('mongoose');
// const connectDB = require('./database');
// const { Paciente } = require('../models/userModel');
// const Role = require('../models/roleModel');

// const sudAmericaCountries = [
//   'Argentina',
//   'Bolivia',
//   'Chile',
//   'Colombia',
//   'Ecuador',
//   'Paraguay',
//   'Perú',
//   'Uruguay',
//   'Venezuela',
//   'Surinam',
//   'Guyana',
//   'Belice',
// ];

// const citiesByCountry = {
//   Argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
//   Bolivia: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Potosí'],
//   Chile: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'La Serena'],
//   Colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
//   Ecuador: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Machala'],
//   Paraguay: ['Asunción', 'Ciudad del Este', 'Encarnación', 'PJC'],
//   Perú: ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo'],
//   Uruguay: ['Montevideo', 'Salto', 'Paysandú', 'Maldonado', 'Tacuarembó'],
//   Venezuela: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maturín'],
//   Surinam: ['Paramaribo', 'Nickerie', 'Albina', 'Moengo', 'Zanderij'],
//   Guyana: ['Georgetown', 'New Amsterdam', 'Anna Regina', 'Linden', 'Bartica'],
//   Belice: ['Belmopan', 'Belice', 'San Ignacio', 'Corozal', 'Orange Walk'],
// };

// const generateDNI = () =>
//   Math.floor(Math.random() * 1000000000)
//     .toString()
//     .padStart(9, '0');

// const generateUsers = (numUsers, allRoles, baseRoleAlias, nombrePrefix) => {
//   const users = [];
//   const apellidos = ['Perez', 'Lopez', 'Ramirez', 'Gonzalez', 'Martinez'];

//   const baseRole = allRoles.find((r) => r.alias === baseRoleAlias);
//   if (!baseRole) {
//     throw new Error(`❌ No se encontró el rol con alias: ${baseRoleAlias}`);
//   }

//   const otherRoles = allRoles.filter((r) => r.alias !== baseRoleAlias);

//   for (let i = 1; i <= numUsers; i++) {
//     const apellido = apellidos[i % apellidos.length];
//     const nationality =
//       sudAmericaCountries[
//         Math.floor(Math.random() * sudAmericaCountries.length)
//       ];
//     const city =
//       citiesByCountry[nationality][
//         Math.floor(Math.random() * citiesByCountry[nationality].length)
//       ];

//     const userRoles = [baseRole._id];
//     const extraCount = Math.floor(Math.random() * 2); // 0 o 1 rol extra
//     for (let j = 0; j < extraCount; j++) {
//       const randomRole =
//         otherRoles[Math.floor(Math.random() * otherRoles.length)]._id;
//       if (!userRoles.includes(randomRole)) userRoles.push(randomRole);
//     }

//     users.push({
//       __t: 'Paciente', // importante para que se guarde como Doctor
//       nombre: `${nombrePrefix} ${i}`,
//       apellido,
//       dni: generateDNI(),
//       nacionalidad: nationality,
//       ciudad: city,
//       roles: userRoles,
//       cuentas: [],
//       citas: [],
//       historialClinico: [],
//     });
//   }

//   return users;
// };

// const bulkRegisterUsers = async () => {
//   try {
//     await connectDB();

//     const roles = await Role.find();
//     if (!roles.length) {
//       console.log('⚠️ No hay roles definidos en la BD.');
//       return;
//     }

//     const Pacientess = generateUsers(10, roles, 'paciente', 'Paciente');

//     const insertados = await Paciente.insertMany(Pacientess);

//     console.log(
//       `✅ Se insertaron ${insertados.length} usuarios como modelo Paciente.`
//     );

//     mongoose.connection.close();
//   } catch (error) {
//     console.error('❌ Error al registrar usuarios:', error.message);
//     mongoose.connection.close();
//   }
// };

// bulkRegisterUsers();
