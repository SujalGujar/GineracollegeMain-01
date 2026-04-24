const Slider = require('../models/Slider');

exports.createSlider = async (data) => {
  const slider = new Slider(data);
  return await slider.save();
};

exports.getAllSliders = async () => {
  return await Slider.find().sort({ createdAt: -1 });
};

exports.deleteSlider = async (id) => {
  return await Slider.findByIdAndDelete(id);
};
