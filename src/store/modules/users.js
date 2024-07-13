import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";
import { checkObjectParams } from "@/utils/helper";

export const useUsersStore = defineStore("user", {
     state: () => ({
          totalCount: 0,
          records: [],
          dialog: false,
          record: {
               id: "",
               name: "",
               username: "",
               password: "",
               phoneNumber: "",
               role: "",
               stationId: null,
          },
          filter: {
               pageSize: 10,
               pageNumber: 1,
               username: null,
               name: null,
               Role: null,
          },
     }),
     actions: {
          resetFilter() {
               this.filter = {
                    pageSize: 10,
                    pageNumber: 1,
                    username: null,
                    name: null,
               };
          },
          async GetRecords() {
               const { data } = await $http.get("/User/GetAll", {
                    params: {
                         ...this.filter,
                         pageNumber: Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1,
                    },
               });
               let pageNumber = Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1;
               this.records = data.data.data.map((item, index) => ({
                    ...item,
                    index: index + 1 + (pageNumber - 1) * this.filter.pageSize, // Adding 1 to start indexing from 1 instead of 0
               }));
               this.totalCount = data.data.totalCount;
          },
          async AddRecord() {
               const { data } = await $http.post(`/User/Create`, checkObjectParams(this.record));
               this.records.unshift(data.data);
          },
          async UpdateRecord() {
               const { password, ...rest } = this.record;
               let submitData = rest;
               if (password) {
                    submitData = { ...submitData, password };
               }
               const { data } = await $http.put(`/User/Update/${this.record.id}`, checkObjectParams(submitData));
               this.records = this.records.map((record) => (record.id === this.record.id ? data.data : record));
          },
          async RemoveRecord() {
               await $http.delete(`/User/Delete/${this.record.id}`);
               this.records = this.records.filter((x) => x.id !== this.record.id);
          },
     },
});
