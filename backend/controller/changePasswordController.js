const { User } = require('../models/model.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

function generateOTP(length = 6) {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

const changePasswordController = {
    // Bước 1: Gửi mã xác nhận về email (yêu cầu nhập đúng mật khẩu cũ)
    sendChangePasswordCode: async (req, res) => {
        try {
            const { userId, oldPassword } = req.body;
            if (!userId || !oldPassword) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Kiểm tra mật khẩu cũ
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });

            // Tạo mã xác nhận và thời gian hết hạn (5 phút)
            const code = generateOTP(6);
            const expires = Date.now() + 5 * 60 * 1000;

            user.resetPasswordCode = code;
            user.resetPasswordExpires = expires;
            await user.save();

            // Gửi email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Mã xác nhận đổi mật khẩu',
                html: `<p>Mã xác nhận đổi mật khẩu của bạn là: <b>${code}</b> (có hiệu lực trong 5 phút)</p>`,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Mã xác nhận đã được gửi về email' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Bước 2: Xác nhận mã và đổi mật khẩu mới
    confirmChangePassword: async (req, res) => {
        try {
            const { userId, code, newPassword } = req.body;
            if (!userId || !code || !newPassword) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Kiểm tra mã xác nhận và thời gian hết hạn
            if (
                !user.resetPasswordCode ||
                !user.resetPasswordExpires ||
                user.resetPasswordCode !== code ||
                user.resetPasswordExpires < Date.now()
            ) {
                return res.status(400).json({ message: 'Mã xác nhận không hợp lệ hoặc đã hết hạn' });
            }

            // Hash mật khẩu mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedPassword;
            user.resetPasswordCode = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.status(200).json({ message: 'Đổi mật khẩu thành công' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = changePasswordController;
