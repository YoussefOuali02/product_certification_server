const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getDashboardURL } = require('../controllers/dashboardController');

router.get('/dashboard', auth(['TC', 'CertificationProcess']), getDashboardURL);
module.exports = router;
