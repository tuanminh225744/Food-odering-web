import React from 'react';
import './forgotPasswordForm.css';

function ForgotPasswordForm({ setFormType }) {
    return (
        <>
            {/* Forgot Password Form */}
            <div className="auth-form forgot-password-form">
                <div className="auth-form__container">
                    <div className="auth-form__header">
                        <h3 className="auth-form__heading">Đặt lại mật khẩu</h3>
                    </div>

                    <div className="auth-form__form">
                        <div className="auth-form__group">
                            <input
                                type="email"
                                id="forgot-user-email"
                                className="auth-form__input"
                                placeholder="Email của bạn"
                            />
                            <span className="error-message"></span>
                        </div>
                    </div>

                    <div className="auth-form__controls">
                        <button onClick={() => setFormType('login')} className="btn btn-normal mr-8px back-to-login">TRỞ LẠI</button>
                        <button onClick={() => setFormType('checkEmail')} className="btn btn-primary next-check-email-notification-btn">
                            TIẾP THEO
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordForm