import axios from 'axios';

const WEBSERVICE_BASE_URL = "http://localhost:8000/api"

export const axiosInstance = axios.create({
    baseURL: WEBSERVICE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const requestInterceptor = config => {
    const accessToken = JSON.parse(sessionStorage.getItem("access"));
    config.headers = { ...config.headers, ...{
        'Authorization': `Bearer ${accessToken}`,
    } };
    return config;
};

const responseInterceptor = response => response;

const errorInterceptor = error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        sessionStorage.clear();
        window.location.href = '/login';
    }
    return Promise.reject(error);
};

export const debounceFunction = (func, delay) => {
    let timer;
    return function(...args) {
      const context = this;
      clearTimeout(timer)
      timer = setTimeout(() => {
          func.apply(context, args);
      }, delay)
    }
}

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export const encodeQueryData = (data) => {
    const ret = [];
    for (let d in data)
    if (data[d] !== undefined && data[d] !== '' && data[d] !== null) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
 }