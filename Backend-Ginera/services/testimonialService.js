const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async () => {
  return await Testimonial.find().sort({ createdAt: -1 }).lean();
};

exports.createTestimonial = async (data) => {
  const testimonial = new Testimonial(data);
  return await testimonial.save();
};

exports.updateTestimonial = async (id, data) => {
  return await Testimonial.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTestimonial = async (id) => {
  return await Testimonial.findByIdAndDelete(id);
};
