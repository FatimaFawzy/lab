import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const useMerchantsStore = defineStore("merchants", {
     state: () => ({
          totalCount: 0,
          records: [],
          record: {},

          dialog: false,
          filter: {
               take: 10,
               skip: 0,
               phoneNumber: null,
               accountNumber: null,
               name: null,
               tenantId: null,
          },
     }),
     getters: {
          merchants: (state) => state.records.map((record) => ({ label: record.name, value: record.id })),
     },
     actions: {
          resetFilter() {
               this.filter = {
                    take: 10,
                    skip: 0,
                    phoneNumber: null,
                    accountNumber: null,
                    name: null,
                    tenantId: null,
               };
          },
          async GetRecords(scroll) {
               if (scroll) {
                    this.filter.take = this.totalCount;
               }
               const { data } = await $http.get("/Merchant/GetMerchants", {
                    params: this.filter,
               });
               let pageNumber = Math.floor(this.filter.skip / this.filter.take) + 1;
               this.records = data.data.map((item, index) => ({
                    ...item,
                    index: index + 1 + (pageNumber - 1) * this.filter.take, // Adding 1 to start indexing from 1 instead of 0
               }));
               this.totalCount = data.count;
          },
     },
});
