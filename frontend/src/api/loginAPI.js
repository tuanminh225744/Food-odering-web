import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, setToken } from '../redux/authSlice';
import axiosClient from './axiosClient';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axiosClient.post(`/auth/login`, user);
        dispatch(loginSuccess(res.data));
        console.log('Login successful:', res.data);
        // Save token
        dispatch(setToken(res.data.token));
        console.log('a:', res.data.others.isAdmin);
        if (res.data.others.isAdmin === true) {
            navigate('/admin');
        } else {
            navigate('/home');
        }
    } catch (err) {
        dispatch(loginFailure());
    }
}
