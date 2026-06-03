const GalleryImage = require('../models/GalleryImage');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

exports.getGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const images = await GalleryImage.find(query).sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery images', error: error.message });
  }
};

exports.addGalleryImage = async (req, res) => {
  try {
    const { title, description, category, mediaType } = req.body;
    
    if (!title || !category) {
      return res.status(400).json({ message: 'Title and category are required' });
    }

    const type = mediaType || 'image';

    if (!req.file) {
      return res.status(400).json({ message: `No ${type} file uploaded` });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const newImage = new GalleryImage({
      title,
      description,
      category,
      mediaType: type,
      imageUrl: type === 'image' ? fileUrl : undefined,
      videoUrl: type === 'video' ? fileUrl : undefined,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading media', error: error.message });
  }
};

exports.updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, mediaType } = req.body;
    
    let updateData = { title, description, category };
    if (mediaType) updateData.mediaType = mediaType;
    
    if (req.file) {
      const fileUrl = `/uploads/${req.file.filename}`;
      if (mediaType === 'video') {
        updateData.videoUrl = fileUrl;
      } else {
        updateData.imageUrl = fileUrl;
      }
    }

    const updatedImage = await GalleryImage.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating media', error: error.message });
  }
};

exports.deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await GalleryImage.findByIdAndDelete(id);
    
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
};
