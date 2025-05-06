const User = require('../models/model.js').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const authController = {
    // Đăng ký người dùng mới
    register: async (req, res) => {
        try {

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
            });


            // Lưu người dùng vào cơ sở dữ liệu
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Tạo access token
    createAccessToken: (user) => {
        return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    },

    // Tạo refresh token
    createRefreshToken: (user) => {
        return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    },

    // Đăng nhập
    login: async (req, res) => {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Tìm người dùng theo tên đăng nhập
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json('User not found!');

            // Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) return res.status(400).json('Wrong password!');

            // Tạo token
            const accessToken = authController.createAccessToken(user);
            // Tạo refresh token
            const refreshToken = authController.createRefreshToken(user);

            // Lưu refresh token vào danh sách refreshTokens
            refreshTokens.push(refreshToken);

            // Lưu refresh token vào cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });

            // Lưu vào cơ sở dữ liệu
            const { password, ...others } = user._doc;
            res.status(200).json({ others, accessToken });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Refresh token
    refreshToken: async (req, res) => {
        // Lấy refresh token từ cookie
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json('You are not authenticated!');

        // Kiểm tra refresh token có trong danh sách refreshTokens hay không
        if (!refreshTokens.includes(refreshToken)) return res.status(403).json('Refresh token is not valid!');

        // Kiểm tra refresh token trong cơ sở dữ liệu
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json('Refresh token is not valid!');

            // Tạo access token, refresh token mới
            const newAccessToken = authController.createAccessToken(user);
            const newRefreshToken = authController.createRefreshToken(user);

            // Xóa refresh token cũ và thêm refresh token mới vào danh sách
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            refreshTokens.push(newRefreshToken);

            // Lưu refresh token mới vào cookie
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({ accessToken: newAccessToken });

        });
    },
};

module.exports = authController;