import { message } from "antd";
import axios from "axios";

const API = axios.create({
    baseURL: `${process.env.API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized! Redirecting to login...');
            message.error("Unauthorized! Redirecting to login...")
            // TODO: move JWT to HttpOnly cookie and add token-refresh mechanism (deferred)
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        console.error('API error:', errorMessage);
        return Promise.reject(error);
    }
);

export default API;