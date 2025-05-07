const mongoose = require('mongoose');
const Permission = require('../models/permissionModel');
const connectDB = require('./database');

const permissions = [
  {
    nombre: 'view_dashboard',
    descripcion: 'Permiso para ver el panel de control',
  },
  { nombre: 'manage_users', descripcion: 'Permiso para gestionar usuarios' },
  { nombre: 'view_reports', descripcion: 'Permiso para ver reportes' },
  { nombre: 'edit_content', descripcion: 'Permiso para editar contenido' },
  { nombre: 'delete_content', descripcion: 'Permiso para eliminar contenido' },
  { nombre: 'manage_roles', descripcion: 'Permiso para gestionar roles' },
  {
    nombre: 'manage_permissions',
    descripcion: 'Permiso para gestionar permisos',
  },
  {
    nombre: 'manage_settings',
    descripcion: 'Permiso para gestionar configuraciones',
  },
  { nombre: 'create_items', descripcion: 'Permiso para crear ítems' },
  {
    nombre: 'view_audit_logs',
    descripcion: 'Permiso para ver los registros de auditoría',
  },
  { nombre: 'manage_support', descripcion: 'Permiso para gestionar soporte' },
  {
    nombre: 'view_user_profiles',
    descripcion: 'Permiso para ver los perfiles de los usuarios',
  },
  { nombre: 'update_items', descripcion: 'Permiso para actualizar ítems' },
  { nombre: 'approve_content', descripcion: 'Permiso para aprobar contenido' },
];

const registerPermissions = async () => {
  try {
    await connectDB();

    // Obtener nombres ya existentes en la colección
    const existing = await Permission.find({}, 'nombre');
    const existingNames = existing.map((perm) => perm.nombre);

    // Filtrar los permisos que aún no están en la base
    const newPermissions = permissions.filter(
      (perm) => !existingNames.includes(perm.nombre)
    );

    if (newPermissions.length === 0) {
      console.log('✅ Todos los permisos ya están registrados.');
    } else {
      await Permission.insertMany(newPermissions);
      console.log(
        `🆕 Se registraron ${newPermissions.length} nuevos permisos.`
      );
    }
  } catch (error) {
    console.error('❌ Error al registrar permisos:', error);
  } finally {
    mongoose.connection.close();
  }
};

registerPermissions();
