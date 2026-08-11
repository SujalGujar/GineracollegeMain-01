const sliderService = require('../services/sliderService');
const mongoose = require('mongoose');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary');

const checkDbConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: 'Database not connected', 
      error: 'The server is unable to reach MongoDB Atlas. Please ensure your IP is whitelisted in MongoDB Network Access settings.' 
    });
  }
  return null;
};

exports.getSliders = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { department } = req.query;
    let sliders;
    if (department && department !== 'null' && department !== 'undefined' && department !== 'all') {
      sliders = await sliderService.getSlidersByDepartment(department);
    } else if (department === 'null' || !department || department === 'undefined') {
      sliders = await sliderService.getHomepageSliders();
    } else {
      sliders = await sliderService.getAllSliders();
    }
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sliders', error: error.message });
  }
};

exports.uploadSliders = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const sliderDataArray = await Promise.all(
      req.files.map(async (file) => {
        let dept = req.body.department;
        if (dept === 'null' || dept === 'undefined' || !dept) {
          dept = null;
        }
        const cloudUrl = await uploadToCloudinary(file.path, 'ginera-sliders');
        return {
          title: req.body.title || 'Ginera College Slider',
          imageUrl: cloudUrl || `/uploads/${file.filename}`,
          department: dept,
        };
      })
    );

    const savedSliders = await sliderService.createSliders(sliderDataArray);
    res.status(201).json(savedSliders);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading sliders', error: error.message });
  }
};

exports.updateSlider = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    if (req.file) {
      const cloudUrl = await uploadToCloudinary(req.file.path, 'ginera-sliders');
      updateData.imageUrl = cloudUrl || `/uploads/${req.file.filename}`;
    }
    const slider = await sliderService.updateSlider(id, updateData);
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ message: 'Error updating slider', error: error.message });
  }
};

exports.deleteSlider = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { id } = req.params;
    await sliderService.deleteSlider(id);
    res.status(200).json({ message: 'Slider deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting slider', error: error.message });
  }
};
