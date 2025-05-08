import React from 'react';
import OrderCard from './orderCart/orderCart';
import './userOrders.css';

const orders = [
    { status: 'CHO_GIAO_HANG', text: 'CHỜ GIAO HÀNG' },
    { status: 'HOAN_THANH', text: 'HOÀN THÀNH' },
    { status: 'DA_HUY', text: 'ĐÃ HỦY' }
];

const UserOrders = () => (
    <div className="grid__column-10 order-page-container">
        <div className="order-tabs">
            {[
                'Tất cả',
                'Chờ giao hàng',
                'Hoàn thành',
                'Đã hủy',
            ].map((label, index) => (
                <div
                    key={index}
                    className={`order-tabs__item ${index === 0 ? 'order-tabs__item--active' : ''}`}
                    data-status={label.toUpperCase().replace(/\s/g, '_')}
                >
                    {label}<span className="order-tabs__count"></span>
                </div>
            ))}
        </div>

        {orders.map((order, index) => (
            <OrderCard key={index} status={order.status} statusText={order.text} />
        ))}
    </div>
);

export default UserOrders;