import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`http://localhost:5000/api/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate('/home');
        return { success: true };
    } catch (err) {
        dispatch(loginFailure());
        console.error('Login error:', err.response ? err.response.data : err.message);
        return { success: false, error: err.response ? err.response.data : 'Đăng nhập không thành công' };
    }
}
