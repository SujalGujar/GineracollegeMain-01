const express = require('express');
const router = express.Router();

const Slider = require('../models/Slider');
const Program = require('../models/Program');
const Content = require('../models/Content');
const Testimonial = require('../models/Testimonial');
const SectionVisibility = require('../models/SectionVisibility');
const Department = require('../models/Department');

/**
 * Aggregated Screen Initializer Endpoint
 * GET /api/screen/init?screen=home
 * Executes database queries in parallel with Promise.all()
 */
router.get('/init', async (req, res) => {
  const { screen = 'home' } = req.query;

  try {
    if (screen === 'home') {
      const [
        sliders,
        programs,
        academicContent,
        testimonials,
        visibility
      ] = await Promise.all([
        Slider.find({ department: null }).sort({ createdAt: -1 }).lean(),
        Program.find().sort({ order: 1 }).lean(),
        Content.findOne({ page: 'academic' }).lean(),
        Testimonial.find().sort({ createdAt: -1 }).lean(),
        SectionVisibility.find().lean()
      ]);

      return res.json({
        screen: 'home',
        sliders: sliders || [],
        programs: programs || [],
        academicContent: academicContent || {},
        testimonials: testimonials || [],
        visibility: visibility || []
      });
    }

    if (screen === 'admin') {
      const [
        departments,
        slidersCount,
        programsCount,
        testimonialsCount,
        visibility
      ] = await Promise.all([
        Department.find().select('name slug category').lean(),
        Slider.countDocuments(),
        Program.countDocuments(),
        Testimonial.countDocuments(),
        SectionVisibility.find().lean()
      ]);

      return res.json({
        screen: 'admin',
        departments: departments || [],
        counts: {
          sliders: slidersCount,
          programs: programsCount,
          testimonials: testimonialsCount
        },
        visibility: visibility || []
      });
    }

    return res.status(400).json({ message: `Unknown screen parameter: ${screen}` });
  } catch (error) {
    console.error('Error in /api/screen/init:', error);
    res.status(500).json({ message: 'Error initializing screen data', error: error.message });
  }
});

module.exports = router;
