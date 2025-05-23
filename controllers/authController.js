// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({
    id: user._id,
    role: user.role,
    mustChangePassword: user.mustChangePassword
  }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
};

exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id;

  if (!newPassword) return res.status(400).json({ error: 'New password required' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
    mustChangePassword: false
  });

  res.json({ message: 'Password changed successfully' });
};

