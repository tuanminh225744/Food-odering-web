import React from 'react';
import './registerForm.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/registerAPI';


function RegisterForm({ setFormType }) {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [userConfirmPassword, setUserConfirmPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [errorMessages, setErrorMessages] = React.useState({});
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

    const handleRegister = async (e) => {
        e.preventDefault();

        // Kiểm tra xem người dùng đã nhập email, mật khẩu và tên chưa
        if (!userName) {
            setErrorMessages({ userName: 'Vui lòng nhập tên' });
            return;
        }

        if (!userEmail) {
            setErrorMessages({ userEmail: 'Vui lòng nhập email' });
            return;
        }

        if (!userPassword) {
            setErrorMessages({ userPassword: 'Vui lòng nhập mật khẩu' });
            return;
        }

        if (!userConfirmPassword) {
            setErrorMessages({ userConfirmPassword: 'Vui lòng xác nhận mật khẩu' });
            return;
        }

        // Kiểm tra chiều dài tên người dùng
        if (userName.length < 3 || userName.length > 20) {
            setErrorMessages({ userName: 'Tên người dùng phải từ 3 đến 20 ký tự' });
            return;
        }

        // Kiểm tra chiều dài mật khẩu
        if (userPassword.length < 6) {
            setErrorMessages({ userPassword: 'Mật khẩu phải có ít nhất 6 ký tự' });
            return;
        }

        // Kiểm tra người dùng đã nhập mật khẩu và xác nhận mật khẩu giống nhau chưa
        if (userPassword !== userConfirmPassword) {
            setErrorMessages({ userConfirmPassword: 'Mật khẩu xác nhận không khớp' });
            return;
        }

        // Tạo đối tượng người dùng để đăng ký
        const user = {
            email: userEmail,
            password: userPassword,
            username: userName,
        }
        const res = await registerUser(user, dispatch, navigate);
        if (!res.success) {
            // Hiển thị lỗi nếu đăng ký không thành công
            if (res.error.message === 'Useremail already exists!') {
                setErrorMessages({ userEmail: 'Người dùng đã tồn tại' });
            } else {
                setErrorMessages({ general: 'Đăng ký không thành công, vui lòng thử lại sau' });
            }
        } else {
            // Đăng ký thành công, chuyển hướng đến trang đăng nhập
            navigate('/login', { state: { successMessage: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
        }
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
                            {errorMessages.general && <span className="error-message">{errorMessages.general}</span>}
                            <input
                                type="text"
                                id="register-user-name"
                                className="auth-form__input"
                                placeholder="Tên của bạn"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            {errorMessages.userName && <span className="error-message">{errorMessages.userName}</span>}

                            <input
                                type="email"
                                id="register-user-email"
                                className="auth-form__input"
                                placeholder="Email của bạn"
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                            {errorMessages.userEmail && <span className="error-message">{errorMessages.userEmail}</span>}

                            <input
                                type="password"
                                id="register-user-password"
                                className="auth-form__input"
                                placeholder="Mật khẩu của bạn"
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                            {errorMessages.userPassword && <span className="error-message">{errorMessages.userPassword}</span>}

                            <input
                                type="password"
                                id="register-user-confirm-password"
                                className="auth-form__input"
                                placeholder="Nhập lại mật khẩu"
                                onChange={(e) => setUserConfirmPassword(e.target.value)}
                            />
                            {errorMessages.userConfirmPassword && <span className="error-message">{errorMessages.userConfirmPassword}</span>}
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