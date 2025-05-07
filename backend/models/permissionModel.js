const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },

    // activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);


PermissionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Permission', PermissionSchema);
