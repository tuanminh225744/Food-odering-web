import React from 'react';
import './registerForm.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/registerAPI';


function RegisterForm({ setFormType }) {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setFormType('login');
        navigate('/login');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleRegister(e);
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const user = {
            email: userEmail,
            password: userPassword,
            username: userName,
        }
        registerUser(user, dispatch, navigate);
    }




    return (
        <>
            <form onSubmit={handleRegister} onKeyDown={handleKeyDown} className="auth-form register-form">
                <div className="auth-form__container">
                    <div className="auth-form__header">
                        <h3 className="auth-form__heading">Đăng ký</h3>
                        <button onClick={handleLogin} className="auth-form__switch-btn">Đăng nhập</button>
                    </div>

                    <div className="auth-form__form">
                        <div className="auth-form__group">
                            <input
                                type="text"
                                id="register-user-name"
                                className="auth-form__input"
                                placeholder="Tên của bạn"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <span className="error-message"></span>

                            <input
                                type="email"
                                id="register-user-email"
                                className="auth-form__input"
                                placeholder="Email của bạn"
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <span className="error-message"></span>

                            <input
                                type="password"
                                id="register-user-password"
                                className="auth-form__input"
                                placeholder="Mật khẩu của bạn"
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                            <span className="error-message"></span>

                            <input
                                type="password"
                                id="register-user-confirm-password"
                                className="auth-form__input"
                                placeholder="Nhập lại mật khẩu"
                            />
                            <span className="error-message"></span>
                        </div>
                    </div>

                    <div className="auth-form-aside">
                        <p className="auth-form__policy-text">
                            Bằng việc đăng kí, bạn đã đồng ý với Shopee về{" "}
                            <a href="#" className="auth-form__policy-link">
                                Điều khoản dịch vụ
                            </a>{" "}
                            và{" "}
                            <a href="#" className="auth-form__policy-link">
                                Chính sách bảo mật
                            </a>
                        </p>
                    </div>

                    <div className="auth-form__controls">
                        <button className="btn btn-primary register-btn">ĐĂNG KÝ</button>
                    </div>
                </div>

                <div className="auth-form__socials">
                    <a
                        href="#"
                        className="auth-form__social-facebook btn btn--size-s btn--with-icon"
                    >
                        <i className="auth-form__social-icon fa-brands fa-facebook"></i>
                        <span className="auth-form__social-title">Kết nối với Facebook</span>
                    </a>
                    <a
                        href="#"
                        className="auth-form__social-google btn btn--size-s btn--with-icon"
                    >
                        <i className="auth-form__social-icon fa-brands fa-google"></i>
                        <span className="auth-form__social-title">Kết nối với Google</span>
                    </a>
                </div>
            </form>
        </>
    )
}

export default RegisterForm