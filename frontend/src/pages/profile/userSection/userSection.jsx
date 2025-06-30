import React, { useState } from 'react';
import UserSidebar from '../../../components/common/userSidebar/userSidebar';
import UserProfile from './userProfile/userProfile';

import './userSection.css';

const UserSection = () => {


    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row user-section">
                    <UserSidebar />
                    <UserProfile />
                </div>
            </div>
        </div>

    );
};

export default UserSection;