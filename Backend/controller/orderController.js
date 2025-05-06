const { Food, Order, User, Cart } = require('../models/model.js');

const orderController = {
    // Lấy tất cả đơn hàng
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('userID').populate('items.foodId');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy đơn hàng theo ID
    getOrderById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate('userID').populate('items.foodId');
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Tạo đơn hàng mới
    createOrder: async (req, res) => {
        const order = new Order({
            userID: req.body.userID,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            status: req.body.status,
        });

        try {
            const savedOrder = await order.save();
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Cập nhật đơn hàng
    updateOrder: async (req, res) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userID').populate('items.foodId');
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xóa đơn hàng
    deleteOrder: async (req, res) => {
        try {
            const deletedOrder = await Order.findByIdAndDelete(req.params.id);
            if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = orderController;