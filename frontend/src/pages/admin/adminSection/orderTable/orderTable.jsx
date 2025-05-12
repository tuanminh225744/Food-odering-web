import React from 'react';
import './orderTable.css';

function OrderTable({ orders, onView, onDelete }) {
    return (
        <div className="grid__column-10">
            <div className="admin__content">
                <h1 className="admin__content-heading">Quản lý đơn hàng</h1>

                <div id="admin__table">
                    <div className="admin__content-search">
                        <input
                            type="text"
                            className="admin__content-search-input"
                            placeholder="Tìm kiếm đơn hàng..."
                        />
                        <button className="admin__content-search-btn">Tìm kiếm</button>
                    </div>

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
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.customerName}</td>
                                        <td>{order.date}</td>
                                        <td>{order.total}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => onView(order)}
                                            >
                                                Xem
                                            </button>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => onDelete(order.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderTable;