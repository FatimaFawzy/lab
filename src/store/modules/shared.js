import { defineStore } from "pinia";
export const useSharedStore = defineStore("shared", {
     state: () => ({
          isfilter: false,
     }),
     actions: {
          showIsFilter() {
               this.isfilter = true;
          },
     },
});
