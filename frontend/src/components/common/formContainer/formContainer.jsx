import React from "react";
import CheckEmail from "./checkEmail";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import PasswordConfirmForm from "./passwordConfirmForm";
import './formContainer.css';

const FormContainer = ({ formType, setFormType }) => {
    return (
        <>
            <div className="FormContainerOverlay">
                {formType === 'login' && <LoginForm setFormType={setFormType} />}
                {formType === 'register' && <RegisterForm setFormType={setFormType} />}
                {formType === 'forgotPassword' && <ForgotPasswordForm setFormType={setFormType} />}
                {formType === 'checkEmail' && <CheckEmail setFormType={setFormType} />}
            </div>
            {formType === 'passwordConfirm' && <PasswordConfirmForm setFormType={setFormType} />}
        </>
    );
}

export default FormContainer;