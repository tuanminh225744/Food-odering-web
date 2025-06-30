import React, { useState, useEffect } from 'react';
import OrderCard from './orderCard/orderCard';
import axiosClient from '../../api/axiosClient';
import './userOrders.css';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import UserSidebar from '../../components/common/userSidebar/userSidebar';
import { useSelector } from 'react-redux';

const STATUS_LABELS = [
    { label: 'Tất cả', value: 'ALL' },
    { label: 'Chờ xác nhận', value: 'Pending' },
    { label: 'Đang xử lý', value: 'Processing' },
    { label: 'Đang giao', value: 'Shipped' },
    { label: 'Đã giao', value: 'Delivered' },
    { label: 'Đã hủy', value: 'Cancelled' }
];

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('ALL');
    const user = useSelector((state) => state.auth.login.currentUser.others);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosClient.get(`/order/user/${user._id}`);
                setOrders(response.data || []);
                console.log('Danh sách đơn hàng:', response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách đơn hàng:', error);
                setOrders([]);
            }
        };
        if (user?._id) fetchOrders();
    }, [user]);

    const getFilteredOrders = () => {
        if (activeTab === 'ALL') return orders;
        return orders.filter(order => order.status === activeTab);
    };

    return (
        <>
            <Header />
            <div className="app__container">
                <div className="grid">
                    <div className="grid__row user-section">
                        <UserSidebar />
                        <div className="grid__column-10 order-page-container">
                            <div className="order-tabs">
                                {STATUS_LABELS.map(({ label, value }) => (
                                    <div
                                        key={value}
                                        className={`order-tabs__item ${value === activeTab ? 'order-tabs__item--active' : ''}`}
                                        onClick={() => setActiveTab(value)}
                                    >
                                        {label}
                                    </div>
                                ))}
                            </div>

                            {getFilteredOrders().map((order) => (
                                <OrderCard
                                    key={order._id}
                                    order={order}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserOrders;