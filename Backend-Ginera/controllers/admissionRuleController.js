const AdmissionRule = require('../models/AdmissionRule');

exports.getAllRules = async (req, res) => {
  try {
    const rules = await AdmissionRule.find();
    res.json(rules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRule = async (req, res) => {
  try {
    const rule = new AdmissionRule(req.body);
    const newRule = await rule.save();
    res.status(201).json(newRule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRule = async (req, res) => {
  try {
    const updatedRule = await AdmissionRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRule = async (req, res) => {
  try {
    await AdmissionRule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rule deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
