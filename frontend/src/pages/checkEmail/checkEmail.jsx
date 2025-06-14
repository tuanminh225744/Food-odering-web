import './checkEmail.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/common/formContainer/formContainer';

const CheckEmail = () => {
    const [formType, setFormType] = React.useState('checkEmail');

    return (
        <div className="CheckEmailPage">
            <FormContainer formType={formType} setFormType={setFormType} />
        </div>
    );
}

export default CheckEmail;