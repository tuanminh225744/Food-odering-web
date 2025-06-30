// File này dùng để cấu hình axios client
// Sau đây là một ví dụ về cách cấu hình axios client trong React để gửi yêu cầu đến API.
// const res = await axiosClient.get('/profile');
// chỉ cần gọi axiosClient.get('/profile') là đủ

import axios from 'axios';
import store from '../redux/store'; // Đường dẫn tới file store của bạn

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để xử lý request
axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token; // Lấy token từ Redux store

    // Nếu data là FormData, đổi Content-Type
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Thêm interceptor để xử lý response
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosClient;