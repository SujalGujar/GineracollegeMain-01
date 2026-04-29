const ContactKeyPerson = require('../models/ContactKeyPerson');
const ContactDepartment = require('../models/ContactDepartment');
const ContactInfo = require('../models/ContactInfo');

// Key Persons
exports.getKeyPersons = async (req, res) => {
  try {
    const persons = await ContactKeyPerson.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createKeyPerson = async (req, res) => {
  try {
    const newPerson = new ContactKeyPerson(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateKeyPerson = async (req, res) => {
  try {
    const person = await ContactKeyPerson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!person) return res.status(404).json({ message: 'Key Person not found' });
    res.json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteKeyPerson = async (req, res) => {
  try {
    const person = await ContactKeyPerson.findByIdAndDelete(req.params.id);
    if (!person) return res.status(404).json({ message: 'Key Person not found' });
    res.json({ message: 'Key Person deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await ContactDepartment.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const newDept = new ContactDepartment(req.body);
    await newDept.save();
    res.status(201).json(newDept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const dept = await ContactDepartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const dept = await ContactDepartment.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// College Info
exports.getContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = new ContactInfo({
        address: 'Government Medical College\nCivil Hospital Campus\nAsarwa, Ahmedabad - 380016\nGujarat, India',
        receptionPhone: '+91-96011 11973',
        ambulancePhone: '108',
        generalEmail: 'principalgcona@gmail.com'
      });
      await info.save();
    }
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (info) {
      info = await ContactInfo.findByIdAndUpdate(info._id, req.body, { new: true });
    } else {
      info = new ContactInfo(req.body);
      await info.save();
    }
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
