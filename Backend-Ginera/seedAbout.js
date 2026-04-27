const mongoose = require('mongoose');
const dotenv = require('dotenv');
const VisionMission = require('./models/VisionMission');
const CoreValue = require('./models/CoreValue');
const path = require('path');
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const visionMissionData = [
    { type: 'vision', content: "A college of nursing's vision is to be a leader in nursing education, preparing competent, compassionate, and ethically grounded professionals who can contribute to global healthcare.", order: 1 },
    { type: 'vision', content: "This is achieved through fostering innovation, promoting research, and creating a learning environment that develops students into skilled and committed healthcare providers ready to meet diverse and changing societal needs.", order: 2 },
    { type: 'vision', content: "Ethical medical professionals with humanitarian values", order: 3 },
    { type: 'mission', content: "The mission of a college of nursing is to prepare competent and compassionate nursing professionals to provide high-quality healthcare through excellence in education, clinical practice, and research.", order: 1 },
    { type: 'mission', content: "This includes developing nurses who can serve diverse communities, promote health, prevent illness, and contribute to the advancement of the nursing profession both locally and globally", order: 2 },
    { type: 'mission', content: "Deliver compassionate, ethical, and evidence-based healthcare services", order: 3 }
];

const coreValuesData = [
    {
      icon: "🤝",
      title: "Excellence in education",
      description: "Upholding the highest ethical standards in all our endeavors, maintaining transparency and honesty in every action",
      color: "from-amber-500 to-orange-500",
      order: 1
    },
    {
      icon: "🌟",
      title: "Nurses for the future",
      description: " To train professionals who are not only knowledgeable and skillful but also intellectually enlightened, morally upright, and emotionally balanced.",
      color: "from-orange-500 to-amber-500",
      order: 2
    },
    {
      icon: "❤️",
      title: "Innovation and research",
      description: "To become a center for excellence in nursing education by encouraging innovative practices and research to improve patient care and the nursing profession itself.To develop future nursing leaders and equip them to provide holistic, compassionate, and quality care to individuals and communities.",
      color: "from-red-500 to-orange-500",
      order: 3
    },
    {
      icon: "🌍",
      title: "Leadership and community impact",
      description: "To develop future nursing leaders and equip them to provide holistic, compassionate, and quality care to individuals and communities.",
      color: "from-yellow-500 to-amber-500",
      order: 4
    },
    {
      icon: "👥",
      title: "Lifelong learning",
      description: "To create a vibrant learning environment that fosters a spirit of inquiry and commitment to lifelong learning",
      color: "from-amber-500 to-yellow-500",
      order: 5
    },
    {
      icon: "🎓",
      title: "Human dignity",
      description: " Respecting the inherent worth and uniqueness of every individual.",
      color: "from-orange-500 to-red-500",
      order: 6
    },
    {
      icon: "⚖️",
      title: "Integrity",
      description: "Acting with honesty and upholding a strong set of moral principles.",
      color: "from-orange-500 to-red-500",
      order: 7
    },
    {
      icon: "🔓",
      title: "Autonomy",
      description: "Recognizing and respecting a patient's right to make their own healthcare decisions",
      color: "from-orange-500 to-red-500",
      order: 8
    }
];

const seedAbout = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sujalgujar50:Sujal%408421@cluster0.z5i6k.mongodb.net/Ginera?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB');

        await VisionMission.deleteMany();
        await CoreValue.deleteMany();

        await VisionMission.insertMany(visionMissionData);
        await CoreValue.insertMany(coreValuesData);

        console.log('Seeded Vision, Mission and Core Values successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding:', err);
        process.exit(1);
    }
};

seedAbout();
