const { User, Order, Food } = require('../models/model.js');

const statisticalController = {
    getStatistics: async (req, res) => {
        try {
            const userCount = await User.countDocuments();
            const orderCount = await Order.countDocuments();
            const productCount = await Food.countDocuments();
            const totalRevenueAgg = await Order.aggregate([
                { $match: { status: { $in: ['Delivered'] } } },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]);
            const totalRevenue = totalRevenueAgg[0]?.total || 0;

            // Sản phẩm bán chạy nhất và ít được mua nhất
            // const productSales = await Order.aggregate([
            //     { $unwind: "$items" },
            //     { $match: { status: "Delivered" } },
            //     { $group: { _id: "$items.foodId", totalSold: { $sum: "$items.quantity" } } },
            //     { $sort: { totalSold: -1 } }
            // ]);
            // let bestProduct = null, worstProduct = null;
            // if (productSales.length > 0) {
            //     bestProduct = await Food.findById(productSales[0]._id);
            //     worstProduct = await Food.findById(productSales[productSales.length - 1]._id);
            // }

            // Doanh thu theo tháng (12 tháng gần nhất) + số đơn nhận, số đơn hủy
            const monthlyRevenue = await Order.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$orderDate" } },
                        total: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Delivered"] }, "$totalAmount", 0]
                            }
                        },
                        deliveredCount: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0]
                            }
                        },
                        cancelledCount: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0]
                            }
                        }
                    }
                },
                { $sort: { _id: 1 } }
            ]);

            res.status(200).json({
                userCount,
                orderCount,
                productCount,
                totalRevenue,
                // bestProduct: bestProduct ? { name: bestProduct.name, totalSold: productSales[0].totalSold } : null,
                // worstProduct: worstProduct ? { name: worstProduct.name, totalSold: productSales[productSales.length - 1].totalSold } : null,
                monthlyRevenue
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = statisticalController;
