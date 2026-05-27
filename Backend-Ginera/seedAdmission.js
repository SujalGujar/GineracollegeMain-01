const mongoose = require('mongoose');
const Course = require('./models/Course');
const AdmissionStep = require('./models/AdmissionStep');
const AdmissionRule = require('./models/AdmissionRule');
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO_URI = "mongodb+srv://sujalgurjar919_db_user:TY98KGLnJCiwQXfr@cluster0.azgmnt8.mongodb.net/myDatabase?retryWrites=true&w=majority";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // 1. Seed Courses
    await Course.deleteMany({});
    const courses = [
      {
        category: "Undergraduate Programs",
        name: "Bachelor of Science - Nursing",
        duration: "4 years (6 Months Exclusive Internship)",
        seats: 60,
        eligibility: "12th with Physics, Chemistry, Biology ",
        description: "Comprehensive Nursing degree program with extensive clinical training",
        icon: "👨‍⚕️",
        highlights: ["8 Semesters Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: "₹145",
        admission: "Through PCB Marks Central Admission Committee for Physiotherapy, BSC Nursing, Prosthetics and Orthotics ,Occupational Therapy, Optometry ,Naturopathy, Audiology and Speech Therapy, GNM And ANM Admission Government of Gujarat, Gandhinagar",
        websiteLink: "https://www.medadmgujarat.org/"
      },
      {
        category: "Undergraduate Programs",
        name: "Diploma in General Nursing and Midwifery",
        duration: "3 years",
        seats: 100,
        eligibility: "12th Pass With English",
        description: "Diploma in General Nursing and Midwifery",
        icon: "🌟",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: " ₹2050 ",
        admission: "Through Central Admission Committee for Physiotherapy, BSC Nursing, Prosthetics and Orthotics ,Occupational Therapy, Optometry ,Naturopathy, Audiology and Speech Therapy, GNM And ANM Admission Government of Gujarat, Gandhinagar",
        websiteLink: "https://www.medadmgujarat.org/"
      },
      {
        category: "Postgraduate Programs",
        name: "M.Sc.-(Medical Surgical Nursing)",
        duration: "2 years",
        seats: 5,
        eligibility: "B.Sc. Nursing + University Entrance Exam",
        description: "Specialization in Critical care Nursing, Oncology Nursing, Nephro-Urological Nursing, Cardiovascular and Thoracic Nursing, Neurosciences Nursing, Orthopedic Nursing, Gastroenterology Nursing",
        icon: "❤️",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: "₹50,000",
        admission: "Through University Entrance Exam"
      },
      {
        category: "Postgraduate Programs",
        name: "M.Sc.-(OBSTETRIC AND GYNAECOLOGICAL NURSING)",
        duration: "2 years",
        seats: 5,
        eligibility: "B.Sc. Nursing + University Entrance Exam",
        description: "Specialization in OBSTETRIC AND GYNAECOLOGICAL NURSING",
        icon: "❤️",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: "₹50,000",
        admission: "Through University Entrance Exam"
      },
      {
        category: "Postgraduate Programs",
        name: "M.Sc.-(PEDIATRIC (CHILD HEALTH) NURSING)",
        duration: "2 years",
        seats: 5,
        eligibility: "B.Sc. Nursing + University Entrance Exam",
        description: "Specialization in PEDIATRIC (CHILD HEALTH) NURSING",
        icon: "❤️",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: "₹50,000",
        admission: "Through University Entrance Exam"
      },
      {
        category: "Postgraduate Programs",
        name: "M.Sc.-(PSYCHIATRIC (MENTAL HEALTH) NURSING)",
        duration: "2 years",
        seats: 5,
        eligibility: "B.Sc. Nursing + University Entrance Exam",
        description: "Specialization in PSYCHIATRIC (MENTAL HEALTH) NURSING",
        icon: "❤️",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: "₹50,000",
        admission: "Through University Entrance Exam"
      },
      {
        category: "Postgraduate Programs",
        name: "M.Sc.-(COMMUNITY HEALTH NURSING)",
        duration: "2 years",
        seats: 5,
        eligibility: "B.Sc. Nursing + University Entrance Exam",
        description: "Specialization in COMMUNITY HEALTH NURSING",
        icon: "❤️",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: "₹50,000",
        admission: "Through University Entrance Exam"
      },
      {
        category: "Postgraduate Programs",
        name: "M.Sc.-(Nurse Practitioners in critical care nursing (Residency Program))",
        duration: "2 years",
        seats: 10,
        eligibility: "B.Sc. Nursing + University Entrance Exam",
        description: "Specialization in Nurse Practitioners in critical care nursing (Residency Program)",
        icon: "❤️",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Internship Program"],
        fees: "₹50,000",
        admission: "Through University Entrance Exam"
      },
      {
        category: "Specialisation Diploma Programs",
        name: "Post Basic Diploma Specialty Nursing - Residency Program",
        duration: "1 years",
        seats: 20,
        eligibility: "B.Sc. Nursing or Diploma In General Nursing and Midwifery",
        description: "Post Basic Diploma Specialty Nursing - Residency Program including Burn & Reconstructive Surgery, Orthopaedic, Neonatal, Oncology, Critical Care, etc.",
        icon: "❤️",
        highlights: [" Theory Blocks", "Clinical Rotations", "Community Rotations", "Residency Program"],
        fees: "₹5000 + 5000 ",
        admission: "Through Direct Admission upon Merit of Eligiblity Study by admission committee"
      }
    ];
    await Course.insertMany(courses);
    console.log("Courses seeded");

    // 2. Seed Admission Steps
    await AdmissionStep.deleteMany({});
    const steps = [
      { step: 1, title: "Result Declaration", description: "12th results are declared ", details: "Check your score and rank on the official website", icon: "Calendar" },
      { step: 2, title: "Counseling Registration", description: "Register for Gujarat state counseling process", details: "Online registration with document verification", icon: "Users" },
      { step: 3, title: "Choice Filling", description: "Fill your preferred colleges and courses", details: "Rank colleges based on your preference and eligibility", icon: "CheckCircle" },
      { step: 4, title: "Seat Allotment", description: "Seats are allotted based on merit and availability", details: "Multiple rounds of counseling are conducted", icon: "GraduationCap" },
      { step: 5, title: "Document Verification", description: "Verify documents at the allotted college", details: "Original documents required for verification", icon: "FileText" },
      { step: 6, title: "Fee Payment", description: "Pay admission fees to confirm your seat", details: "Fee payment within specified timeline is mandatory", icon: "Download" },
      { step: 7, title: "Admission Confirmation", description: "Complete admission formalities and receive confirmation", details: "Submit all required documents and forms", icon: "CheckCircle" },
      { step: 8, title: "Admission Committee Website", description: "ADMISSION THROUGH - Admission Committee for Physiotherapy, BSC Nursing, etc.", details: "Official website: https://www.medadmgujarat.org/ga/home.aspx", icon: "Info" }
    ];
    await AdmissionStep.insertMany(steps);
    console.log("Steps seeded");

    // 3. Seed Admission Rules
    await AdmissionRule.deleteMany({});
    const rules = [
      { category: "UnderGraduated Programs", title: "Academic Qualification", description: "10+2 with Physics, Chemistry, Biology/Biotechnology and English. Minimum 45% marks (40% for SC/ST/OBC). English as compulsory. PCB from recognized board.", icon: "CheckCircle" },
      { category: "UnderGraduated Programs", title: "Age Criteria", description: "Minimum 17 years as on December 31st of admission year. Age proof certificate mandatory. No age relaxation for management/NRI quota.", icon: "Calendar" },
      { category: "UnderGraduated Programs", title: "Medical Fitness", description: "Candidates must be medically fit as per MCI standards.", icon: "Stethoscope" }
    ];
    await AdmissionRule.insertMany(rules);
    console.log("Rules seeded");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
