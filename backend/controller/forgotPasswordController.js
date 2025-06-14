const User = require('../models/model.js').User;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const forgotPasswordController = {
    sendResetEmail: async (req, res) => {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Tạo token reset password, có hiệu lực 15 phút
            const resetToken = jwt.sign(
                { id: user._id },
                process.env.JWT_RESET_PASSWORD_SECRET,
                { expiresIn: '15m' }
            );

            // Tạo link reset password
            const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

            // Cấu hình transporter gửi mail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Nội dung email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Request',
                html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
            };

            // Gửi email
            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Reset password email sent' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Xác thực token và cập nhật mật khẩu mới
    resetPassword: async (req, res) => {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        try {
            // Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
            const userId = decoded.id;

            // Hash mật khẩu mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Cập nhật mật khẩu cho user
            const user = await User.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'Password has been reset successfully' });
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).json({ message: 'Token has expired' });
            }
            res.status(400).json({ message: 'Invalid token' });
        }
    },
};

module.exports = forgotPasswordController;
