import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const useAgentsStore = defineStore("agents", {
     state: () => ({
          totalCount: 0,
          records: [],
          dialog: false,
          record: {
               id: "",
               name: "",
               number: "",
          },
          filter: {
               pageSize: 10,
               pageNumber: 1,
               name: null,
               number: null,
          },
     }),
     getters: {
          agents: (state) => () => state.records.map((record) => ({ label: record.name, value: record.id })),
     },
     actions: {
          resetFilter() {
               this.filter = {
                    pageSize: 10,
                    pageNumber: 1,
                    name: null,
                    number: null,
               };
          },
          async GetRecords() {
               const { data } = await $http.get("/Agent/GetAll", {
                    params: {
                         ...this.filter,
                         pageNumber: Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1,
                    },
               });
               this.records = data.data.data;
               this.totalCount = data.data.totalCount;
          },
          async AddRecord() {
               const { data } = await $http.post(`/Agent/Create`, this.record);
               this.records.unshift(data.data);
          },
          async UpdateRecord() {
               const { data } = await $http.put(`/Agent/Update/${this.record.id}`, this.record);
               this.records = this.records.map((record) => (record.id === this.record.id ? data.data : record));
          },
          async RemoveRecord() {
               await $http.delete(`/Agent/Delete/${this.record.id}`);
               this.records = this.records.filter((x) => x.id !== this.record.id);
          },
     },
});
