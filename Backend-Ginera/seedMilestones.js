const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Milestone = require('./models/Milestone');
const path = require('path');
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const milestones = [
    { 
      year: "1963", 
      event: "College established with 50 students", 
      icon: "🎯", 
      color: "#1e3a8a", 
      description: "The college has the roots in the post basic Nursing School, which was started in 1963. At the time Gujarat was very young state and the need for P.H.N. nurses was acute. So the diploma course in Public Health Nursing was started. Two years later with the increasing in Nursing Schools a especially the ANM schools the need for tutors was felt, so in 1965 a Diploma in Nursing Education course was started." 
    },
    { 
      year: "1975", 
      event: "First postgraduate programs introduced", 
      icon: "📚", 
      color: "#3b82f6", 
      description: "Expanded educational offerings to advanced levels." 
    },
    { 
      year: "1993", 
      event: "Basic B.Sc. Nursing program", 
      icon: "🔬", 
      color: "#10b981", 
      description: "College of Nursing was started basic B.Sc. Nursing program which affiliated with Gujarat university and is recognized by Indian Nursing council and Gujarat Nursing Council with annual in take of 30 students. The program is designed to qualify female students to take position as base line worker in hospitals and community.Annually intake was 30 students and intake are increased to 60 students in 2006." 
    },
    { 
      year: "2005", 
      event: "M.Sc. Nursing program", 
      icon: "🎓", 
      color: "#f59e0b", 
      description: "The College of Nursing Ahmedabad Has started M.Sc. Nursing program in Month of November 2005 with total intake of 10 students.The college of Nursing is offered different post Graduate specialty in Nursing, i.e. Medical Surgical Nursing, Pediatric Nursing, Child health Nursing, Community health Nursing and Obstetrical and Gynecological Nursing.As per the need of the state and Nursing profession the annual intake of P G Nursing is 25 seats since 2008" 
    },
    { 
      year: "2017", 
      event: "NPCC", 
      icon: "🏥", 
      color: "#ef4444", 
      description: "Nurse practitioner in critical care nursing, A post graduate residential program was started in year 2017 with annual intake of 10 seats." 
    },
    { 
      year: "2023", 
      event: "Diamond Jubilee celebration", 
      icon: "💎", 
      color: "#8b5cf6", 
      description: "60 years of excellence in Nursing education." 
    },
    { 
      year: "2025", 
      event: "Post Basic Diploma – Residency Programs- 1 year", 
      icon: "📜", 
      color: "#10b981", 
      description: "Post Basic Diploma – Residency Programs- 1 year (7 Courses) was started in 2025 with intake of 20 students each." 
    },
    { 
      year: "2024", 
      event: "Excellence in Midwifery", 
      icon: "🌟", 
      color: "#8b5cf6", 
      description: "POST BASIC DIPLOMA IN NURSE PRACTITIONERS IN MIDWIFERY (1 YEAR 6 MONTHS) NURSE PRACTITIONER MIDWIFERY (NPM) EDUCATOR PROGRAM." 
    }
];

async function seedMilestones() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding milestones...');
        
        // Clear existing to ensure we have the full historical set
        await Milestone.deleteMany({});
        console.log('Cleared existing milestones.');

        await Milestone.insertMany(milestones);
        console.log('✅ Successfully seeded all historical milestones into database!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding milestones:', error);
        process.exit(1);
    }
}

seedMilestones();
