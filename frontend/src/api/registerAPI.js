import axiosClient from './axiosClient';
import { registerStart, registerSuccess, registerFailure } from '../redux/authSlice';

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        // Đăng ký user và lấy thông tin user mới (bao gồm _id)
        const userRes = await axiosClient.post('/auth/register', user);
        dispatch(registerSuccess());

        const userId = userRes.data._id; // Lấy _id từ response

        // Tạo cart mới cho user
        await axiosClient.post('/cart', {
            userID: userId,
            items: [],
        });

        // Chuyển hướng đến trang đăng nhập
        navigate('/login', { state: { successMessage: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
        return {
            success: true,
            message: 'Đăng ký thành công, vui lòng đăng nhập',
        };
    } catch (err) {
        dispatch(registerFailure());
        return {
            success: false,
            error: err.response ? err.response.data : 'Đăng ký không thành công, vui lòng thử lại sau',
        };
    }
};