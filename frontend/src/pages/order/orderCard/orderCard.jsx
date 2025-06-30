import React, { useState, useEffect } from 'react';
import axiosClient from '../../../api/axiosClient';
import './orderCard.css';

const STATUS_TEXT = {
    Pending: 'Chờ xác nhận',
    Processing: 'Đang xử lý',
    Shipped: 'Đang giao',
    Delivered: 'Đã giao',
    Cancelled: 'Đã hủy'
};

const OrderCard = ({ order }) => {

    if (!order) return null;

    const handleCancelOrder = async () => {
        try {
            await axiosClient.put(`/order/${order._id}`, { status: 'Cancelled' });
            alert('Đã hủy đơn hàng thành công');
            window.location.reload();
        } catch (error) {
            alert('Hủy đơn hàng thất bại');
        }
    };

    const handleConfirmOrder = async () => {
        try {
            await axiosClient.put(`/order/${order._id}`, { status: 'Delivered' });
            alert('Xác nhận đã nhận hàng thành công');
            window.location.reload();
        } catch (error) {
            alert('Xác nhận đơn hàng thất bại');
        }
    };

    // Hiển thị nút theo trạng thái
    const renderActions = () => {
        if (order.status === 'Pending') {
            return (
                <button className="btn btn-danger" onClick={handleCancelOrder}>
                    Hủy đơn hàng
                </button>
            );
        }
        if (order.status === 'Shipped') {
            return (
                <button className="btn btn-primary" onClick={handleConfirmOrder}>
                    Đã nhận hàng
                </button>
            );
        }
        return null;
    };

    return (
        <div className="order-card">
            <div className="order-card__header">
                <span className="order-card__id">Mã đơn: {order._id}</span>
                <span className={`order-card__status ${order.status.toLowerCase()}`}>
                    {STATUS_TEXT[order.status] || order.status}
                </span>
            </div>
            {order.items.map((item, idx) => (
                <div key={item.foodId?._id || idx} className="order-card__body">
                    <img
                        className="order-card__image"
                        src={item.foodId?.imageUrl}
                        alt={item.foodId?.name}
                    />
                    <div className="order-card__details">
                        <h4 className="order-card__title">{item.foodId?.name}</h4>
                        <div className="order-card__meta">
                            <div className="order-card__price">
                                <span className="original-price">{item.foodId?.price?.toLocaleString()}₫</span>
                            </div>
                        </div>
                        <div className="order-card__quantity">
                            <span className="order-card__quantity-label">Số lượng:</span>
                            <span className="order-card__quantity-value">
                                {item.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="order-card__footer">
                <div className="order-card__total">
                    Thành tiền: <span>
                        {order.totalAmount?.toLocaleString()}₫
                    </span>
                </div>
                <div className="order-card__actions">
                    {renderActions()}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;