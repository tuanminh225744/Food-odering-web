import React from "react";
import CheckEmail from "./checkEmail";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import PasswordConfirmForm from "./passwordConfirmForm";
import ResetPasswordForm from "./resetPasswordForm";
import './formContainer.css';

const FormContainer = ({ formType, setFormType, token }) => {
    return (
        <>
            <div className="FormContainerOverlay">
                {formType === 'login' && <LoginForm setFormType={setFormType} />}
                {formType === 'register' && <RegisterForm setFormType={setFormType} />}
                {formType === 'forgotPassword' && <ForgotPasswordForm setFormType={setFormType} />}
                {formType === 'checkEmail' && <CheckEmail setFormType={setFormType} />}
                {formType === 'resetPassword' && <ResetPasswordForm token={token} />}
            </div>
            {formType === 'passwordConfirm' && <PasswordConfirmForm setFormType={setFormType} />}
        </>
    );
}

export default FormContainer;