const Slider = require('../models/Slider');
const Department = require('../models/Department');
const mongoose = require('mongoose');

exports.getAllSliders = async () => {
  return await Slider.find().populate('department').sort({ createdAt: -1 }).lean();
};


exports.getHomepageSliders = async () => {
  return await Slider.find({ department: null }).sort({ createdAt: -1 }).lean();
};

exports.getSlidersByDepartment = async (departmentId) => {
  let targetId = departmentId;
  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    const dept = await Department.findOne({ slug: departmentId }).select('_id').lean();
    if (dept) {
      targetId = dept._id;
    } else {
      return [];
    }
  }
  return await Slider.find({ department: targetId }).populate('department').sort({ createdAt: -1 }).lean();
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
