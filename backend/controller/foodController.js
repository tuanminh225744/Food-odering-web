const { Food, Cart, User, Order } = require('../models/model.js');

const foodController = {
    // Lấy tất cả món ăn hoặc tìm kiếm theo tên
    getAllFood: async (req, res) => {
        try {
            const search = req.query.search;
            let foods;
            if (search) {
                foods = await Food.find({
                    name: { $regex: search, $options: 'i' }
                });
            } else {
                foods = await Food.find();
            }
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy số lượng món ăn
    getFoodCount: async (req, res) => {
        try {
            const count = await Food.countDocuments();
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy món ăn theo ID
    getFoodById: async (req, res) => {
        try {
            const food = await Food.findById(req.params.id);
            if (!food) return res.status(404).json({ message: 'Food not found' });
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy món ăn theo loại
    getFoodByType: async (req, res) => {
        try {
            const foods = await Food.find({ type: req.params.type });
            if (!foods.length) return res.status(404).json({ message: 'No food found for this type' });
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy món ăn theo giá từ thấp đến cao hoặc từ cao đến thấp 
    getFoodByPrice: async (req, res) => {
        const { sort } = req.params;
        const sortOrder = sort === 'asc' ? 1 : -1;

        try {
            const foods = await Food.find().sort({ price: sortOrder });
            if (!foods.length) return res.status(404).json({ message: 'No food found' });
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy món ăn theo loại và giá từ thấp đến cao hoặc từ cao đến thấp
    getFoodByTypeAndPrice: async (req, res) => {
        const { type, sort } = req.params;
        const sortOrder = sort === 'asc' ? 1 : -1;

        try {
            const foods = await Food.find({ type }).sort({ price: sortOrder });
            if (!foods.length) return res.status(404).json({ message: 'No food found for this type' });
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    // Tạo món ăn mới
    createFood: async (req, res) => {
        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            saleOffPrecent: req.body.saleOffPrecent || 0,
            starRating: req.body.starRating || 0,
            type: req.body.type,
            quantity: req.body.quantity || 0 // Số lượng mặc định là 0
        });

        try {
            const savedFood = await food.save();
            res.status(201).json(savedFood);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Cập nhật món ăn
    updateFood: async (req, res) => {
        try {
            const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedFood) return res.status(404).json({ message: 'Food not found' });
            res.status(200).json(updatedFood);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xóa món ăn
    deleteFood: async (req, res) => {
        try {
            const deletedFood = await Food.findByIdAndDelete(req.params.id);
            if (!deletedFood) return res.status(404).json({ message: 'Food not found' });
            res.status(200).json({ message: 'Food deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

};

module.exports = foodController;

