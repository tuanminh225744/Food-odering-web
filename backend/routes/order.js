const router = require('express').Router();
const orderController = require('../controller/orderController.js');


// Lấy tất cả đơn hàng
router.get('/', orderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/:id', orderController.getOrderById);

// Tạo đơn hàng mới
router.post('/', orderController.createOrder);

// Cập nhật đơn hàng
router.put('/:id', orderController.updateOrder);

// Xóa đơn hàng
router.delete('/:id', orderController.deleteOrder);


module.exports = router;