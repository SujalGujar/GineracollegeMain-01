const mongoose = require('mongoose');
const Testimonial = require('./models/Testimonial');
const dotenv = require('dotenv');
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const staticTestimonials = [
  {
    name: "Sarah Johnson",
    role: "Medical Student",
    content: "Univer provided me with exceptional education and opportunities that shaped my career in ways I never imagined possible.",
    rating: 5,
    imageUrl: "" // Assuming static uses current.image fallback or we can just leave empty
  },
  {
    name: "Michael Chen",
    role: "Research Scholar",
    content: "The academic environment and faculty support at Univer are truly outstanding. I felt supported every step of the way.",
    rating: 5,
    imageUrl: ""
  },
  {
    name: "Emily Rodriguez",
    role: "Alumni",
    content: "My experience at Univer prepared me perfectly for my medical career. I highly recommend it to anyone serious about nursing.",
    rating: 5,
    imageUrl: ""
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to DB. Seeding...");
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.insertMany(staticTestimonials);
      console.log("Seeded successfully.");
    } else {
      console.log("Already has data. Skipping.");
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
