const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyAdminToken } = require('../utils/authMiddleware');

// Public route to log in
router.post('/login', authController.login);

// Reset password endpoint: can be called with valid token OR when authenticated
router.post('/reset-password', (req, res, next) => {
  // If Authorization header is provided, verify token, else proceed with email/admin check
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return verifyAdminToken(req, res, next);
  }
  next();
}, authController.resetPassword);

// Logout route
router.post('/logout', authController.logout);

// Verify current session
router.get('/me', verifyAdminToken, authController.getMe);

module.exports = router;
