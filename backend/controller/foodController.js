const { Food, Cart, User, Order } = require('../models/model.js');

const foodController = {
    // Lấy tất cả món ăn
    getAllFood: async (req, res) => {
        try {
            const foods = await Food.find();
            res.status(200).json(foods);
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

    // Tạo món ăn mới
    createFood: async (req, res) => {
        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            category: req.body.category,
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

