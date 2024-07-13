import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const useBranchesStore = defineStore("branches", {
     state: () => ({
          records: [],
     }),
     getters: {
          branches: (state) => () => state.records.map((record) => ({ label: record.name, value: record.id })),
          districts: (state) => (branchId) => {
               return (
                    state.records
                         .find((record) => record.id === branchId)
                         ?.districts?.map((record) => ({
                              value: record.id,
                              label: record.name,
                         })) ?? []
               );
          },
     },
     actions: {
          async GetRecords(id) {
               const { data } = await $http.get(`City/GetAllBranches?govid=` + id);
               this.records = data.data;
          },
     },
});
