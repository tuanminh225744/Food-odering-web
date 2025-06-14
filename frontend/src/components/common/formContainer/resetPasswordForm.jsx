import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './resetPasswordForm.css';

const ResetPasswordForm = ({ token }) => {
    console.log('ResetPasswordForm token:', token);
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!newPassword || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Đặt lại mật khẩu thành công! Đang chuyển hướng...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Có lỗi xảy ra');
            }
        } catch {
            setError('Không thể kết nối tới máy chủ');
        }
    };

    return (
        <div className="auth-form reset-password-form">
            <div className="auth-form__container">
                <div className="auth-form__header">
                    <h3 className="auth-form__heading">Đặt lại mật khẩu</h3>
                </div>
                <form className="auth-form__form" onSubmit={handleSubmit}>
                    <div className="auth-form__group">
                        <input
                            type="password"
                            className="auth-form__input"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="auth-form__group">
                        <input
                            type="password"
                            className="auth-form__input"
                            placeholder="Xác nhận mật khẩu mới"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <span className="error-message">{error}</span>}
                    {success && <span className="success-message">{success}</span>}
                    <div className="auth-form__controls">
                        <button type="submit" className="btn btn-primary">ĐẶT LẠI MẬT KHẨU</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
