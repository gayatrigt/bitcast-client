import axios, { AxiosError } from "axios";
import { toast } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  undefined,
  (error: AxiosError<{ message: string }>) => {
    const message: string = error.response?.data?.message || error.message;
    
    if (error.response && error.response.status == 401) {
      deleteAuthUser();
      toast.error("Please reconnect your wallet an try again");
    }
    if (error.response && error.response.status == 500)
      toast.error("An unexpected error occurred.");
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

export const shortenAddress = (addr: string) => {
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
  shortenAddress,
};

export default httpService;
