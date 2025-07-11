import React from "react";
import './loginForm.css';
import { loginUser } from "../../../api/loginAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setFormType }) => {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            email: userEmail,
            password: userPassword,
        }
        loginUser(user, dispatch, navigate);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    }

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

                    {/* <div className="auth-form-aside">
                        <div className="auth-form__help">
                            <button onClick={() => setFormType('forgotPassword')} className="auth-form__help-link auth-form__forgot">
                                Quên mật khẩu
                            </button>
                        </div>
                    </div> */}

                    <div className="auth-form__controls">
                        <button type="submit" className="btn btn-primary login-btn">ĐĂNG NHẬP</button>
                    </div>
                </div>


            </form>
        </>
    );
};

export default LoginForm;
