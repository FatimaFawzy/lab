import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";
export const useSectorStore = defineStore("sector", {
     state: () => ({
          totalCount: 0,
          records: [],

          filter: {
               pageSize: 10,
               pageNumber: 1,
               name: null,
          },
     }),
     getters: {
          Sectors: (state) => state.records.map((record) => ({ label: record.name, value: record.id })),
     },
     actions: {
          async GetSectors() {
               const { data } = await $http.get("/Sector/GetAll", {
                    params: {
                         ...this.filter,
                         pageNumber: Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1,
                    },
               });

               this.records = data.data.data;
               this.totalCount = data.data.totalCount;
          },
     },
});
