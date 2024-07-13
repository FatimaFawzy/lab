import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const usePortionsStore = defineStore("portion", {
     state: () => ({
          totalCount: 0,
          records: [],
          dialog: false,
          statusDialog: false,
          record: {
               id: "",
               couponNumber: "",
               portionStartDate: "",
               liters: 50,
          },
          filter: {
               pageSize: 10,
               pageNumber: 1,
               couponNumber: null,
               status: null,
          },
     }),
     getters: {
          portions: (state) =>
               state.records.map((record) => ({
                    label: `( ${record.couponNumber} ) ${record.createdAt.slice(0, 10)}`,
                    value: record.id,
                    CouponNumber: record.couponNumber,
               })),
     },
     actions: {
          async GetRecords() {
               const { data } = await $http.get("/Portion/GetAll", {
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
               const { data } = await $http.post(`/Portion/Create`, this.record);
               this.records.unshift(data.data);
          },
          async UpdateRecord() {
               const { data } = await $http.put(`/Portion/Update/${this.record.id}`, this.record);
               this.records = this.records.map((record) => (record.id === this.record.id ? data.data : record));
          },
          async RemoveRecord() {
               await $http.delete(`/Portion/Delete/${this.record.id}`);
               this.records = this.records.filter((x) => x.id !== this.record.id);
          },
          async UpdateStatus(status) {
               await $http.patch(`/Portion/UpdateStatus`, {
                    id: this.record.id,
                    status,
               });

               window.location.reload();
          },
          async ExportExcel() {
               try {
                    const { data } = await $http.get("Portion/ExportPortionsExcel", {
                         params: {
                              ...this.filter,
                              pageNumber: Math.floor(this.filter.pageNumber / this.filter.pageSize) + 1,
                         },
                         headers: {
                              "Content-Type": "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet",
                         },
                         responseType: "arraybuffer", // Ensure the response is treated as an ArrayBuffer
                    });

                    // Decode Base64 data

                    let newBlob = new Blob([data], {
                         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });

                    let Data = window.URL.createObjectURL(newBlob);
                    let link = document.createElement("a");
                    link.href = Data;
                    link.download = `تقرير الحصص .xlsx`;
                    link.dispatchEvent(
                         new MouseEvent("click", {
                              bubbles: true,
                              cancelable: true,
                              view: window,
                         })
                    );
                    setTimeout(function () {
                         window.URL.revokeObjectURL(data);
                         link.remove();
                    }, 100);
               } catch (error) {
                    console.error("Error exporting Excel file:", error);
                    // Display an error message to the user
                    alert("Failed to export Excel file. Please try again later.");
               }
          },

          resetFilter() {
               this.filter = {
                    pageSize: 10,
                    pageNumber: 1,
                    couponNumber: null,
                    status: null,
               };
          },
     },
});
