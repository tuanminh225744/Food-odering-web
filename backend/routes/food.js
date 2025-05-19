const router = require('express').Router();
const foodController = require('../controller/foodController.js');


// Lấy tất cả món ăn
router.get('/', foodController.getAllFood);

// Lấy số lượng món ăn
router.get('/count', foodController.getFoodCount);

// Lấy món ăn theo ID
router.get('/:id', foodController.getFoodById);

// Lấy món ăn theo loại
router.get('/type/:type', foodController.getFoodByType);

// Lấy món ăn theo giá
router.get('/price/:sort', foodController.getFoodByPrice);

// Lấy món ăn theo loại và giá từ thấp đến cao hoặc từ cao đến thấp
router.get('/type/:type/price/:sort', foodController.getFoodByTypeAndPrice);

// Tạo món ăn mới
router.post('/', foodController.createFood);

// Cập nhật món ăn
router.put('/:id', foodController.updateFood);

// Xóa món ăn
router.delete('/:id', foodController.deleteFood);


module.exports = router;