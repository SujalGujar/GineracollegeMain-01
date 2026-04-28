const mongoose = require("mongoose");

const BondSchema = new mongoose.Schema({
  title: String,
  content: String,
  type: { type: String, enum: ["student", "service"] },
});

const GuidelineSchema = new mongoose.Schema({
  category: String,
  subCategory: String,
  points: [String],
});

const Bond = mongoose.model("Bond", BondSchema);
const Guideline = mongoose.model("Guideline", GuidelineSchema);

const MONGODB_URI = "mongodb+srv://sujalgurjar919_db_user:TY98KGLnJCiwQXfr@cluster0.azgmnt8.mongodb.net/myDatabase?retryWrites=true&w=majority";

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing
    await Bond.deleteMany({});
    await Guideline.deleteMany({});

    // Seed Bonds (Student Only as per request)
    const bonds = [
      {
        title: "Bond Details",
        type: "student",
        content: "Service Period: Students must serve in Gujarat State for 2 years after completion of MBBS degree and internship\nBond Amount: ₹10,00,000 (Ten Lakh Rupees) through bank guarantee or fixed deposit\nService Locations: Government hospitals, PHCs, CHCs, or rural hospitals as assigned by state government"
      },
      {
        title: "Bond Conditions",
        type: "student",
        content: "Mandatory Service: Minimum 2 years in assigned government facility, Service period starts after internship completion, Cannot leave without proper relieving order, Unauthorized absence may lead to penalty\nPenalty for Bond Breach: Full bond amount (₹10,00,000) to be paid, Interest as applicable from breach date, Legal action as per bond agreement terms"
      },
      {
        title: "Bond Execution Process",
        type: "student",
        content: "Required Documents: Bond agreement on stamp paper, Bank guarantee from scheduled bank, Fixed deposit receipt (alternative), Guarantor details and documents, Student and parent signatures\nSubmission Timeline: At the time of admission, Before commencement of classes, Mandatory for seat confirmation, Cannot be deferred or postponed"
      },
      {
        title: "Bond Release",
        type: "student",
        content: "The bond amount will be released after successful completion of the mandatory service period or as per the terms and conditions mentioned in the bond agreement. Students must apply for bond release with proper documentation of service completion."
      }
    ];

    // Seed Guidelines (Instructions)
    const guidelines = [
      {
        category: "General Guidelines",
        subCategory: "Academic Conduct",
        points: [
          "Maintain minimum 90% attendance in all subjects and 100% Attendance in Clinic",
          "Regular participation in clinical postings",
          "Punctuality in classes and examinations",
          "Respect for faculty, staff, and fellow students",
          "Academic integrity and honesty"
        ]
      },
      {
        category: "General Guidelines",
        subCategory: "Professional Behavior",
        points: [
          "Professional dress code in college and hospital",
          "Courteous behavior with patients and families",
          "Confidentiality of patient information",
          "No discrimination based on caste or religion"
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
          "Political activities within premises"
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
          "Follow all exam regulations"
        ]
      },
      {
        category: "For Parents/Guardians",
        subCategory: "Communication",
        points: [
          "Regular communication with administration",
          "Attend parent-teacher meetings",
          "Update contact information promptly",
          "Monitor student's academic progress"
        ]
      },
      {
        category: "For Parents/Guardians",
        subCategory: "Support & Guidance",
        points: [
          "Encourage regular study habits",
          "Support co-curricular activities",
          "Address difficulties promptly",
          "Maintain positive communication"
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

    await Bond.insertMany(bonds);
    await Guideline.insertMany(guidelines);

    console.log("Seeding successful!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
