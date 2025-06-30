import React from 'react';
import './userSidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserSidebar = () => {
    const user = useSelector((state) => state.auth.login.currentUser.others);
    const navigate = useNavigate();
    const location = useLocation();

    // Xác định trang hiện tại
    const currentPath = location.pathname;

    return (
        <div className="grid__column-2 sidebar">
            <div className="sidebar-header">
                <img
                    src={user.userImgURL || '/assets/img/anh_user/default-user.jpg'}
                    alt="Avatar"
                    className="avatar avatar-small"
                />
                <p>{user.username}</p>
            </div>
            <ul>
                <li
                    className={`sidebar-btn${currentPath === '/profile' ? ' sidebar-btn-active' : ''}`}
                    onClick={() => navigate('/profile')}
                >
                    Tài Khoản Của Tôi
                </li>
                <li
                    className={`sidebar-btn${currentPath === '/orders' ? ' sidebar-btn-active' : ''}`}
                    onClick={() => navigate('/orders')}
                >
                    Đơn Mua
                </li>
                <li
                    className={`sidebar-btn${currentPath === '/changePassword' ? ' sidebar-btn-active' : ''}`}
                    onClick={() => navigate('/changePassword')}
                >
                    Đổi Mật Khẩu
                </li>
            </ul>
        </div>
    );
};

export default UserSidebar;