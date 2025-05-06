const router = require('express').Router();
const foodController = require('../controller/foodController.js');


// Lấy tất cả món ăn
router.get('/', foodController.getAllFood);

// Lấy món ăn theo ID
router.get('/:id', foodController.getFoodById);

// Tạo món ăn mới
router.post('/', foodController.createFood);

// Cập nhật món ăn
router.put('/:id', foodController.updateFood);

// Xóa món ăn
router.delete('/:id', foodController.deleteFood);


module.exports = router;