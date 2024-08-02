"use client";
import { getApiURL } from "@/utils/shared";
import axios, { AxiosRequestHeaders } from "axios";
import { CookiesService } from "../CookiesService";

export const api = axios.create({
  baseURL: getApiURL(),
  timeout: 30000,
});

axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject({
      ...error,
    }),
);

api.interceptors.request.use((config) => {
  const access_token = CookiesService.getItem("access_token");
  if (access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    } as AxiosRequestHeaders;
    return config;
  } else {
    return config;
  }
});
