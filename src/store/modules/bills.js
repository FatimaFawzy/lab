import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";
// const queryParams = new URLSearchParams(window.location.search);

export const useBillsStore = defineStore("bill", {
     state: () => ({
          totalCount: 0,
          records: [],
          BillsReport: [],
          BillsSummary: [],
          filter: {
               pageSize: 10,
               pageNumber: 1,
               personId: null,
               billNumber: null,
               portionId: null,
               fromCreatedDate: null,
               toCreatedDate: null,
               personName: null,
               MerchantId: "",
               familyNumber: null,
               CardNumber: null,
               Rnn: null,
               paymentStatus: 1, // PaymentStatus.Paid.value
          },
     }),
     getters: {},
     actions: {
          resetFilter() {
               // let { portionId } = this.filter;
               this.filter = {
                    portionId: null,
                    pageSize: 10,
                    pageNumber: 1,
                    familyNumber: null,
                    personId: null,
                    billNumber: null,
                    fromCreatedDate: null,
                    toCreatedDate: null,
                    personName: null,
                    MerchantId: "",
                    CardNumber: null,
                    Rnn: null,
                    paymentStatus: 1,
                    StationId: null,
               };
          },
          resetStationFilter() {
               this.filter = {
                    portionId: null,
                    pageSize: 10,
                    pageNumber: 1,
                    familyNumber: null,
                    personId: null,
                    billNumber: null,
                    fromCreatedDate: null,
                    toCreatedDate: null,
                    personName: null,
                    MerchantId: "",
                    CardNumber: null,
                    Rnn: null,
                    paymentStatus: 1,
                    StationId: this.filter.StationId,
               };
          },
          async GetBillsSummary() {
               const { data } = await $http.get("/Bill/GetBillsSummary", {
                    params: {
                         ...this.filter,
                    },
               });
               this.BillsSummary = data.data;
          },
          async GetRecords() {
               const { data } = await $http.get("/Bill/GetAll", {
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
          async GetStationsBillsReport() {
               const { data } = await $http.get("/Bill/GetStationsBillsReport", {
                    params: {
                         ...this.filter,
                         pageNumber: Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1,
                    },
               });
               console.log(this.filter);
               this.BillsReport = data.data;
          },
          async ExportBillsInExcel() {
               const { data } = await $http.get("/Bill/ExportBillsInExcel", {
                    params: {
                         ...this.filter,
                         pageNumber: Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1,
                    },
               });
               // Decode Base64 data
               const decodedData = atob(data.data);

               // Convert to ArrayBuffer
               const arrayBuffer = new ArrayBuffer(decodedData.length);
               const uint8Array = new Uint8Array(arrayBuffer);
               for (let i = 0; i < decodedData.length; i++) {
                    uint8Array[i] = decodedData.charCodeAt(i);
               }
               // Create Blob
               const blob = new Blob([uint8Array], {
                    type: ".xlsx",
               });

               // Create download link
               const downloadLink = document.createElement("a");
               downloadLink.href = URL.createObjectURL(blob);
               downloadLink.download = "الفواتير.xlsx";

               // Trigger download
               downloadLink.click();
          },

          async ExportDetailedBillsInExcel() {
               const { data } = await $http.get("/Bill/ExportStationBillsReportInExcel", {
                    params: {
                         ...this.filter,
                         pageNumber: Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1,
                    },
               });
               // Decode Base64 data
               const decodedData = atob(data.data);

               // Convert to ArrayBuffer
               const arrayBuffer = new ArrayBuffer(decodedData.length);
               const uint8Array = new Uint8Array(arrayBuffer);
               for (let i = 0; i < decodedData.length; i++) {
                    uint8Array[i] = decodedData.charCodeAt(i);
               }
               // Create Blob
               const blob = new Blob([uint8Array], {
                    type: ".xlsx",
               });

               // Create download link
               const downloadLink = document.createElement("a");
               downloadLink.href = URL.createObjectURL(blob);
               downloadLink.download = "الفواتير.xlsx";

               // Trigger download
               downloadLink.click();
          },
     },
});
