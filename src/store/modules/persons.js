import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";

export const usePersonsStore = defineStore("persons", {
     state: () => ({
          totalCount: 0,
          records: [],
          alertMsg: "",
          dialog: false,
          idmsDialog: false,
          shangeStatusDialog: false,
          idmsRecord: [],
          newStaus: null,
          record: {
               id: "",
               version: 0,
               familyName: "",
               familyNumber: "",
               districtId: "",
               branchId: "",
               agentId: "",
               cardType: "",
               note: "",
          },
          filter: {
               pageSize: 10,
               pageNumber: 1,
               familyName: null,
               districtId: null,
               BranchId: null,
               accountNumber: null,
               agentId: null,
               cardType: null,
               familyNumber: null,
               stationId: null,
               FromCreatedDate: null,
               ToCreatedDate: null,
               Status: null,
               IsActive: null,
          },
     }),

     actions: {
          resetFilter() {
               this.filter = {
                    pageSize: 10,
                    pageNumber: 1,
                    familyName: null,
                    districtId: null,
                    branchId: null,
                    accountNumber: null,
                    agentId: null,
                    cardType: null,
                    familyNumber: null,
                    stationId: null,
                    FromCreatedDate: null,
                    ToCreatedDate: null,
                    Status: null,
                    IsActive: null,
               };
          },
          async GetRecords() {
               const { data } = await $http.get("/Person/GetAll", {
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
          async FindCustomer() {
               const { data } = await $http.get(`/Person/FindCustomer?accountNo=${this.record.accountNumber}`);
               this.idmsRecord = data.data.result;
          },
          async AddRecord() {
               const { data } = await $http.post(`/Person/Create`, this.record);
               this.records.unshift(data.data);
          },
          async UpdateRecord() {
               const { data } = await $http.put(`/Person/UpdatePersonProfile/${this.record.id}`, this.record);
               this.records = this.records.map((record) => (record.id === this.record.id ? data.data : record));
          },
          async UpdateStaus() {
               const { data } = await $http.patch(`/Person/UpdateStatus`, {
                    id: this.record.id,
                    status: this.newStaus,
               });
               this.alertMsg = data.data;
               window.location.reload();
          },
          async RemoveRecord() {
               await $http.delete(`/Person/Delete/${this.record.id}`);
               this.records = this.records.filter((x) => x.id !== this.record.id);
          },

          async ExportExcel() {
               try {
                    const { data } = await $http.get("Person/ExportPersonsExcel", {
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
                    link.download = `تقرير المواطنين .xlsx`;
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
     },
});
