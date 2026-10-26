const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Admin = require('../models/Admin');

async function resetPassword() {
  const newPassword = process.argv[2] || 'Admin@12345';
  const targetEmail = (process.argv[3] || 'adminginera@gmail.com').trim().toLowerCase();

  console.log(`\nConnecting to MongoDB...`);
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in Backend-Ginera/.env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  let admin = await Admin.findOne({ email: targetEmail });
  if (!admin) {
    console.log(`Creating admin account for ${targetEmail}...`);
    admin = new Admin({
      email: targetEmail,
      password: hashedPassword,
      role: 'admin'
    });
  } else {
    admin.password = hashedPassword;
  }

  await admin.save();

  console.log(`\n========================================`);
  console.log(`✅ Admin credentials successfully updated!`);
  console.log(`   Email:    ${admin.email}`);
  console.log(`   Password: ${newPassword}`);
  console.log(`========================================\n`);

  await mongoose.disconnect();
}

resetPassword().catch((err) => {
  console.error('❌ Error resetting password:', err);
  process.exit(1);
});
