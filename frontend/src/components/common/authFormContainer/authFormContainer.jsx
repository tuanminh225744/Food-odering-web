import React from "react";
import CheckEmail from "./checkEmail";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import './authFormContainer.css';

const AuthFormContainer = ({ formType, setFormType }) => {
    return (
        <>
            {formType === 'login' && <LoginForm setFormType={setFormType} />}
            {formType === 'register' && <RegisterForm setFormType={setFormType} />}
            {formType === 'forgot' && <ForgotPasswordForm setFormType={setFormType} />}
            {formType === 'checkEmail' && <CheckEmail setFormType={setFormType} />}
        </>
    );
}

export default AuthFormContainer;