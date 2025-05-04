// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateTempPassword = require('../utils/generateTempPassword');
const sendEmail = require('../utils/sendEmail');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, phone, role } = req.body;
  const tempPassword = generateTempPassword();
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const user = new User({ firstName, lastName, email, phone, role, password: hashedPassword });

  await user.save();

  await sendEmail(
    email,
    `Welcome To Product Certification Dashboard`,
    `Hello ${firstName}, Please login with your email and change this password.\n\nYour temporary password is: ${tempPassword}\n\nThank you!`
  );
  
  res.status(201).json({ message: 'User created and email sent' });
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
