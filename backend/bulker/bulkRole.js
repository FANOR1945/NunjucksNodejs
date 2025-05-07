const mongoose = require('mongoose');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const connectDB = require('./database');

const roles = [
  'Administrador',
  'Doctor',
  'Paciente',
  'Viewer',
  'Manager',
  'Contributor',
  'Moderator',
  'SuperAdmin',
  'Guest',
  'Support',
  'Auditor',
  'Developer',
  'Designer',
  'Analyst',
  'DataEntry',
  'HR',
  'Director',
  'Jefe Medico', // 🆕 Nuevo rol agregado
  'Paciente',
];

// Función optimizada para obtener permisos aleatorios
const getRandomPermissions = async (min, max) => {
  try {
    const permissions = await Permission.find().select('_id');
    const shuffled = permissions.sort(() => 0.5 - Math.random());

    const numberOfPermissions = Math.min(
      Math.floor(Math.random() * (max - min + 1)) + min,
      permissions.length
    );

    return shuffled.slice(0, numberOfPermissions).map((p) => p._id);
  } catch (error) {
    console.error('❌ Error al obtener permisos aleatorios:', error);
    return [];
  }
};

const updateRoles = async () => {
  try {
    await connectDB();
    console.log('✅ Conectado a la base de datos.');

    for (const roleName of roles) {
      const role = await Role.findOne({ nombre: roleName });

      if (role) {
        const existingPermissions = role.permisos.map((p) => p.toString());
        const randomPermissions = await getRandomPermissions(1, 3);

        const newPermissions = randomPermissions.filter(
          (p) => !existingPermissions.includes(p.toString())
        );

        if (newPermissions.length > 0) {
          role.permisos.push(...newPermissions);
          await role.save();
          console.log(
            `🔄 Rol "${roleName}" actualizado con ${newPermissions.length} nuevo(s) permiso(s).`
          );
        } else {
          console.log(
            `✅ Rol "${roleName}" ya tiene todos los permisos necesarios.`
          );
        }
      } else {
        const randomPermissions = await getRandomPermissions(1, 3);
        const newRole = new Role({
          nombre: roleName,
          alias: roleName.toLowerCase(),
          descripcion: `Rol de ${roleName.toLowerCase()}`,
          permisos: randomPermissions,
        });

        await newRole.save();
        console.log(
          `🆕 Rol "${roleName}" creado con ${randomPermissions.length} permiso(s).`
        );
      }
    }
  } catch (error) {
    console.error('❌ Error al actualizar o crear los roles:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada.');
  }
};

updateRoles();
