import React, { useState, useEffect } from 'react';
import './changePassword.css';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import UserSidebar from '../../components/common/userSidebar/userSidebar';
import axiosClient from '../../api/axiosClient';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    const user = useSelector((state) => state.auth.login.currentUser.others);

    const handleSendCode = async () => {
        setError('');
        if (!oldPassword) {
            setError('Vui lòng nhập mật khẩu cũ');
            return;
        }
        try {
            await axiosClient.post('/user/send-change-password-code', {
                userId: user._id,
                oldPassword
            });
            setCodeSent(true);
            setStep(2);
            alert('Mã xác nhận đã được gửi về email của bạn!');
        } catch (error) {
            setError(error.response?.data?.message || 'Lỗi khi gửi mã xác nhận');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        if (!verificationCode) {
            setError('Vui lòng nhập mã xác nhận');
            return;
        }
        try {
            await axiosClient.post('/user/confirm-change-password', {
                userId: user._id,
                code: verificationCode,
                newPassword
            });
            alert('Đổi mật khẩu thành công!');
            window.location.href = '/profile';
        } catch (error) {
            setError(error.response?.data?.message || 'Lỗi khi đổi mật khẩu');
        }
    };

    return (
        <>
            <Header />
            <div className="app__container">
                <div className="grid">
                    <div className="grid__row user-section">
                        <UserSidebar />
                        <div className="grid__column-10 profile-content">
                            <div className="profile-header">
                                <h2>Đổi Mật Khẩu</h2>
                                <p>Vui lòng xác nhận email và nhập mật khẩu mới</p>
                            </div>
                            <div className="form-container">
                                <form onSubmit={handleSubmit} className="form-left">
                                    {error && <div className="error-message">{error}</div>}

                                    {step === 1 && (
                                        <>
                                            <div className="form-group">
                                                <label>Mật khẩu cũ</label>
                                                <input
                                                    type="password"
                                                    placeholder="Nhập mật khẩu cũ"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={handleSendCode}
                                                >
                                                    Gửi mã xác nhận
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <>
                                            <div className="form-group">
                                                <label>Mã xác nhận</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập mã xác nhận"
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Mật khẩu mới</label>
                                                <input
                                                    type="password"
                                                    placeholder="Nhập mật khẩu mới"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Xác nhận mật khẩu</label>
                                                <input
                                                    type="password"
                                                    placeholder="Nhập lại mật khẩu mới"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="save-btn btn btn-primary">
                                                    Đổi mật khẩu
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ChangePassword;