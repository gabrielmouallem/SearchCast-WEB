"use client";
import { getApiURL } from "@/utils";
import axios, { AxiosRequestHeaders } from "axios";
import { CookiesService } from "../CookiesService";

const api = axios.create({
  baseURL: getApiURL(),
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = CookiesService.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
    return config;
  } else {
    return config;
  }
});

export default api;
