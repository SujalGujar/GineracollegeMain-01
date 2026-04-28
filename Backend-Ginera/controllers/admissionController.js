const Course = require('../models/Course');
const AdmissionStep = require('../models/AdmissionStep');
const AdmissionRule = require('../models/AdmissionRule');

// ─── COURSES ───────────────────────────────────────────────────────────────────
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ order: 1 });
    res.json(courses);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createCourse = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    const course = new Course({ ...req.body, order: count });
    await course.save();
    res.status(201).json(course);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.json(course);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ─── ADMISSION STEPS ──────────────────────────────────────────────────────────
exports.getAdmissionSteps = async (req, res) => {
  try {
    const steps = await AdmissionStep.find().sort({ order: 1, step: 1 });
    res.json(steps);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createAdmissionStep = async (req, res) => {
  try {
    const count = await AdmissionStep.countDocuments();
    const step = new AdmissionStep({ ...req.body, order: count });
    await step.save();
    res.status(201).json(step);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateAdmissionStep = async (req, res) => {
  try {
    const step = await AdmissionStep.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!step) return res.status(404).json({ message: 'Not found' });
    res.json(step);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteAdmissionStep = async (req, res) => {
  try {
    await AdmissionStep.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ─── ADMISSION RULES ──────────────────────────────────────────────────────────
exports.getAdmissionRules = async (req, res) => {
  try {
    const rules = await AdmissionRule.find().sort({ order: 1 });
    res.json(rules);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createAdmissionRule = async (req, res) => {
  try {
    const count = await AdmissionRule.countDocuments();
    const rule = new AdmissionRule({ ...req.body, order: count });
    await rule.save();
    res.status(201).json(rule);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateAdmissionRule = async (req, res) => {
  try {
    const rule = await AdmissionRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rule) return res.status(404).json({ message: 'Not found' });
    res.json(rule);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteAdmissionRule = async (req, res) => {
  try {
    await AdmissionRule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
