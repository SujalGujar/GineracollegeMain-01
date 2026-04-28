const Slider = require('../models/Slider');

exports.getAllSliders = async () => {
  return await Slider.find({ department: null }).sort({ createdAt: -1 });
};

exports.getSlidersByDepartment = async (departmentId) => {
  return await Slider.find({ department: departmentId }).sort({ createdAt: -1 });
};

exports.createSliders = async (sliderDataArray) => {
  return await Slider.insertMany(sliderDataArray);
};

exports.updateSlider = async (id, updateData) => {
  return await Slider.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteSlider = async (id) => {
  return await Slider.findByIdAndDelete(id);
};
