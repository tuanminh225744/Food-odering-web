import React from "react";
import './loginForm.css';
import { loginUser } from "../../../api/loginAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginForm = ({ setFormType }) => {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [errorMessages, setErrorMessages] = React.useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.successMessage || '';

    // Thực hiện đăng nhập
    // Trả về lỗi nếu đăng nhập không thành công
    const handleLogin = async (e) => {
        e.preventDefault();

        // Kiểm tra xem người dùng đã nhập email và mật khẩu chưa
        if (!userEmail) {
            setErrorMessages({ userEmail: 'Vui lòng nhập email' });
            return;
        }

        if (!userPassword) {
            setErrorMessages({ userPassword: 'Vui lòng nhập mật khẩu' });
            return;
        }
        const user = {
            email: userEmail,
            password: userPassword,
        }
        const res = await loginUser(user, dispatch, navigate);
        if (!res.success) {
            // Hiển thị lỗi nếu đăng nhập không thành công
            if (res.error === 'User not found!') {
                setErrorMessages({ userEmail: 'Người dùng không tồn tại' });
            } else if (res.error === 'Wrong password!') {
                setErrorMessages({ userPassword: 'Sai mật khẩu' });
            } else {
                setErrorMessages({ general: 'Đăng nhập không thành công, vui lòng thử lại sau' });
            }
        }

    };

    // Xử lý sự kiện nhấn phím Enter để đăng nhập
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    }

    // Chuyển hướng đến trang đăng ký
    const handleRegister = (e) => {
        e.preventDefault();
        setFormType('register');
        navigate('/register');
    }




    return (
        <>
            <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="auth-form login-form">
                <div className="auth-form__container">
                    <div className="auth-form__header">
                        <h3 className="auth-form__heading">Đăng nhập</h3>
                        <button onClick={handleRegister} className="auth-form__switch-btn">Đăng ký</button>
                    </div>

                    <div className="auth-form__form">
                        <div className="auth-form__group">

                            {successMessage && <span className="success-message">{successMessage}</span>}
                            {errorMessages.general && <span className="error-message">{errorMessages.general}</span>}
                            <input
                                type="email"
                                id="login-user-email"
                                className="auth-form__input"
                                placeholder="Email của bạn"
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                            {errorMessages.userEmail && <span className="error-message">{errorMessages.userEmail}</span>}

                            <input
                                type="password"
                                id="login-user-password"
                                className="auth-form__input"
                                placeholder="Mật khẩu của bạn"
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                            {errorMessages.userPassword && <span className="error-message">{errorMessages.userPassword}</span>}
                        </div>
                    </div>

                    <div className="auth-form-aside">
                        <div className="auth-form__help">
                            <button onClick={() => setFormType('forgotPassword')} className="auth-form__help-link auth-form__forgot">
                                Quên mật khẩu
                            </button>
                        </div>
                    </div>

                    <div className="auth-form__controls">
                        <button type="submit" className="btn btn-primary login-btn">ĐĂNG NHẬP</button>
                    </div>
                </div>

                <div className="auth-form__socials">
                    <a href="#" className="auth-form__social-facebook btn btn--size-s btn--with-icon">
                        <i className="auth-form__social-icon fa-brands fa-facebook"></i>
                        <span className="auth-form__social-title">Kết nối với Facebook</span>
                    </a>
                    <a href="#" className="auth-form__social-google btn btn--size-s btn--with-icon">
                        <i className="auth-form__social-icon fa-brands fa-google"></i>
                        <span className="auth-form__social-title">Kết nối với Google</span>
                    </a>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
