const express = require('express');
const router = express.Router();
const { register, login, fetchUser } = require('../controllers/AuthController');
const { auth } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/user', auth, fetchUser);

module.exports = router;