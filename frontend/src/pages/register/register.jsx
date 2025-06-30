import React, { useState } from "react";
import AuthFormContainer from "../../components/common/authFormContainer/authFormContainer";

const Register = () => {
    const [formType, setFormType] = useState('register');
    return (
        <>
            <AuthFormContainer formType={formType} setFormType={setFormType} />
        </>
    );
}

export default Register;