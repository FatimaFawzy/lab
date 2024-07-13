import axios from "axios";
import { LoaderStore } from "@/store/modules/loader";

let config = {
     baseURL: import.meta.env.VITE_BASE_URL,
};

const _axios = axios.create(config);
_axios.defaults.headers.Authorization = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";

// Request interceptor
_axios.interceptors.request.use(
     (request) => {
          // You can modify request here if needed
          const loaderStore = LoaderStore();
          loaderStore.PushRequest(request.url);
          return request;
     },
     (error) => {
          // Handle request error here
          console.error(error);
          return Promise.reject(error);
     }
);

// Response interceptor
_axios.interceptors.response.use(
     (response) => {
          const loaderStore = LoaderStore();
          loaderStore.PopRequest(response.config.url);
          return response;
     },
     (error) => {
          const loaderStore = LoaderStore();
          loaderStore.PopRequest(error.config.url);

          if (error.response.status !== 200 || error.response.status !== 201 || error.response.status !== 400) {
               alertError(error.response.data.message);
          }
          if (error.response?.status === 400) {
               alertError(error.response.data.message);
          }
          if (error.response?.status === 401) {
               localStorage.removeItem("token");
               localStorage.removeItem("user");
               window.location.href = "/";
          }

          return Promise.reject(error);
     }
);

function alertError(message) {
     var toast = document.createElement("div");
     toast.className = "error-toast";
     toast.innerHTML = "خطأ : " + message;
     document.body.appendChild(toast);
     setTimeout(function () {
          document.body.removeChild(toast);
     }, 3000);
}

export const $http = _axios;
