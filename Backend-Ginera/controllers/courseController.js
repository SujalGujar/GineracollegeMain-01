const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const data = { ...req.body };
    if (typeof data.highlights === 'string') {
      data.highlights = data.highlights.split(',').map(h => h.trim()).filter(h => h);
    }
    const course = new Course(data);
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const data = { ...req.body };
    if (typeof data.highlights === 'string') {
      data.highlights = data.highlights.split(',').map(h => h.trim()).filter(h => h);
    }
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
