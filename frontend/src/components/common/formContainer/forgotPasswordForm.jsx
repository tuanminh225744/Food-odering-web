import React from 'react';
import './forgotPasswordForm.css';
import { useNavigate } from 'react-router-dom';



const ForgotPasswordForm = ({ setFormType }) => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    // Xử lý sự kiện nhấn phím trở lại đăng nhập
    const handleBackToLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    // Xử lý sự kiện nhấn nút tiếp theo để kiểm tra email
    const handleNextCheckEmail = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        // Kiểm tra xem người dùng đã nhập email chưa
        if (!email) {
            setErrorMessage('Vui lòng nhập email của bạn');
            return;
        }

        // Gửi yêu cầu đặt lại mật khẩu
        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Vui lòng kiểm tra email để đặt lại mật khẩu.');
                // Optionally chuyển hướng sau 2s
                setTimeout(() => {
                    navigate('/check-email', { state: { email } });
                }, 2000);
            } else {
                setErrorMessage(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch (err) {
            setErrorMessage('Không thể kết nối tới máy chủ.');
            console.error('Error:', err);
        }
    };

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorMessage && <span className="error-message">{errorMessage}</span>}
                            {successMessage && <span className="success-message">{successMessage}</span>}
                        </div>
                    </div>

                    <div className="auth-form__controls">
                        <button onClick={handleBackToLogin} className="btn btn-normal mr-8px back-to-login">TRỞ LẠI</button>
                        <button onClick={handleNextCheckEmail} className="btn btn-primary next-check-email-notification-btn">
                            TIẾP THEO
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordForm