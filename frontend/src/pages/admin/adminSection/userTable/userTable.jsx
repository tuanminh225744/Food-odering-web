import React, { useEffect, useState } from 'react';
import './userTable.css';
import axiosClient from '../../../../api/axiosClient';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const fetchUsers = async (searchValue = '') => {
        try {
            const res = await axiosClient.get('/user', {
                params: searchValue ? { search: searchValue } : {}
            });
            setUsers(res.data || []);
        } catch (error) {
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
        try {
            await axiosClient.delete(`/user/${userId}`);
            setUsers(prev => prev.filter(u => u._id !== userId));
        } catch (error) {
            alert('Xóa người dùng thất bại!');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers(search.trim());
    };

    return (
        <div className="grid__column-10">
            <div className="admin__content">
                <h1 className="admin__content-heading">Quản lý khách hàng</h1>
                <div id="admin__table">
                    <form className="admin__content-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="admin__content-search-input"
                            placeholder="Tìm kiếm khách hàng..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button className="admin__content-search-btn" type="submit" >Tìm kiếm</button>
                    </form>
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
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => handleDelete(user._id)}
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