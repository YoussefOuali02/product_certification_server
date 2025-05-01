// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/product_certification')
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = new User({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'Admin',
      phone: '0000000000',
      mustChangePassword: true
    });

    await user.save();
    console.log('✅ Admin user created');
    process.exit();
  })
  .catch(err => console.error(err));
