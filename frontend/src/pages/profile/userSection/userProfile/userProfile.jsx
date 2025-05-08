import React from 'react';
import './userProfile.css';

const UserProfile = () => (
    <div className="grid__column-10 profile-content">
        <div className="profile-header">
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>

        <div className="form-container">
            <div className="form-left">
                <div className="form-group">
                    <label>Tên</label>
                    <input type="text" value="Tuấn Minh" placeholder="Nhập tên của bạn" />
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" value="KTX Bách Khoa" placeholder="Nhập địa chỉ của bạn" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <span>
                        tu**********@gmail.com
                        <button className="btn change-profile-btn" id="change-email-btn">Thay Đổi</button>
                    </span>
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <span>
                        ********26
                        <button className="btn change-profile-btn" id="change-phone-number-btn">Thay Đổi</button>
                    </span>
                </div>
                <div className="form-group">
                    <label>Giới tính</label>
                    <div><input type="radio" name="gender" defaultChecked /><p>Nam</p></div>
                    <div><input type="radio" name="gender" /><p>Nữ</p></div>
                </div>
                <div className="form-group">
                    <button className="save-btn btn btn-primary">Lưu</button>
                </div>
            </div>

            <div className="form-right">
                <img src="assets/img/anh_user/user.jpg" alt="Avatar" className="avatar" />
                <button className="choose-btn">Chọn Ảnh</button>
                <p>Dung lượng file tối đa 1 MB<br />Định dạng: .JPEG, .PNG</p>
            </div>
        </div>
    </div>
);

export default UserProfile;