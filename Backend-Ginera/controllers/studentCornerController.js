const StudentCornerSection = require('../models/StudentCornerSection');

const DEFAULT_SECTIONS = [
  {
    title: 'Documents for Transcript / Attempt / Course Completion / Transfers',
    subtitle: 'All Xerox Copies Required',
    tag: 'Transcript & Transfer',
    icon: '📄',
    color: '#F59E0B',
    borderColor: '#FCD34D',
    badgeColor: '#D97706',
    items: [
      'All Years Marksheet (All Attempts)',
      'Degree Certificate',
      'School Leaving Certificate',
      '10th Marksheet / 12th Marksheet',
      'Relieve Order',
      'GNC Registration Certificate',
    ],
    description: '',
    order: 1,
  },
  {
    title: 'Application for Refund of Security Deposit',
    subtitle: 'GNM Students Only',
    tag: 'GNM Students',
    icon: '🏦',
    color: '#10B981',
    borderColor: '#6EE7B7',
    badgeColor: '#059669',
    items: [
      'Relieve Order',
      'All Marksheets',
      'Bond Deposit Slip Xerox',
    ],
    description: '',
    order: 2,
  },
  {
    title: 'Foreign Verification',
    subtitle: 'Documents Required for Verification Abroad',
    tag: 'Foreign Verification',
    icon: '🌍',
    color: '#6366F1',
    borderColor: '#A5B4FC',
    badgeColor: '#4F46E5',
    items: [
      'Form Duly Filled – Two Copies',
      'School Leaving Certificate',
      'Joining Order',
      'Relieve Order',
      'All Mark Sheets',
      'GNC Registration Certificate',
      'Gujarat University Degree Certificate',
      'Syllabus (If Needed)',
      'Transcript',
    ],
    description: '',
    order: 3,
  },
];

// GET all sections (seeds defaults if empty)
exports.getAllSections = async (req, res) => {
  try {
    const count = await StudentCornerSection.countDocuments();
    if (count === 0) {
      await StudentCornerSection.insertMany(DEFAULT_SECTIONS);
    }
    const sections = await StudentCornerSection.find().sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create new section
exports.createSection = async (req, res) => {
  try {
    const count = await StudentCornerSection.countDocuments();
    const section = new StudentCornerSection({
      ...req.body,
      order: req.body.order !== undefined ? Number(req.body.order) : count + 1,
    });
    const saved = await section.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update section
exports.updateSection = async (req, res) => {
  try {
    const updated = await StudentCornerSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Section not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE section
exports.deleteSection = async (req, res) => {
  try {
    const deleted = await StudentCornerSection.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Section not found' });
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT reorder (bulk update order)
exports.reorderSections = async (req, res) => {
  try {
    const { orderedIds } = req.body; // array of { _id, order }
    if (!Array.isArray(orderedIds)) return res.status(400).json({ message: 'orderedIds must be an array' });
    await Promise.all(
      orderedIds.map(({ _id, order }) =>
        StudentCornerSection.findByIdAndUpdate(_id, { order })
      )
    );
    const sections = await StudentCornerSection.find().sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
