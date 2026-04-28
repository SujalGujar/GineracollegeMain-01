const Guideline = require('../models/Guideline');

exports.getAllGuidelines = async (req, res) => {
    try {
        const count = await Guideline.countDocuments();
        if (count === 0) {
            const defaultGuidelines = [
                {
                    category: "General Guidelines",
                    subCategory: "Academic Conduct",
                    points: [
                        "Maintain minimum 90% attendance in all subjects and 100% Attendance in Clinic",
                        "Regular participation in clinical postings",
                        "Punctuality in classes and examinations",
                        "Respect for faculty, staff, and fellow students",
                        "Academic integrity and honesty",
                    ]
                },
                {
                    category: "General Guidelines",
                    subCategory: "Professional Behavior",
                    points: [
                        "Professional dress code in college and hospital",
                        "Courteous behavior with patients and families",
                        "Confidentiality of patient information",
                        "No discrimination based on caste or religion",
                    ]
                },
                {
                    category: "Code of Conduct",
                    subCategory: "Prohibited Activities",
                    points: [
                        "Ragging of any form (physical, mental, emotional)",
                        "Use of alcohol, tobacco, or illegal substances",
                        "Violence, fighting, or disruptive behavior",
                        "Damage to college property or equipment",
                        "Unauthorized absence from duties",
                        "Political activities within premises",
                    ]
                },
                {
                    category: "Academic Requirements",
                    subCategory: "Attendance Policy",
                    points: [
                        "Minimum 90% attendance in Theory class and 100% in Clinic",
                        "Shortage may lead to exam debarment",
                        "Medical leave requires certification",
                        "Regular monitoring and counseling",
                        "Must Complete Clinical Submission Requirement in All Subjects"
                    ]
                },
                {
                    category: "Academic Requirements",
                    subCategory: "Examination Rules",
                    points: [
                        "Punctuality in examinations",
                        "Carry valid identity card",
                        "No unfair means or malpractice",
                        "Follow all exam regulations",
                    ]
                },
                {
                    category: "For Parents/Guardians",
                    subCategory: "Communication",
                    points: [
                        "Regular communication with administration",
                        "Attend parent-teacher meetings",
                        "Update contact information promptly",
                        "Monitor student's academic progress",
                    ]
                },
                {
                    category: "For Parents/Guardians",
                    subCategory: "Support & Guidance",
                    points: [
                        "Encourage regular study habits",
                        "Support co-curricular activities",
                        "Address difficulties promptly",
                        "Maintain positive communication",
                    ]
                },
                {
                    category: "Contact Information",
                    subCategory: "Academic Office",
                    points: [
                        "Phone: +91-79-2268-1406",
                        "Email: principalgcona@gmail.com and pricipalgsona@gmail.com",
                        "Office Hours: 9:00 AM - 5:00 PM"
                    ]
                }
            ];
            await Guideline.insertMany(defaultGuidelines);
        }
        
        const guidelines = await Guideline.find().sort({ order: 1 });
        res.json(guidelines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createGuideline = async (req, res) => {
    try {
        const guideline = new Guideline(req.body);
        const newGuideline = await guideline.save();
        res.status(201).json(newGuideline);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateGuideline = async (req, res) => {
    try {
        const updatedGuideline = await Guideline.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGuideline);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteGuideline = async (req, res) => {
    try {
        await Guideline.findByIdAndDelete(req.params.id);
        res.json({ message: 'Guideline deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
