const { Food, Order, User, Cart } = require('../models/model.js');

const orderController = {
    // Lấy tất cả đơn hàng
    getAllOrders: async (req, res) => {
        try {
            const search = req.query.search;
            let orders;
            if (search) {
                // Tìm kiếm theo tên người dùng (username)
                orders = await Order.find()
                    .populate({
                        path: 'userID',
                        match: { username: { $regex: search, $options: 'i' } }
                    })
                    .populate('items.foodId');
                // Lọc ra các đơn hàng có userID match
                orders = orders.filter(order => order.userID);
            } else {
                orders = await Order.find()
                    .populate('userID')
                    .populate('items.foodId');
            }
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
            shippingAddress: req.body.shippingAddress,
            shippingPhone: req.body.shippingPhone,
        });

        try {
            const savedOrder = await order.save();

            // Xóa các sản phẩm đã mua khỏi giỏ hàng của user
            const userCart = await Cart.findOne({ userID: req.body.userID });
            if (userCart) {
                // Lấy danh sách foodId đã mua
                const purchasedFoodIds = req.body.items.map(item => item.foodId.toString());
                // Giữ lại các item chưa mua
                userCart.items = userCart.items.filter(
                    item => !purchasedFoodIds.includes(item.foodId.toString())
                );
                await userCart.save();
            }

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

    // Lấy đơn hàng của người dùng
    getUserOrders: async (req, res) => {
        try {
            const orders = await Order.find({ userID: req.params.userID }).populate('userID').populate('items.foodId');
            if (!orders.length) return res.status(404).json({ message: 'No orders found for this user' });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = orderController;