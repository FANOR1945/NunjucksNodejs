const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  alias: { type: String, required: true },
  descripcion: { type: String },
  permisos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
});

module.exports = mongoose.model('Role', RoleSchema);
