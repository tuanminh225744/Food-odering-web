const jwt = require('jsonwebtoken');

const middlewareController = {
    // Middleware để xác thực token
    verifyToken: (req, res, next) => {
        const token = req.headers['token']?.split(' ')[1]; // Lấy token từ header
        if (!token) return res.status(403).json('A token is required for authentication');
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(401).json('Invalid Token');
            req.user = decoded; // Lưu thông tin người dùng vào request
            next(); // Tiếp tục đến middleware hoặc route tiếp theo
        });
    },

    // Middleware để kiểm tra quyền admin
    verifyAdmin: (req, res, next) => {
        if (req.user.isAdmin) {
            next(); // Nếu là admin, tiếp tục đến middleware hoặc route tiếp theo
        } else {
            res.status(403).json('You are not allowed to do that!'); // Nếu không phải admin, trả về lỗi
        }
    },
};

module.exports = middlewareController;

