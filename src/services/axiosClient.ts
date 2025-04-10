import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create Axios instance
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., http://localhost:8000/api
    withCredentials: true, // 🔐 send cookies (JWT in httpOnly cookie)
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Response Interceptor (for global error handling)
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;

            // Simple logging — replace with toast or redirect as needed
            switch (status) {
                case 401:
                    console.warn('🔐 Unauthenticated');
                    break;
                case 403:
                    console.warn('⛔ Unauthorized');
                    break;
                case 404:
                    console.warn('❓ Not Found');
                    break;
                case 422:
                    console.warn('⚠️ Validation Failed');
                    break;
                case 500:
                    console.error('💥 Server Error');
                    break;
            }
        }

        return Promise.reject(error);
    }
);

// Optional: wrap for type-safe usage
export const request = <T>(config: AxiosRequestConfig): Promise<T> =>
    axiosClient(config).then((res) => res.data);

export default axiosClient;
