const { get } = require('mongoose');
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

    // Thêm sản phẩm vào giỏ hàng
    addToCart: async (req, res) => {
        const { userID, foodId, quantity } = req.body;

        try {
            let cart = await Cart.findOne({ userID });

            if (!cart) {
                cart = new Cart({
                    userID,
                    items: [{ foodId, quantity }],
                });
            } else {
                const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
                if (itemIndex > -1) {
                    // Sản phẩm đã có trong giỏ hàng, cập nhật số lượng
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    // Sản phẩm chưa có trong giỏ hàng, thêm mới
                    cart.items.push({ foodId, quantity });
                }
            }

            const savedCart = await cart.save();
            res.status(200).json(savedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy giỏ hàng của người dùng
    getCartByUserId: async (req, res) => {
        const userId = req.params.userId;
        try {
            const cart = await Cart.findOne({ userID: userId }).populate('userID').populate('items.foodId');
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: async (req, res) => {
        const { userID, foodId } = req.body;

        try {
            const cart = await Cart.findOne({ userID });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Tìm và xóa sản phẩm khỏi giỏ hàng
            cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);

            // Lưu giỏ hàng đã cập nhật
            const updatedCart = await cart.save();
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = cartController;