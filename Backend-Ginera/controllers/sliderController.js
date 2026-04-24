const sliderService = require('../services/sliderService');
const mongoose = require('mongoose');

const checkDbConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: 'Database not connected', 
      error: 'The server is unable to reach MongoDB Atlas. Please ensure your IP is whitelisted in MongoDB Network Access settings.' 
    });
  }
  return null;
};

exports.uploadSliderImages = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const savedSliders = [];
    for (const file of req.files) {
      const imageUrl = `/uploads/${file.filename}`;
      const slider = await sliderService.createSlider({
        title: req.body.title || '',
        imageUrl
      });
      savedSliders.push(slider);
    }

    res.status(201).json({
      message: 'Images uploaded successfully',
      data: savedSliders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error: error.message });
  }
};

exports.getSliders = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const sliders = await sliderService.getAllSliders();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sliders', error: error.message });
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
