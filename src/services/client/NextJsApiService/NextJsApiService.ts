"use client";
import axios from "axios";

export const NextJsApiService = axios.create({
  timeout: 30000, // 30 seconds
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

NextJsApiService.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
  } as any,
}));
