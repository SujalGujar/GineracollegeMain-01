const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config({ path: path.join(__dirname, '.env') });
const Announcement = require('./models/Announcement');

const seedAnnouncement = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb+srv://sujalgurjar919_db_user:TY98KGLnJCiwQXfr@cluster0.azgmnt8.mongodb.net/myDatabase?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB for Announcement seeding");

    // Check if announcements already exist
    const count = await Announcement.countDocuments();
    if (count === 0) {
      await Announcement.create({
        title: "Admission Announcements Will Be Available Soon",
        subtitle: "Official announcements, notices, and admission circulars for Government College of Nursing, GINERA.",
        badge: "Will Be Updated Soon",
        description: "The official admission notices, circulars, and application schedules for Post Basic Diploma Course in Nursing at Government / GMERS Medical / Nursing College (Government College of Nursing, GINERA, Ahmedabad) will be published here.",
        points: [
          "Official admission notifications and merit lists will be published here as soon as released.",
          "Post Basic Diploma Course in Nursing admissions are conducted for Government / GMERS Medical / Nursing College (Government College of Nursing, GINERA, Ahmedabad)."
        ],
        formUrl: "",
        formName: "",
        formSize: 0,
        isActive: true,
        order: 0
      });
      console.log("✅ Seeded initial Post Basic Diploma announcement successfully!");
    } else {
      console.log(`ℹ️ Announcements collection already has ${count} records.`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedAnnouncement();
