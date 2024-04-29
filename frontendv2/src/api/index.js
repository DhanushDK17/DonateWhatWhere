import axios from 'axios';

const WEBSERVICE_BASE_URL = "http://localhost:8000/api"

const accessToken = JSON.parse(sessionStorage.getItem("access"));

export const axiosInstance = axios.create({
    baseURL: WEBSERVICE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
});

const requestInterceptor = config => {
    config.headers = { ...config.headers };
    return config;
};

const responseInterceptor = response => response;

const errorInterceptor = error => {
    if (error.response && error.response.status === 401) {
        sessionStorage.clear();
        window.location.href = '/';
    }
    return Promise.reject(error);
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);