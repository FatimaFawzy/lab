import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const useStationsEmployeeStore = defineStore("StationsEmployee", {
     state: () => ({
          statistic: "",
          filter: {
               StationId: null,
               CouponNumber: null,
          },
     }),
     actions: {
          async GetRecords() {
               const { data } = await $http.get("/Statistics/GetStationBillsStatistics", {
                    params: {
                         ...this.filter,
                    },
               });

               this.statistic = data.data;
          },
     },
});
