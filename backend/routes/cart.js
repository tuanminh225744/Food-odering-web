const router = require('express').Router();
const cartController = require('../controller/cartController.js');


// Lấy tất cả giỏ hàng
router.get('/', cartController.getAllCarts);

// Lấy giỏ hàng theo ID
router.get('/:id', cartController.getCartById);

// Tạo giỏ hàng mới
router.post('/', cartController.createCart);

// Cập nhật giỏ hàng
router.put('/:id', cartController.updateCart);

// Xóa giỏ hàng
router.delete('/:id', cartController.deleteCart);


module.exports = router;

