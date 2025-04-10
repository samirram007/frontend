import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // Sends cookies automatically
});

// --- 🔐 REQUEST INTERCEPTOR ---
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Example: Custom headers or logging
        // config.headers['X-Requested-With'] = 'XMLHttpRequest';
        // console.info(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// --- 🔁 TOKEN REFRESH HANDLER ---
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: AxiosResponse) => void;
    reject: (reason?: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        error ? reject(error) : resolve();
    });
    failedQueue = [];
};

const handleRefreshToken = async (
    originalRequest: InternalAxiosRequestConfig & { _retry?: boolean }
) => {
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        }).then(() => axiosClient(originalRequest));
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
        await axiosClient.post('/auth/refresh'); // Refresh sets cookie again
        processQueue(null);
        return axiosClient(originalRequest); // Retry original request
    } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        return Promise.reject(refreshError);
    } finally {
        isRefreshing = false;
    }
};

// --- ⚠️ RESPONSE INTERCEPTOR ---
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            return handleRefreshToken(originalRequest);
        }

        // Optional logging (or use toast/snackbar here)
        const messages: Record<number, string> = {
            403: '⛔ Unauthorized',
            404: '❓ Not Found',
            422: '⚠️ Validation Failed',
            500: '💥 Server Error',
        };

        if (status && messages[status]) {
            console.warn(`[Error ${status}] ${messages[status]}`);
        }

        return Promise.reject(error);
    }
);


// Optional: wrap for type-safe usage
export const request = <T>(config: AxiosRequestConfig): Promise<T> =>
    axiosClient(config).then((res) => res.data);

export default axiosClient;
