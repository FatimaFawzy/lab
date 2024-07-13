import { defineStore } from "pinia";
import { $http } from "@/plugins/axios";
import { Status, CardType, PaymentStatus } from "@/enums";

export const useStatisticsStore = defineStore("statistics", {
     state: () => ({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          records: {
               statistics: {
                    activePersonCount: 0,
                    inActivePersonCount: 0,
                    oldCardCount: 0,
                    newCardCount: 0,
                    portionsTotalCount: 0,
                    billsTotalCount: 0,
                    agentsTotalCount: 0,
                    noCardCount: 0,
                    merchantsTotalCount: 0,
                    totalCitizensCount: 0,
               },
               ReceivedPortionToUnReceivedRatio: [],
               personsDidNotReceivedPortionCount: [],
               personsReceivedPortionCount: [],
               activeAndInActivePersonsCount: {},
               paidBillsInEachPortionMonthly: {},
               unPaidBillsInEachPortionMonthly: {},
               paidAmountMonthly: {},
               registeredPersonsMonthly: {},
               oldAndNewCardsCount: {},
          },
          filter: {
               fromDate: null,
               toDate: null,
               CouponNumber: null,
          },
     }),
     getters: {},
     actions: {
          resetFilter() {
               this.filter = {
                    fromDate: null,
                    toDate: null,
                    CouponNumber: null,
               };
          },
          async GetStatistics() {
               const { data } = await $http.get("/Statistics/GetStatistics", {
                    params: this.filter,
               });
               this.records.statistics = data.data;
          },
          async GetPaidBillsInEachPortionMonthly() {
               const { data } = await $http.get("/Statistics/GetBillsInEachPortionMonthly", {
                    params: { ...this.filter, status: PaymentStatus.Paid.value },
               });
               this.records.paidBillsInEachPortionMonthly = {
                    values: data.data.map((item) => item.value),
               };
          },
          async GetUnPaidBillsInEachPortionMonthly() {
               const { data } = await $http.get("/Statistics/GetBillsInEachPortionMonthly", {
                    params: { ...this.filter, status: PaymentStatus.UnPaid.value },
               });
               this.records.unPaidBillsInEachPortionMonthly = {
                    values: data.data.map((item) => item.value),
               };
          },
          async GetActiveAndInActivePersons() {
               const { data } = await $http.get("/Statistics/GetActiveAndInActivePersons", {
                    params: this.filter,
               });
               this.records.activeAndInActivePersonsCount = {
                    labels: data.data.filter((item) => item.key !== 4).map((item) => Status.getLabelByValue(item.key)),
                    values: data.data.filter((item) => item.key !== 4).map((item) => item.value),
               };
          },
          async GetPaidAmountMonthly() {
               const { data } = await $http.get("/Statistics/GetPaidAmountMonthly", {
                    params: this.filter,
               });
               this.records.paidAmountMonthly = {
                    values: data.data.map((item) => item.value),
               };
          },
          async GetRegisteredPersonsMonthly() {
               const { data } = await $http.get("/Statistics/GetRegisteredPersonsMonthly", {
                    params: this.filter,
               });
               this.records.registeredPersonsMonthly = {
                    values: data.data.map((item) => item.value),
               };
          },
          async GetOldAndNewCardsCount() {
               const { data } = await $http.get("/Statistics/GetOldAndNewCardsCount", {
                    params: this.filter,
               });
               this.records.oldAndNewCardsCount = {
                    labels: data.data
                         .filter((item) => item.key !== 0)
                         .map((item) => CardType.getLabelByValue(item.key)),
                    values: data.data.filter((item) => item.key !== 0).map((item) => item.value),
               };
          },
          async GetReceivedAndNotReceivedPortionsMonthly() {
               const { data } = await $http.get("/Statistics/GetReceivedAndNotReceivedPortionsMonthly", {
                    params: this.filter,
               });
               // this.records.ReceivedPortionToUnReceivedRatio = data.data.map((item) => ({
               //      ratio:
               //           item.totalFamiliesCount === 0
               //                ? 0
               //                : (this.receivedFamiliesCount /
               //                       (this.receivedFamiliesCount + this.notReceivedFamiliesCount)) *
               //                  100,
               // }));

               const personsReceivedPortionCount = {
                    values: data.data.map((item) => item.receivedFamiliesCount),
               };
               const personsDidNotReceivedPortion = {
                    values: data.data.map((item) => item.notReceivedFamiliesCount),
               };
               this.records.personsReceivedPortionCount = Array.from(personsReceivedPortionCount.values);
               this.records.personsDidNotReceivedPortionCount = Array.from(personsDidNotReceivedPortion.values);
          },
     },
});
