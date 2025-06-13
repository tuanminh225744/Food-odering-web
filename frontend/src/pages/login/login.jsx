import React, { useState } from "react";
import FormContainer from "../../components/common/formContainer/formContainer";


const Login = () => {
    const [formType, setFormType] = useState('login');
    return (
        <>
            <FormContainer formType={formType} setFormType={setFormType} />
        </>
    );
}

export default Login;