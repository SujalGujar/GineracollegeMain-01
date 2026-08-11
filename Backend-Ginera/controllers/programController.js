const programService = require('../services/programService');
const mongoose = require('mongoose');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary');

const checkDbConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: 'Database not connected', 
      error: 'The server is unable to reach MongoDB Atlas.' 
    });
  }
  return null;
};

exports.getPrograms = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const programs = await programService.getAllPrograms();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching programs', error: error.message });
  }
};

exports.createProgram = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    let imageUrl = '';
    if (req.file) {
      const cloudUrl = await uploadToCloudinary(req.file.path, 'ginera-programs');
      imageUrl = cloudUrl || `/uploads/${req.file.filename}`;
    }
    const programData = {
      ...req.body,
      imageUrl,
      imageUrls: imageUrl ? [imageUrl] : [],
      courses: req.body.courses ? JSON.parse(req.body.courses) : []
    };
    const program = await programService.createProgram(programData);
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error creating program', error: error.message });
  }
};

exports.updateProgram = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    if (req.file) {
      const cloudUrl = await uploadToCloudinary(req.file.path, 'ginera-programs');
      updateData.imageUrl = cloudUrl || `/uploads/${req.file.filename}`;
      updateData.imageUrls = [updateData.imageUrl];
    }
    if (req.body.courses) {
      updateData.courses = JSON.parse(req.body.courses);
    }
    const program = await programService.updateProgram(id, updateData);
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error updating program', error: error.message });
  }
};

exports.deleteProgram = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { id } = req.params;
    await programService.deleteProgram(id);
    res.status(200).json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting program', error: error.message });
  }
};
