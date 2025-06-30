const mongoose = require('mongoose');

// Định nghĩa các schema cho các collection trong MongoDB
// Food Schema 
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    saleOffPrecent: {
        type: Number,
        default: 0,
    },
    starRating: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0, // Số lượng mặc định là 0
    },
});

// Order Schema
const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    shippingPhone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    userImgURL: {
        type: String,
    },
    resetPasswordCode: {
        type: String,
    },
    resetPasswordExpires: {
        type: Number,
    }
});

// Cart Schema
const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});


const Cart = mongoose.model('Cart', cartSchema);
const Food = mongoose.model('Food', foodSchema);
const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Food,
    Order,
    User,
    Cart,
};