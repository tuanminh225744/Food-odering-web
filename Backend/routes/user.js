const router = require('express').Router();
const middlewareController = require('../controller/middlewareController.js');
const userController = require('../controller/userController.js');

// Lấy tất cả người dùng
router.get('/', middlewareController.verifyToken, userController.getAllUsers);

// Lấy người dùng theo ID
router.get('/:id', userController.getUserById);

// Tạo người dùng mới
router.post('/', userController.createUser);

// Cập nhật người dùng
router.put('/:id', userController.updateUser);

// Xóa người dùng
router.delete('/:id', middlewareController.verifyToken, middlewareController.verifyAdmin, userController.deleteUser);

module.exports = router;