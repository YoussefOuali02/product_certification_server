const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { login, changePassword } = require('../controllers/authController');

router.post('/login', login);

router.post('/change-password', auth(), changePassword);


module.exports = router;
