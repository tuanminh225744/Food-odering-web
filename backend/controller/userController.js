const { Food, Order, User, Cart } = require('../models/model.js');
const bcrypt = require('bcrypt');

const userController = {
    // Lấy tất cả người dùng
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy người dùng theo ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Tạo người dùng mới
    createUser: async (req, res) => {
        try {
            console.log('Request body:', req.body); // Log dữ liệu nhận được từ client

            // Kiểm tra dữ liệu đầu vào
            if (!req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Hash mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Tạo người dùng mới
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                isAdmin: req.body.isAdmin || false, // Mặc định là false nếu không có giá trị
            });

            // Lưu người dùng vào cơ sở dữ liệu
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error creating user:', error); // Log lỗi chi tiết
            res.status(500).json({ message: error.message });
        }
    },

    // Cập nhật người dùng
    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xóa người dùng
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;