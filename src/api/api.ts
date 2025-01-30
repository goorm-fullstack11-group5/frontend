import axios from "axios";

const baseConfig = {
  withCredentials: true,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const authInstance = axios.create(baseConfig);

const publicInstance = axios.create(baseConfig);

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰이 만료되어 401 에러가 발생한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 요청
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await authInstance.post("/auth/refresh", { refreshToken });

        // 새 토큰 저장
        const newToken = res.data.token;
        localStorage.setItem("token", newToken);

        // 원래 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return authInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 등의 처리
        console.error("Token refresh failed", refreshError);
        // 여기에 로그아웃 로직 추가
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { authInstance, publicInstance };
