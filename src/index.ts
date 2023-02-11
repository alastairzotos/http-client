import axios, { AxiosInstance } from "axios";

export const createHttpClient = (
  baseURL: string,
  getAccessToken?: () => string,
): AxiosInstance => {
  const httpClient = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (getAccessToken) {
    httpClient.interceptors.request.use((config) => {
      const accessToken = getAccessToken();

      if (!!accessToken) {
        config.headers!.authentication = `Bearer ${accessToken}`;
      }

      return config;
    }, console.error);
  }

  return httpClient;
}
