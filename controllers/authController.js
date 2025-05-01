// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('test',email,password);
  const users = await User.find();
  console.log('users',users)
  const user = await User.findOne({ email });
  console.log('user',user)
  
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
