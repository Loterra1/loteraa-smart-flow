import axios, { AxiosResponse, AxiosError } from 'axios';

// Define your API response types
interface ApiResponse<T = any> {
   success: boolean;
   data: T;
   message?: string;
}

interface ApiError {
   message: string;
   status: number;
   errors?: Record<string, string[]>;
}

// Create axios instance with your backend base URL
const api = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_API,
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 10000,
});

// Request interceptor with proper typing
api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error: AxiosError) => {
      return Promise.reject(error);
   }
);

// Response interceptor with proper typing
api.interceptors.response.use(
   (response: AxiosResponse) => response,
   (error: AxiosError<ApiError>) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
   }
);

export default api;
export type { ApiResponse, ApiError };
