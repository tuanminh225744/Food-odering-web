import React, { useEffect, useState } from 'react';
import './orderTable.css';
import axiosClient from '../../../../api/axiosClient';

const STATUS_TEXT = {
    Pending: 'Chờ xác nhận',
    Processing: 'Đang xử lý',
    Shipped: 'Đang giao',
    Delivered: 'Đã giao',
    Cancelled: 'Đã hủy'
};
const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

// Quy định các trạng thái hợp lệ tiếp theo cho từng trạng thái hiện tại
const VALID_NEXT_STATUS = {
    Pending: ['Processing', 'Cancelled'],
    Processing: ['Shipped', 'Cancelled'],
    Shipped: ['Delivered', 'Cancelled'],
    Delivered: [], // Không thể chuyển tiếp
    Cancelled: []  // Không thể chuyển tiếp
};

function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState('');

    const fetchOrders = async (searchValue = '') => {
        try {
            const res = await axiosClient.get('/order', {
                params: searchValue ? { search: searchValue } : {}
            });
            setOrders(res.data || []);
        } catch (error) {
            setOrders([]);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        if (!window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
        try {
            await axiosClient.delete(`/order/${orderId}`);
            setOrders(prev => prev.filter(o => o._id !== orderId));
        } catch (error) {
            alert('Xóa đơn hàng thất bại!');
        }
    };

    const handleView = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleStatusChange = async (orderId, newStatus, currentStatus) => {
        if (newStatus === currentStatus) return;
        // Kiểm tra trạng thái hợp lệ
        if (!VALID_NEXT_STATUS[currentStatus] || !VALID_NEXT_STATUS[currentStatus].includes(newStatus)) {
            alert('Không thể chuyển trạng thái này!');
            return;
        }
        if (!window.confirm(`Bạn có chắc muốn chuyển trạng thái đơn hàng từ "${STATUS_TEXT[currentStatus]}" sang "${STATUS_TEXT[newStatus]}"?`)) {
            return;
        }
        try {
            await axiosClient.put(`/order/${orderId}`, { status: newStatus });
            setOrders(prev =>
                prev.map(o =>
                    o._id === orderId ? { ...o, status: newStatus } : o
                )
            );
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            alert('Cập nhật trạng thái thất bại!');
        }
    };

    const renderStatusSelect = (order) => {
        const currentStatus = order.status;
        // Chỉ cho phép chọn các trạng thái hợp lệ tiếp theo, không cho phép quay lại trạng thái trước
        const allowedStatuses = [currentStatus, ...(VALID_NEXT_STATUS[currentStatus] || [])];
        return (
            <select
                value={currentStatus}
                onChange={e => handleStatusChange(order._id, e.target.value, currentStatus)}
                className="admin__order-status-select"
                disabled={VALID_NEXT_STATUS[currentStatus].length === 0}
            >
                {STATUS_OPTIONS.map(status => (
                    <option
                        key={status}
                        value={status}
                        disabled={!allowedStatuses.includes(status)}
                    >
                        {STATUS_TEXT[status]}
                    </option>
                ))}
            </select>
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchOrders(search.trim());
    };

    return (
        <div className="grid__column-10">
            <div className="admin__content">
                <h1 className="admin__content-heading">Quản lý đơn hàng</h1>
                <div id="admin__table">
                    <form className="admin__content-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="admin__content-search-input"
                            placeholder="Tìm kiếm đơn hàng theo tên khách hàng..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button className="admin__content-search-btn" type="submit">Tìm kiếm</button>
                    </form>
                    <div className="admin__content-table">
                        <table className="admin__content-table-list" id="orderTable">
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Khách hàng</th>
                                    <th>Ngày đặt</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.userID?.username || ''}</td>
                                        <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : ''}</td>
                                        <td>{order.totalAmount?.toLocaleString()}₫</td>
                                        <td>
                                            {renderStatusSelect(order)}
                                        </td>
                                        <td>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => handleView(order)}
                                            >
                                                Xem
                                            </button>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => handleDelete(order._id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Modal/Chi tiết đơn hàng */}
                    {selectedOrder && (
                        <div className="order-modal">
                            <div className="order-modal-content">
                                <h2>Chi tiết đơn hàng</h2>
                                <p><b>Mã đơn:</b> {selectedOrder._id}</p>
                                <p><b>Khách hàng:</b> {selectedOrder.userID?.username}</p>
                                <p><b>Địa chỉ giao hàng:</b> {selectedOrder.shippingAddress}</p>
                                <p><b>Số điện thoại giao hàng:</b> {selectedOrder.shippingPhone}</p>
                                <p>
                                    <b>Trạng thái:</b>{' '}
                                    {renderStatusSelect(selectedOrder)}
                                </p>
                                <p><b>Ngày đặt:</b> {selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleString() : ''}</p>
                                <p><b>Tổng tiền:</b> {selectedOrder.totalAmount?.toLocaleString()}₫</p>
                                <h4>Danh sách sản phẩm:</h4>
                                <ul>
                                    {selectedOrder.items.map((item, idx) => (
                                        <li key={item.foodId?._id || idx}>
                                            {item.foodId?.name} - SL: {item.quantity} - Giá: {item.foodId?.price?.toLocaleString()}₫
                                        </li>
                                    ))}
                                </ul>
                                <button className="admin__content-table-btn" onClick={handleCloseModal}>Đóng</button>
                            </div>
                            <div className="order-modal-overlay" onClick={handleCloseModal}></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderTable;