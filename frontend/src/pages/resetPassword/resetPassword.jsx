import React, { useState } from "react";
import FormContainer from "../../components/common/formContainer/formContainer";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [formType, setFormType] = useState('resetPassword');
    const { token } = useParams();
    return (
        <>
            <FormContainer formType={formType} setFormType={setFormType} token={token} />
        </>
    );
}

export default ResetPassword;