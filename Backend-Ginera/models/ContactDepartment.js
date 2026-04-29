const mongoose = require('mongoose');

const contactDepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  icon: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ContactDepartment', contactDepartmentSchema);
