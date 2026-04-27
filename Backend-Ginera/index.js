const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const dns = require('node:dns');
// Force Node.js to use Google DNS to solve querySrv issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

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
app.use('/api/sliders', sliderRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/about', aboutRoutes);

// MongoDB Connection
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increase timeout from 5s to 10s
      socketTimeoutMS: 45000,         // Close sockets after 45s of inactivity
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
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
  res.send('Ginera College Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
