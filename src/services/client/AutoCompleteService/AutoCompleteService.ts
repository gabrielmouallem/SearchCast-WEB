"use client";
import axios, { AxiosRequestHeaders } from "axios";
import { CookiesService } from "../CookiesService";

export const AutoCompleteService = axios.create();

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

AutoCompleteService.interceptors.request.use((config) => {
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
