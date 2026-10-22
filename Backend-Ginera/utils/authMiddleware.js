const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ginera-secret-jwt-key-2026';

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expired or invalid token. Please log in again.' });
  }
};

module.exports = {
  verifyAdminToken,
  JWT_SECRET
};
