import React from "react";
import './loginForm.css';
import { loginUser } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setFormType }) => {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            email: userEmail,
            password: userPassword,
        }
        loginUser(newUser, dispatch, navigate);
    };

    return (
        <>
            <form onSubmit={handleLogin} className="auth-form login-form">
                <div className="auth-form__container">
                    <div className="auth-form__header">
                        <h3 className="auth-form__heading">Đăng nhập</h3>
                        <button onClick={() => setFormType('register')} className="auth-form__switch-btn">Đăng ký</button>
                    </div>

                    <div className="auth-form__form">
                        <div className="auth-form__group">
                            <input
                                type="email"
                                id="login-user-email"
                                className="auth-form__input"
                                placeholder="Email của bạn"
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <span className="error-message"></span>
                            <input
                                type="password"
                                id="login-user-password"
                                className="auth-form__input"
                                placeholder="Mật khẩu của bạn"
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                            <span className="error-message"></span>
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
