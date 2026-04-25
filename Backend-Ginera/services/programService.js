const Program = require('../models/Program');

exports.getAllPrograms = async () => {
  return await Program.find().sort({ createdAt: -1 });
};

exports.createProgram = async (programData) => {
  const program = new Program(programData);
  return await program.save();
};

exports.updateProgram = async (id, programData) => {
  return await Program.findByIdAndUpdate(id, programData, { new: true });
};

exports.deleteProgram = async (id) => {
  return await Program.findByIdAndDelete(id);
};
