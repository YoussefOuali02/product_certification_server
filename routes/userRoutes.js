const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAllUsers, createUser, updateUser, deleteUser
} = require('../controllers/userController');

router.use(auth(['Admin']));
router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
