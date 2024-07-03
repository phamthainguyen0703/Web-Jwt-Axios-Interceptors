import authorizeAxiosInstance from "~/utils/authorizedAxios";
import { API_ROOT } from "~/utils/constants";

export const handleLogoutAPI = async () => {
  // trường hợp 1: dùng  localStorage để lưu userInfo > xóa thông tin user trong localStorage phía FE
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");

  // trường hợp 2: dùng  http only cookies > call API remove cookies
  return await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`);
};

export const refreshTokenAPI = async (refreshToken) => {
  return await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/users/refresh_token`,
    { refreshToken }
  );
};
