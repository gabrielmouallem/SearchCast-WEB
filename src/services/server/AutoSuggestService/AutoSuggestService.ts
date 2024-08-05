import axios from "axios";

export const AutoSuggestService = axios.create({
  baseURL: `${process.env.BING_API_URL}`,
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
    "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY,
  } as any,
}));
