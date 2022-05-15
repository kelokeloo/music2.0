import axios from "axios";
const config = {
  timeout: 5000,
};
const http = axios.create(config);

// 请求拦截
http.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.token;
    if (token) {
      //判断token是否存在
      config.headers.Authorization = window.sessionStorage.getItem("token"); //将token设置到请求头当中
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截
// 1. 对数据进行解包

http.interceptors.response.use(
  ({ data }) => {
    return Promise.resolve(data);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
