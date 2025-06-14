import React from "react";
import FormContainer from "../../components/common/formContainer/formContainer";

const ForgotPassword = () => {
    const [formType, setFormType] = React.useState('forgotPassword');

    return (
        <div className="ForgotPasswordPage">
            <FormContainer formType={formType} setFormType={setFormType} />
        </div>
    );
}

export default ForgotPassword;