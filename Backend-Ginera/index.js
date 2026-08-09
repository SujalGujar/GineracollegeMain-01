const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const dns = require('node:dns');
// Force Node.js to use Google DNS to solve querySrv issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 8080;
let lastMongoError = null;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Routes
const sliderRoutes = require('./routes/sliderRoutes');
const programRoutes = require('./routes/programRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contentRoutes = require('./routes/contentRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const courseRoutes = require('./routes/courseRoutes');
const admissionStepRoutes = require('./routes/admissionStepRoutes');
const admissionRuleRoutes = require('./routes/admissionRuleRoutes');
const bondRoutes = require('./routes/bondRoutes');
const guidelineRoutes = require('./routes/guidelineRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const contactRoutes = require('./routes/contactRoutes');
const sectionVisibilityRoutes = require('./routes/sectionVisibilityRoutes');
const studentCornerRoutes = require('./routes/studentCornerRoutes');

app.use('/api/sliders', sliderRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admission-steps', admissionStepRoutes);
app.use('/api/admission-rules', admissionRuleRoutes);
app.use('/api/bonds', bondRoutes);
app.use('/api/guidelines', guidelineRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/section-visibility', sectionVisibilityRoutes);
app.use('/api/student-corner', studentCornerRoutes);

// MongoDB Connection
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    lastMongoError = null;
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    lastMongoError = err.message;
    console.error('❌ MongoDB connection error:', err.message);
    console.log('👉 TIP: Please ensure your IP address is whitelisted in MongoDB Atlas Network Access.');
  }
};

connectDB();

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.send('Ginera College Backend is running');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    dbReadyState: mongoose.connection.readyState,
    dbName: mongoose.connection.name || null,
    lastMongoError,
  });
});

const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get(/^\/(?!api\/|uploads\/).*/, (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File too large. Maximum size allowed is 100MB.' 
      });
    }
    return res.status(400).json({ message: err.message });
  }
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
