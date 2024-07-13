import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const useAuthStore = defineStore("auth", {
     actions: {
          async login({ username, password }) {
               const { data } = await $http.post(`/Auth/Login`, {
                    username,
                    password,
               });

               localStorage.setItem("token", data.data.token);
               localStorage.setItem("user", JSON.stringify(data.data.user));
               localStorage.setItem("station", JSON.stringify(data.data.station));
               if (data.data.user.role == 3) {
                    window.location.href = "/StationEmployeeDashboard";
               } else {
                    window.location.href = "/dashboard";
               }
          },
     },
});
