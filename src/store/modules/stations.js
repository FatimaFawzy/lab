import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";
import { checkObjectParams } from "@/utils/helper";
export const useStationsStore = defineStore("stations", {
     state: () => ({
          totalCount: 0,
          records: [],
          note: "",

          dialog: false,
          qrDialog: false,
          StatusDialog: false,
          record: {
               id: "",
               name: "",
               locationNumber: "",
               type: null,
               govId: null,
               aquirerId: null,
               branchId: null,
               terminalId: null,
               sectorId: 0,
          },
          filter: {
               pageSize: 10,
               pageNumber: 1,
               name: null,
               locationNumber: null,
               type: null,
               govId: null,
               branchId: null,
               sectorId: null,
          },
     }),
     getters: {
          stations: (state) => state.records.map((record) => ({ label: record.name, value: record.id })),
     },
     actions: {
          resetFilter() {
               this.filter = {
                    pageSize: 10,
                    pageNumber: 1,
                    name: null,
                    accountNumber: null,
                    locationNumber: null,
                    type: "",
                    branchId: null,
               };
          },

          async GetRecords(p) {
               if (p) {
                    this.filter.pageSize = this.totalCount;
               }

               const { data } = await $http.get("/Station/GetAll", {
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
               const { data } = await $http.post(`/Station/Create`, this.record);
               this.records.unshift(data.data);
          },
          async UpdateStatus(id, newStatus) {
               const { data } = await $http.patch(`/Station/UpdateStatus`, {
                    id: id,
                    status: newStatus,
                    note: this.note,
               });
               this.records = this.records.map((record) => (record.id === this.record.id ? data.data : record));
          },
          async UpdateRecord() {
               const { data } = await $http.put(`/Station/Update/${this.record.id}`, checkObjectParams(this.record));
               this.records = this.records.map((record) => (record.id === this.record.id ? data.data : record));
          },
          async RemoveRecord() {
               await $http.delete(`/Station/Delete/${this.record.id}`);
               this.records = this.records.filter((x) => x.id !== this.record.id);
          },
     },
});
