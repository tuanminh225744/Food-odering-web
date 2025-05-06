const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const foodRouter = require('./routes/food.js');
const cartRouter = require('./routes/cart.js');
const userRouter = require('./routes/user.js');
const orderRouter = require('./routes/order.js');
const authRouter = require('./routes/auth.js');
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối đến MongoDB
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err); // Log lỗi kết nối MongoDB
    process.exit(1); // Thoát nếu không kết nối được
  });

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));

// Routes
app.use('/api/food', foodRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/auth', authRouter);

// Hiển thị cổng mà server đang lắng nghe
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});