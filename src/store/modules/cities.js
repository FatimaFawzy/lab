import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const useCitiesStore = defineStore("cities", {
     state: () => ({
          records: localStorage.getItem("cities") ? JSON.parse(localStorage.getItem("cities")) : [],
     }),

     getters: {
          cities: (state) => () => state.records.map((record) => ({ value: record.id, label: record.name })),
          districts: (state) => (cityId) => {
               return (
                    state.records
                         .find((record) => record.id === cityId)
                         ?.districts?.map((record) => ({
                              value: record.id,
                              label: record.name,
                         })) ?? []
               );
          },
     },

     actions: {
          async GetRecords() {
               if (!localStorage.getItem("cities")) {
                    const { data } = await $http.get(`City/GetAllGov`);
                    localStorage.setItem("cities", JSON.stringify(data.data));
                    this.records = data.data;
               }
          },
     },
});
