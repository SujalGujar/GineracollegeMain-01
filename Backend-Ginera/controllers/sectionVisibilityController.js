const SectionVisibility = require('../models/SectionVisibility');

const DEFAULT_SECTIONS = [
  // Home Page
  { sectionKey: 'home_hero', page: 'Home Page', sectionName: 'Hero Image Slider', description: 'Main banner slider on Home Page' },
  { sectionKey: 'home_quick_cards', page: 'Home Page', sectionName: 'Quick Announcement Cards', description: 'Top highlight cards on Home Page' },
  { sectionKey: 'home_academic', page: 'Home Page', sectionName: 'Academic Programs', description: 'Academic nursing programs section' },
  { sectionKey: 'home_dean', page: 'Home Page', sectionName: "Dean's Message Preview", description: "Dean's greeting section on Home Page" },
  { sectionKey: 'home_core_values', page: 'Home Page', sectionName: 'Core Values', description: 'Core institutional values section' },
  { sectionKey: 'home_gallery', page: 'Home Page', sectionName: 'Photo Gallery Preview', description: 'Campus & event photos preview' },
  { sectionKey: 'home_testimonials', page: 'Home Page', sectionName: 'Student Testimonials', description: 'Reviews and feedback from students' },
  { sectionKey: 'home_institutes', page: 'Home Page', sectionName: 'Affiliated Institutes', description: 'Partner hospitals & institutes section' },
  { sectionKey: 'home_contact', page: 'Home Page', sectionName: 'Contact Info Footer Card', description: 'Quick contact card near footer' },

  // About Us
  { sectionKey: 'about_logo', page: 'About Us', sectionName: 'Branding & Logo', description: 'College logo and emblem information' },
  { sectionKey: 'about_vision_mission', page: 'About Us', sectionName: 'Vision & Mission', description: 'Institutional vision, mission, and objectives' },
  { sectionKey: 'about_history', page: 'About Us', sectionName: 'History & Milestones', description: 'Timeline and historical milestones' },
  { sectionKey: 'about_core_values', page: 'About Us', sectionName: 'Core Values Detailed', description: 'Comprehensive core values page' },
  { sectionKey: 'about_dean_message', page: 'About Us', sectionName: "Dean's Full Message", description: "Full message from the Dean" },
  { sectionKey: 'about_achievements', page: 'About Us', sectionName: 'Achievements & Photo Showcase', description: 'Key achievements and campus photo gallery' },
  { sectionKey: 'about_location', page: 'About Us', sectionName: 'Location & Campus Map', description: 'Campus address and map coordinates' },

  // Admission
  { sectionKey: 'admission_courses', page: 'Admission', sectionName: 'Courses Offered', description: 'Available degree and diploma courses' },
  { sectionKey: 'admission_procedure', page: 'Admission', sectionName: 'Admission Steps & Procedure', description: 'Step-by-step application process' },
  { sectionKey: 'admission_rules', page: 'Admission', sectionName: 'Rules & Regulations', description: 'Code of conduct and admission rules' },
  { sectionKey: 'admission_instructions', page: 'Admission', sectionName: 'Instructions & Guidelines', description: 'Guidelines for applicants and parents' },

  // Departments
  { sectionKey: 'dept_fundamentals', page: 'Departments', sectionName: 'Fundamentals of Nursing', description: 'Fundamentals of Nursing department' },
  { sectionKey: 'dept_medical_surgical', page: 'Departments', sectionName: 'Medical Surgical Nursing', description: 'Medical Surgical Nursing department' },
  { sectionKey: 'dept_obstetric', page: 'Departments', sectionName: 'Obstetric & Gynaecological Nursing', description: 'Obstetric & Gynaecological Nursing department' },
  { sectionKey: 'dept_child_health', page: 'Departments', sectionName: 'Child Health Nursing', description: 'Child Health (Pediatric) Nursing department' },
  { sectionKey: 'dept_community', page: 'Departments', sectionName: 'Community Health Nursing', description: 'Community Health Nursing department' },
  { sectionKey: 'dept_mental_health', page: 'Departments', sectionName: 'Mental Health Nursing', description: 'Mental Health (Psychiatric) Nursing department' },

  // Gallery
  { sectionKey: 'gallery_college', page: 'Gallery', sectionName: 'College Campus Photos', description: 'Campus building and infrastructure photos' },
  { sectionKey: 'gallery_hospital', page: 'Gallery', sectionName: 'Hospital & Clinical Photos', description: 'Clinical facilities and lab photos' },
  { sectionKey: 'gallery_events', page: 'Gallery', sectionName: 'Events & Activities Photos', description: 'Cultural events and academic celebrations' },

  // Institutes
  { sectionKey: 'institutes_list', page: 'Institutes', sectionName: 'Affiliated Institutes List', description: 'List of affiliated colleges and nursing schools' },

  // Contact Us
  { sectionKey: 'contact_info', page: 'Contact Us', sectionName: 'Contact Information Cards', description: 'Address, telephone numbers, and email IDs' },
  { sectionKey: 'contact_key_persons', page: 'Contact Us', sectionName: 'Key Administrative Personnel', description: 'Directory of key staff and officials' },
  { sectionKey: 'contact_departments', page: 'Contact Us', sectionName: 'Department Directory', description: 'Phone numbers for individual departments' },
  { sectionKey: 'contact_feedback_form', page: 'Contact Us', sectionName: 'Feedback / Inquiry Form', description: 'Interactive contact & feedback form' },
  { sectionKey: 'contact_map', page: 'Contact Us', sectionName: 'Campus Google Map Location', description: 'Interactive embedded Google map' }
];

exports.getAllSectionVisibility = async (req, res) => {
  try {
    let sections = await SectionVisibility.find({}).sort({ page: 1, sectionName: 1 });

    // Seed defaults if any missing
    const existingKeys = new Set(sections.map(s => s.sectionKey));
    const missing = DEFAULT_SECTIONS.filter(ds => !existingKeys.has(ds.sectionKey));

    if (missing.length > 0) {
      await SectionVisibility.insertMany(missing.map(m => ({ ...m, isVisible: true })));
      sections = await SectionVisibility.find({}).sort({ page: 1, sectionName: 1 });
    }

    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSectionVisibility = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    const { isVisible } = req.body;

    let section = await SectionVisibility.findOne({ sectionKey });
    if (!section) {
      const defaultInfo = DEFAULT_SECTIONS.find(ds => ds.sectionKey === sectionKey);
      if (!defaultInfo) {
        return res.status(404).json({ message: 'Section not found' });
      }
      section = new SectionVisibility({
        ...defaultInfo,
        isVisible: Boolean(isVisible)
      });
    } else {
      section.isVisible = Boolean(isVisible);
    }

    await section.save();
    res.json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBulkSectionVisibility = async (req, res) => {
  try {
    const { updates, page, isVisible } = req.body;

    if (Array.isArray(updates)) {
      // updates format: [{ sectionKey: '...', isVisible: true/false }]
      const bulkOps = updates.map(u => ({
        updateOne: {
          filter: { sectionKey: u.sectionKey },
          update: { $set: { isVisible: Boolean(u.isVisible) } },
          upsert: true
        }
      }));
      await SectionVisibility.bulkWrite(bulkOps);
    } else if (page && typeof isVisible === 'boolean') {
      // Update all sections under a specific page
      await SectionVisibility.updateMany(
        { page },
        { $set: { isVisible } }
      );
    }

    const sections = await SectionVisibility.find({}).sort({ page: 1, sectionName: 1 });
    res.json(sections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
