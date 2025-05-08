import React from 'react';
import './userSidebar.css';

const UserSidebar = ({ onSelectSection, activeSection }) => (
    <div className="grid__column-2 sidebar">
        <div className="sidebar-header">
            <img src="assets/img/anh_user/user.jpg" alt="Avatar" className="avatar avatar-small" />
            <p>Shiina Mahiru</p>
        </div>
        <ul>
            <li
                className={`sidebar-btn ${activeSection === 'profile' ? 'sidebar-btn-active' : ''}`}
                onClick={() => onSelectSection('profile')}
            >
                Tài Khoản Của Tôi
            </li>
            <li
                className={`sidebar-btn ${activeSection === 'orders' ? 'sidebar-btn-active' : ''}`}
                onClick={() => onSelectSection('orders')}
            >
                Đơn Mua
            </li>
            <li
                className={`sidebar-btn ${activeSection === 'changePassword' ? 'sidebar-btn-active' : ''}`}
                onClick={() => onSelectSection('changePassword')}
            >
                Đổi Mật Khẩu
            </li>

        </ul>
    </div>
);

export default UserSidebar;