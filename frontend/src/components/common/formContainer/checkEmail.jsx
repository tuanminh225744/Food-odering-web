import React from 'react';
import './checkEmail.css';
import { useNavigate } from 'react-router-dom';

function CheckEmail({ setFormType }) {

    const navigate = useNavigate();

    // Xử lý sự kiện nhấn nút trở lại đăng nhập
    const handleBackToLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <>
            {/* Check Email Notification Form */}
            <div className="auth-form check-email-notification-form">
                <div className="auth-form__container">
                    <div className="auth-form__header">
                        <h3 className="auth-form__heading">Kiểm tra email</h3>
                    </div>

                    <div className="auth-form__form">
                        <p className="auth-form__notification-text">
                            Chúng tôi đã gửi một email đến địa chỉ của bạn. Vui lòng kiểm tra email
                            và làm theo hướng dẫn để đặt lại mật khẩu.
                        </p>
                    </div>

                    <div className="auth-form__controls">
                        <button onClick={() => setFormType('login')} className="btn btn-primary back-to-login-form">ĐĂNG NHẬP</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckEmail