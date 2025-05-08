import React from 'react';
import './changePassword.css';

const ChangePassword = () => {
    return (
        <div className="grid__column-10 profile-content">
            <div className="profile-header">
                <h2>Đổi Mật Khẩu</h2>
                <p>Vui lòng nhập mật khẩu hiện tại và mật khẩu mới</p>
            </div>

            <div className="form-container">
                <div className="form-left">
                    <div className="form-group">
                        <label>Mật khẩu hiện tại</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                        />
                    </div>
                    <div className="form-group">
                        <button className="save-btn btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;