import React, { useState } from "react";
import AuthFormContainer from "../../components/common/authFormContainer/authFormContainer";


const Login = () => {
    const [formType, setFormType] = useState('login');
    return (
        <>
            <AuthFormContainer formType={formType} setFormType={setFormType} />
        </>
    );
}

export default Login;