const testimonialService = require('../services/testimonialService');
const fs = require('fs');
const path = require('path');
const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getAllTestimonials();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, role, content, rating } = req.body;
    let imageUrl = '';
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const testimonial = await testimonialService.createTestimonial({
      name, role, content, rating, imageUrl
    });
    
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { name, role, content, rating } = req.body;
    const updateData = { name, role, content, rating };
    
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
      const oldTestimonial = await Testimonial.findById(req.params.id);
      if (oldTestimonial && oldTestimonial.imageUrl) {
         const oldPath = path.join(__dirname, '..', oldTestimonial.imageUrl);
         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const testimonial = await testimonialService.updateTestimonial(req.params.id, updateData);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial && testimonial.imageUrl) {
        const oldPath = path.join(__dirname, '..', testimonial.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    
    await testimonialService.deleteTestimonial(req.params.id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
