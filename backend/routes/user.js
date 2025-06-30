const router = require('express').Router();
const middlewareController = require('../controller/middlewareController.js');
const userController = require('../controller/userController.js');
const changePasswordController = require('../controller/changePasswordController.js');

// Lấy tất cả người dùng
// router.get('/', middlewareController.verifyToken, userController.getAllUsers);
router.get('/', userController.getAllUsers);

// Lấy người dùng theo ID
router.get('/:id', userController.getUserById);

// Tạo người dùng mới
router.post('/', userController.createUser);

// Cập nhật người dùng
router.put('/:id', userController.updateUser);

// Xóa người dùng
router.delete('/:id', userController.deleteUser);

// Gửi mã xác nhận đổi mật khẩu (yêu cầu nhập đúng mật khẩu cũ)
router.post('/send-change-password-code', changePasswordController.sendChangePasswordCode);

// Xác nhận mã và đổi mật khẩu mới
router.post('/confirm-change-password', changePasswordController.confirmChangePassword);

module.exports = router;