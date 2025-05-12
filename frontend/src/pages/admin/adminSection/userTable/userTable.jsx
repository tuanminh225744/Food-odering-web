import React from 'react';
import './userTable.css';

function UserTable({ users, onEdit, onDelete }) {
    return (
        <div className="grid__column-10">
            <div className="admin__content">
                <h1 className="admin__content-heading">Quản lý khách hàng</h1>

                <div id="admin__table">
                    <div className="admin__content-search">
                        <input
                            type="text"
                            className="admin__content-search-input"
                            placeholder="Tìm kiếm khách hàng..."
                        />
                        <button className="admin__content-search-btn">Tìm kiếm</button>
                    </div>

                    <div className="admin__content-table">
                        <table className="admin__content-table-list" id="userTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => onEdit(user)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => onDelete(user.id)}
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

export default UserTable;