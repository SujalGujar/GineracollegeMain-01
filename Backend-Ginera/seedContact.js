const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ContactKeyPerson = require('./models/ContactKeyPerson');
const ContactDepartment = require('./models/ContactDepartment');
const ContactInfo = require('./models/ContactInfo');
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const keyContacts = [
  {
    name: "Dr. Hiral S. Shah",
    position: " Principal",
    qualification: " M.Sc. in Obstetrics and Gynaecological Nursing",
    phone: "+91-96011 11973",
    email: "principalgcona@gmail.com",
    hours: "9:00 AM - 5:00 PM (Mon-Fri)/Sat(Half Day)",
    icon: "👨‍⚕️",
    color: "from-blue-500 to-blue-600",
    responsibilities: [
      "Overall Institutional administration",
      "Academic policy decisions",
      "Faculty development",
      "External relations",
    ],
  },
  {
    name: "Mrs. Minaxiben R. Patel",
    position: "I/C Principal Nursing Officer Class-2(PHN Tutor)",
    qualification: "M.Sc.(Medical Surgical Nursing)",
    phone: "+91-98792 25542",
    email: "principalgsona@gmail.com",
    hours: "9:00 AM - 5:00 PM (Mon-Fri)/Sat(Half Day)",
    icon: "👩‍⚕️",
    color: "from-purple-500 to-purple-600",
    responsibilities: [
      "Coordinate Diploma In General Nursing And Midwifery Program",
      "Academic curriculum development",
      "Student affairs management",
    ],
  },
];

const departments = [
  {
    name: "Admissions Office",
    phone: "+91-79-2268-0010",
    email: "admissions@gmc.edu.in",
    icon: "📚",
  },
  {
    name: "Academic Office",
    phone: "+91-79-2268-0011",
    email: "academic@gmc.edu.in",
    icon: "🎓",
  },
  {
    name: "Examination Cell",
    phone: "+91-79-2268-0012",
    email: "exams@gmc.edu.in",
    icon: "📝",
  },
  {
    name: "Student Affairs",
    phone: "+91-79-2268-0013",
    email: "students@gmc.edu.in",
    icon: "👥",
  },
  {
    name: "Hospital Administration",
    phone: "+91-79-2268-0014",
    email: "hospital@gmc.edu.in",
    icon: "🏥",
  },
  {
    name: "Finance Office",
    phone: "+91-79-2268-0015",
    email: "finance@gmc.edu.in",
    icon: "💰",
  },
];

const contactInfo = {
  address: "Government Medical College\nCivil Hospital Campus\nAsarwa, Ahmedabad - 380016\nGujarat, India",
  receptionPhone: "+91-96011 11973",
  ambulancePhone: "108",
  generalEmail: "principalgcona@gmail.com"
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // Clear existing
    await ContactKeyPerson.deleteMany();
    await ContactDepartment.deleteMany();
    await ContactInfo.deleteMany();
    console.log('Cleared existing contact data');

    // Insert new
    await ContactKeyPerson.insertMany(keyContacts);
    await ContactDepartment.insertMany(departments);
    
    const info = new ContactInfo(contactInfo);
    await info.save();
    
    console.log('Successfully seeded contact data');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
