import axios, { AxiosError } from "axios";
import { toast } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  undefined,
  (error: AxiosError<{ message: string }>) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    const message: string = error.response?.data?.message || error.message;

    if (!expectedError) toast.error("An unexpected error occurred.");
    else toast.error(message);

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(function (config) {
  const user = getAuthUser();
  config.headers.Authorization = user.access_token;

  return config;
});

export function setAuthUser(authUser: AuthUser) {
  localStorage.setItem("auth-user", JSON.stringify(authUser));
}

export function getAuthUser(): AuthUser {
  return JSON.parse(localStorage.getItem("auth-user") || "{}");
}

export function deleteAuthUser() {
  localStorage.removeItem("auth-user");
}

export const shortenName = (addr: string) => {
  return `${addr.slice(0, 7)}...${addr.slice(
    addr.length - 6,
    addr.length - 1
  )}`;
};

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setAuthUser,
  getAuthUser,
  deleteAuthUser,
  shortenName
};

export default httpService;
