"use client";
import { getBingApiKey, getBingApiURL } from "@/utils/shared";
import axios from "axios";

const AutoSuggestService = axios.create({
  baseURL: `${getBingApiURL()}`,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

AutoSuggestService.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    "Ocp-Apim-Subscription-Key": getBingApiKey(),
  } as any,
}));

export default AutoSuggestService;
