const { Food, Order, User, Cart } = require('../models/model.js');

const cartController = {

    // Lấy tất cả giỏ hàng
    getAllCarts: async (req, res) => {
        try {
            const carts = await Cart.find().populate('userID').populate('items.foodId');
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy giỏ hàng theo ID
    getCartById: async (req, res) => {
        try {
            const cart = await Cart.findById(req.params.id).populate('userID').populate('items.foodId');
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Tạo giỏ hàng mới
    createCart: async (req, res) => {
        const cart = new Cart({
            userID: req.body.userID,
            items: req.body.items,
        });

        try {
            const savedCart = await cart.save();
            res.status(201).json(savedCart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Cập nhật giỏ hàng
    updateCart: async (req, res) => {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userID').populate('items.foodId');
            if (!updatedCart) return res.status(404).json({ message: 'Cart not found' });
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xóa giỏ hàng
    deleteCart: async (req, res) => {
        try {
            const deletedCart = await Cart.findByIdAndDelete(req.params.id);
            if (!deletedCart) return res.status(404).json({ message: 'Cart not found' });
            res.status(200).json({ message: 'Cart deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

}

module.exports = cartController;