import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosClient from '../../../api/axiosClient';
import './paySection.css'
import { useSelector } from 'react-redux';

function PaySection() {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState(location.state?.items || []);
    const user = useSelector((state) => state.auth.login.currentUser.others);
    const [shippingInfo, setShippingInfo] = useState({
        phone: user?.phoneNumber || '',
        address: user?.address || ''
    });

    const handleQuantityChange = (index, change) => {
        setOrderItems(prev => prev.map((item, idx) => {
            if (idx === index) {
                const newQuantity = Math.max(1, (item.quantity || 1) + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const calculateTotal = () => {
        return orderItems.reduce((sum, item) => {
            const price = item.price || 0;
            const quantity = item.quantity || 1;
            return sum + price * quantity;
        }, 0);
    };

    const handleSubmitOrder = async () => {
        try {
            // Chuẩn hóa dữ liệu items cho backend
            const items = orderItems.map(item => ({
                foodId: item._id || item.foodId?._id,
                quantity: item.quantity || 1
            }));

            await axiosClient.post('/order', {
                userID: user._id,
                items,
                totalAmount: calculateTotal(),
                shippingAddress: shippingInfo.address,
                shippingPhone: shippingInfo.phone
            });
            alert('Đặt hàng thành công!');
            navigate('/orders');
        } catch (error) {
            console.error('Chi tiết lỗi:', error.response?.data || error.message);
            alert('Đặt hàng thất bại! Vui lòng thử lại');
        }
    };

    return (
        <>
            <div className="pay-section">
                {/* Địa chỉ nhận hàng */}
                <div className="shipping-info">
                    <div className="shipping-icon">📍</div>
                    <div className="shipping-details">
                        <p className="label">Địa Chỉ Nhận Hàng</p>
                        <input
                            type="text"
                            className="shipping-phone"
                            placeholder="Nhập số điện thoại"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        />
                        <input
                            type="text"
                            className="shipping-address"
                            placeholder="Nhập địa chỉ nhận hàng"
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pay-header">
                    <h2>Thanh Toán</h2>
                    <p>Vui lòng kiểm tra thông tin đơn hàng trước khi thanh toán</p>
                </div>

                <div className="pay-content">
                    <div className="product-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr key={item._id || item.foodId?._id || index}>
                                        <td className="product-info">
                                            <img src={item.imageUrl || item.foodId?.imageUrl} alt={item.name || item.foodId?.name} />
                                            <div className="product-details">
                                                <div className="product-name">{item.name || item.foodId?.name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-container">
                                                <span className="original-price">
                                                    {(item.price || 0).toLocaleString()}₫
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="quantity-control">
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(index, -1)}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-display">{item.quantity || 1}</span>
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(index, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            {((item.price || 0) * (item.quantity || 1)).toLocaleString()}₫
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pay-summary">
                        <span>Tổng thanh toán: </span>
                        <span className="pay-total">{calculateTotal().toLocaleString()}₫</span>
                    </div>
                    <div className="pay-methods">
                        <h3>Phương Thức Thanh Toán</h3>
                        <label className='pay-method'><input type="radio" defaultChecked name="method" /> Thanh toán khi nhận hàng</label><br />
                    </div>
                </div>

                <button
                    className="btn btn-primary pay-btn"
                    onClick={handleSubmitOrder}
                >
                    Đặt Hàng
                </button>
            </div>
        </>
    )
}

export default PaySection