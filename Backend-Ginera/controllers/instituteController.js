const Institute = require('../models/Institute');

// Get all institutes
exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find().sort({ order: 1, createdAt: -1 });
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create an institute
exports.createInstitute = async (req, res) => {
  try {
    const institute = new Institute(req.body);
    const savedInstitute = await institute.save();
    res.status(201).json(savedInstitute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an institute
exports.updateInstitute = async (req, res) => {
  try {
    const updatedInstitute = await Institute.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInstitute) return res.status(404).json({ message: 'Institute not found' });
    res.json(updatedInstitute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an institute
exports.deleteInstitute = async (req, res) => {
  try {
    const deletedInstitute = await Institute.findByIdAndDelete(req.params.id);
    if (!deletedInstitute) return res.status(404).json({ message: 'Institute not found' });
    res.json({ message: 'Institute deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
