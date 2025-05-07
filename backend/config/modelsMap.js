// config/modelsMap.js
const {
  User,
  Doctor,
  Admin,
  Director,
  Paciente,
} = require('../models/userModel');
const Account = require('../models/accountModel');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const Specialty = require('../models/specialtyModel');
const Service = require('../models/serviceModel');
const Schedule = require('../models/scheduleModel');
const Appointment = require('../models/Appointment');
const HistoryClinic = require('../models/HistoryClinic');

const modelsMap = {
  User,
  Doctor,
  Admin,
  Director,
  Paciente,
  Account,
  Role,
  Permission,
  Specialty,
  Service,
  Schedule,
  Appointment,
  HistoryClinic,
};

const refMap = {
  User: [['roles', 'permisos']],
  Doctor: [
    ['roles', 'permisos'],
    'cuentas',
    'especialidades',
    'horarios',
    'programacionCitas',
  ],
  Admin: [['roles', 'permisos'], 'cuentas'],
  Director: [
    ['roles', 'permisos'],
    'cuentas',
    'servicios',
    'especialidades',
    'horariosAtencion',
  ],
  Paciente: [['roles', 'permisos'], 'cuentas', 'citas', 'historialClinico'],
  Account: [
    {
      path: 'user',
      populate: [
        {
          path: 'roles',
          populate: { path: 'permisos' },
        },
      ],
    },
  ],
  Specialty: ['servicios'],
  Role: ['permisos'],
};

module.exports = { modelsMap, refMap };
