const AdmissionStep = require('../models/AdmissionStep');

exports.getAllSteps = async (req, res) => {
  try {
    const steps = await AdmissionStep.find().sort({ step: 1 });
    res.json(steps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStep = async (req, res) => {
  try {
    const step = new AdmissionStep(req.body);
    const newStep = await step.save();
    res.status(201).json(newStep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStep = async (req, res) => {
  try {
    const updatedStep = await AdmissionStep.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteStep = async (req, res) => {
  try {
    await AdmissionStep.findByIdAndDelete(req.params.id);
    res.json({ message: 'Step deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
