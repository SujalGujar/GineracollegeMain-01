const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/authMiddleware');

// Ensure an initial admin account exists in MongoDB
const ensureDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultEmail = 'adminginera@gmail.com';
      const defaultPassword = 'Admin@12345';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      const defaultAdmin = new Admin({
        email: defaultEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await defaultAdmin.save();
      console.log('✅ Initial Admin created with email:', defaultEmail);
    }
  } catch (err) {
    console.warn('⚠️ Could not initialize default admin:', err.message);
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const adminEmail = (email || username || '').trim().toLowerCase();

    if (!adminEmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Ensure initial admin is seeded if database was empty
    await ensureDefaultAdmin();

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }

    // Generate JWT token (valid for 7 days)
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Error in admin login:', err);
    res.status(500).json({ message: 'Server error during login. Please try again.' });
  }
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    // Password validation rules
    if (newPassword.length <= 8) {
      return res.status(400).json({ message: 'New password must be greater than 8 characters (at least 9 characters).' });
    }

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=\\/[\]~`]/.test(newPassword);
    if (!hasSpecialChar) {
      return res.status(400).json({ message: 'New password must contain at least one unique special character (e.g., @, #, $, %, !).' });
    }

    // Find the admin to update: either from JWT token or fallback by email or single admin
    let admin = null;
    if (req.admin?.id) {
      admin = await Admin.findById(req.admin.id);
    }
    if (!admin && email) {
      admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    }
    if (!admin) {
      admin = await Admin.findOne();
    }

    if (!admin) {
      // Seed default admin if none exists
      await ensureDefaultAdmin();
      admin = await Admin.findOne();
    }

    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found to update' });
    }

    // Hash the new password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedPassword;
    await admin.save();

    console.log(`🔒 Admin password updated successfully for: ${admin.email}`);

    res.status(200).json({
      success: true,
      message: 'Admin password successfully updated in database!'
    });
  } catch (err) {
    console.error('Error resetting admin password:', err);
    res.status(500).json({ message: 'Server error updating password. Please try again.' });
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging out' });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
