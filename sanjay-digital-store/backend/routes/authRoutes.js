const express = require('express');
const { loginUser, logoutUser, getUserProfile, registerUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.get('/check', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
