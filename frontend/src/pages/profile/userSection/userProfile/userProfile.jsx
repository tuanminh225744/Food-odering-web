import React, { useState, useEffect } from 'react';
import './userProfile.css';
import axiosClient from '../../../../api/axiosClient';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess } from '../../../../redux/authSlice'; // Đường dẫn slice có thể khác, sửa lại cho đúng

const UserProfile = () => {
    const user = useSelector((state) => state.auth.login.currentUser.others);
    const [userInfo, setUserInfo] = useState({
        username: '',
        address: '',
        email: '',
        phoneNumber: '',
        gender: 'male',
        avatar: ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setUserInfo({
                username: user.username || '',
                address: user.address || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                gender: user.gender || 'male',
                avatar: user.userImgURL || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                username: userInfo.username,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
                gender: userInfo.gender,
                userImgURL: userInfo.avatar
            };
            const res = await axiosClient.put(`/user/${user._id}`, updateData);
            alert('Cập nhật thông tin thành công!');
            dispatch(updateUserSuccess(res.data)); // Cập nhật user trong redux
            setUserInfo(prev => ({
                ...prev,
                ...res.data
            }));
            window.location.reload();
        } catch (error) {
            alert('Cập nhật thông tin thất bại!');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="grid__column-10 profile-content">
            <div className="profile-header">
                <h2>Hồ Sơ Của Tôi</h2>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className="form-left">
                    <div className="form-group">
                        <label>Email</label>
                        <span className='user-email'>{userInfo.email}</span>
                    </div>
                    <div className="form-group">
                        <label>Tên</label>
                        <input
                            type="text"
                            name="username"
                            value={userInfo.username}
                            onChange={handleChange}
                            placeholder="Nhập tên của bạn"
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            onChange={handleChange}
                            placeholder="Nhập địa chỉ của bạn"
                        />
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userInfo.phoneNumber}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại của bạn"
                        />
                    </div>
                    <div className="form-group">
                        <label>Giới tính</label>
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={userInfo.gender === 'male'}
                                onChange={handleChange}
                            />
                            <p>Nam</p>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={userInfo.gender === 'female'}
                                onChange={handleChange}
                            />
                            <p>Nữ</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary save-btn">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;