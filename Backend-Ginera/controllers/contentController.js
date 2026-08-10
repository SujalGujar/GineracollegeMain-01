const Content = require('../models/Content');

exports.getContent = async (req, res) => {
  try {
    const { section } = req.params;
    let content = await Content.findOne({ section }).lean();
    if (!content) {
        // Return default if not found
        if (section === 'academic') {
            content = {
                section: 'academic',
                title: 'Academic Programs',
                description1: 'Academic nursing programs are structured educational pathways designed to prepare individuals for the nursing profession — from entry-level bedside care to advanced clinical practice, education, and research.',
                description2: 'Programs span 4 years (Undergraduate), 3 years (Diploma), 2 years (Masters in Nursing), and 1 year (Post-Basic Diploma).'
            };
        } else {
            return res.status(404).json({ message: 'Content not found' });
        }
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { section } = req.params;
    const { title, description1, description2 } = req.body;
    
    let content = await Content.findOne({ section });
    if (content) {
        content.title = title;
        content.description1 = description1;
        content.description2 = description2;
        await content.save();
    } else {
        content = new Content({ section, title, description1, description2 });
        await content.save();
    }
    
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
