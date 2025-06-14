const router = require('express').Router();
const authController = require('../controller/authController.js');
const forgotPasswordController = require('../controller/forgotPasswordController.js');

// Đăng ký người dùng mới
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

// Refresh token
router.post('/refresh', authController.refreshToken);

// Gửi email xác thực đổi mật khẩu
router.post('/forgot-password', forgotPasswordController.sendResetEmail);

// Đổi mật khẩu đã gửi qua email
router.post('/reset-password', forgotPasswordController.resetPassword);

module.exports = router;