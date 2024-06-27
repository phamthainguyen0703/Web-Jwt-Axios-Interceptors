import axios from "axios";
import { toast } from "react-toastify";

let authorizeAxiosInstance = axios.create();

//set time chờ tối đa 1 request: 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;

//withCredentialsL: cho phép axios tự động đính kèm và gửi cookie trong mỗi request lên BE (cơ chế httpOnly Cookie)
// authorizeAxiosInstance.defaults.withCredentials = true;

// Add a request interceptor: can thiệp vào giữa các request API
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor: can thiệp vào giữa các response API
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // xử lí lỗi tập trung phần hiển thị thông báo lỗi trả về từ mọi API (viết code 1 lần: clean code)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;
