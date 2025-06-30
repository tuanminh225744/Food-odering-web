import React from 'react';

const PasswordConfirmForm = () => {
    return (
        <div className="auth-form passwordConfirmForm">
            <div className="auth-form__container">
                <div className="auth-form__header">
                    <h3 className="auth-form__heading">Xác nhận mật khẩu</h3>
                </div>

                <div className="auth-form__form">
                    <div className="auth-form__group">
                        <input
                            type="password"
                            className="auth-form__input"
                            id="passwordConfirmInput"
                            placeholder="Nhập mật khẩu"
                        />
                        <span className="error-message"></span>
                    </div>
                </div>

                <div className="auth-form__controls">
                    <button className="btn btn-normal return-main-btn" id="closeModalBtn">TRỞ LẠI</button>
                    <button className="btn btn-primary" id="confirmPasswordBtn">TIẾP TỤC</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordConfirmForm;