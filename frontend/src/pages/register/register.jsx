import React, { useState } from "react";
import FormContainer from "../../components/common/formContainer/formContainer";

const Register = () => {
    const [formType, setFormType] = useState('register');
    return (
        <>
            <FormContainer formType={formType} setFormType={setFormType} />
        </>
    );
}

export default Register;