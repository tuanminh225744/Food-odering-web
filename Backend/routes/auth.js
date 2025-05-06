const router = require('express').Router();
const authController = require('../controller/authController.js');

// Đăng ký người dùng mới
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

// Refresh token
router.post('/refresh', authController.refreshToken);

module.exports = router;