import axios from 'axios';
import { registerStart, registerSuccess, registerFailure } from '../redux/authSlice';

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:5000/api/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login'); // Sau khi đăng ký thành công, chuyển về trang đăng nhập
    } catch (err) {
        dispatch(registerFailure());
    }
};