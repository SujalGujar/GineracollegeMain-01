const multer = require('multer');
const path = require('path');
const HistoryContent = require('../models/HistoryContent');
const Milestone = require('../models/Milestone');
const DeanMessage = require('../models/DeanMessage');
const CollegeLogo = require('../models/CollegeLogo');
const VisionMission = require('../models/VisionMission');
const CoreValue = require('../models/CoreValue');
const AboutImage = require('../models/AboutImage');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});

const ABOUT_IMAGE_SLOTS = [
  { key: 'missionValues', title: 'Mission & Values Image', alt: 'Mission & Values', order: 1 },
  { key: 'visionGoals', title: 'Vision & Goals Image', alt: 'Vision & Goals', order: 2 },
  { key: 'visionMain', title: 'Vision Section Image', alt: 'Our Vision for Medical Excellence', order: 3 },
  { key: 'missionMain', title: 'Mission Section Image', alt: 'Our Mission in Action', order: 4 },
  { key: 'historyHero', title: 'History Hero Banner Image', alt: 'Our History Banner', order: 5 },
  { key: 'historyTimeline', title: 'Institutional Timeline Image', alt: 'Institutional Timeline', order: 6 },
  { key: 'historyLegacy', title: 'Legacy of Excellence Image', alt: 'Legacy of Excellence', order: 7 },
];

const ensureAboutImageSlots = async () => {
  const docs = await Promise.all(ABOUT_IMAGE_SLOTS.map(slot =>
    AboutImage.findOneAndUpdate(
      { key: slot.key },
      { $setOnInsert: slot },
      { upsert: true, returnDocument: 'after' }
    )
  ));
  return docs.sort((a, b) => a.order - b.order);
};

// ─── MILESTONES ────────────────────────────────────────────────────────────────
exports.getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find().sort({ order: -1, year: -1 });
    res.json(milestones);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createMilestone = async (req, res) => {
  try {
    const count = await Milestone.countDocuments();
    const requestedOrder = Number(req.body.order);
    const milestone = new Milestone({ 
      ...req.body, 
      order: Number.isFinite(requestedOrder) ? Math.max(0, requestedOrder) : count + 1
    });
    await milestone.save();
    res.status(201).json(milestone);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateMilestone = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.order !== undefined) {
      const requestedOrder = Number(updates.order);
      updates.order = Number.isFinite(requestedOrder) ? Math.max(0, requestedOrder) : 0;
    }
    const milestone = await Milestone.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!milestone) return res.status(404).json({ message: 'Not found' });
    res.json(milestone);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteMilestone = async (req, res) => {
  try {
    await Milestone.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ─── DEAN MESSAGE ──────────────────────────────────────────────────────────────
exports.getDeanMessage = async (req, res) => {
  try {
    let dean = await DeanMessage.findOne();
    if (!dean) {
      dean = await DeanMessage.create({
        paragraphs: [
          "It is my immense pleasure to welcome all students, faculty members, and visitors to Government College of Nursing, GINERA.",
          "I extend my deepest gratitude to our dedicated and highly qualified faculty who are the backbone of our institution.",
          "Dear Students, You have chosen a noble profession—a calling to serve humanity with empathy, dedication, and skill.",
          "Dear Valued Visitors, Whether you are a prospective student, a parent, or a partner from a healthcare institution, we welcome you to our vibrant community."
        ]
      });
    }
    res.json(dean);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateDeanMessage = [
  upload.single('photo'),
  async (req, res) => {
    try {
      let dean = await DeanMessage.findOne();
      const updates = { ...req.body };
      if (req.body.paragraphs && typeof req.body.paragraphs === 'string') {
        updates.paragraphs = JSON.parse(req.body.paragraphs);
      }
      if (req.body.stats && typeof req.body.stats === 'string') {
        updates.stats = JSON.parse(req.body.stats);
      }
      if (req.file) {
        const cloudUrl = await uploadToCloudinary(req.file.path, 'ginera-about');
        updates.photoUrl = cloudUrl || '/uploads/' + req.file.filename;
      }

      if (dean) {
        Object.assign(dean, updates);
        await dean.save();
      } else {
        dean = await DeanMessage.create(updates);
      }
      res.json(dean);
    } catch (err) { res.status(400).json({ message: err.message }); }
  }
];

// ─── COLLEGE LOGO ──────────────────────────────────────────────────────────────
exports.getCollegeLogo = async (req, res) => {
  try {
    let logo = await CollegeLogo.findOne();
    if (!logo) logo = await CollegeLogo.create({});
    res.json(logo);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateCollegeLogo = [
  upload.single('logo'),
  async (req, res) => {
    try {
      let logo = await CollegeLogo.findOne();
      const updates = { ...req.body };
      if (req.file) {
        const cloudUrl = await uploadToCloudinary(req.file.path, 'ginera-logos');
        updates.logoUrl = cloudUrl || '/uploads/' + req.file.filename;
      }
      if (logo) {
        Object.assign(logo, updates);
        await logo.save();
      } else {
        logo = await CollegeLogo.create(updates);
      }
      res.json(logo);
    } catch (err) { res.status(400).json({ message: err.message }); }
  }
];

// ─── VISION & MISSION ────────────────────────────────────────────────────────
// ABOUT PAGE IMAGES
exports.getAboutImages = async (req, res) => {
  try {
    const images = await ensureAboutImageSlots();
    res.json(images);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateAboutImage = [
  upload.single('image'),
  async (req, res) => {
    try {
      const slot = ABOUT_IMAGE_SLOTS.find(item => item.key === req.params.key);
      if (!slot) return res.status(404).json({ message: 'Image slot not found' });

      const updates = {
        title: req.body.title || slot.title,
        alt: req.body.alt || slot.alt,
        order: slot.order
      };
      if (req.file) {
        const cloudUrl = await uploadToCloudinary(req.file.path, 'ginera-about');
        updates.imageUrl = cloudUrl || '/uploads/' + req.file.filename;
      }

      const image = await AboutImage.findOneAndUpdate(
        { key: slot.key },
        { $set: updates, $setOnInsert: { key: slot.key } },
        { upsert: true, new: true, runValidators: true }
      );
      res.json(image);
    } catch (err) { res.status(400).json({ message: err.message }); }
  }
];

exports.clearAboutImage = async (req, res) => {
  try {
    const slot = ABOUT_IMAGE_SLOTS.find(item => item.key === req.params.key);
    if (!slot) return res.status(404).json({ message: 'Image slot not found' });

    const image = await AboutImage.findOneAndUpdate(
      { key: slot.key },
      { $set: { imageUrl: '', title: slot.title, alt: slot.alt, order: slot.order }, $setOnInsert: { key: slot.key } },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(image);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getVisionMission = async (req, res) => {
  try {
    const items = await VisionMission.find().sort({ order: 1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createVisionMission = async (req, res) => {
  try {
    const item = new VisionMission(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateVisionMission = async (req, res) => {
  try {
    const item = await VisionMission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteVisionMission = async (req, res) => {
  try {
    await VisionMission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// ─── CORE VALUES ─────────────────────────────────────────────────────────────
exports.getCoreValues = async (req, res) => {
  try {
    const items = await CoreValue.find().sort({ order: 1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createCoreValue = async (req, res) => {
  try {
    const item = new CoreValue(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateCoreValue = async (req, res) => {
  try {
    const item = await CoreValue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteCoreValue = async (req, res) => {
  try {
    await CoreValue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// ─── HISTORY CONTENT ─────────────────────────────────────────────────────────
exports.getHistoryContent = async (req, res) => {
  try {
    let history = await HistoryContent.findOne();
    if (!history) {
      history = await HistoryContent.create({});
    }
    res.json(history);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateHistoryContent = async (req, res) => {
  try {
    let history = await HistoryContent.findOne();
    const updates = { ...req.body };
    if (typeof updates.timelineParagraphs === 'string') {
      try { updates.timelineParagraphs = JSON.parse(updates.timelineParagraphs); } catch { }
    }
    if (typeof updates.legacyParagraphs === 'string') {
      try { updates.legacyParagraphs = JSON.parse(updates.legacyParagraphs); } catch { }
    }
    if (history) {
      Object.assign(history, updates);
      await history.save();
    } else {
      history = await HistoryContent.create(updates);
    }
    res.json(history);
  } catch (err) { res.status(400).json({ message: err.message }); }
};
