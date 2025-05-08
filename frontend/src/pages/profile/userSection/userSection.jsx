import React, { useState } from 'react';
import UserSidebar from './userSidebar/userSidebar';
import UserProfile from './userProfile/userProfile';
import UserOrders from './userOrders/userOrders';
import ChangePassword from './changePassword/changePassword';
import './userSection.css';

const UserSection = () => {
    const [activeSection, setActiveSection] = useState('profile'); // 'profile' hoặc 'orders'

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row user-section">
                    <UserSidebar onSelectSection={setActiveSection} activeSection={activeSection} />
                    {activeSection === 'profile' && <UserProfile />}
                    {activeSection === 'orders' && <UserOrders />}
                    {activeSection === 'changePassword' && <ChangePassword />}
                    {/* Thêm các phần khác nếu cần */}
                </div>
            </div>
        </div>

    );
};

export default UserSection;