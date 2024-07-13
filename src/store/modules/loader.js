import { defineStore } from "pinia";

export const LoaderStore = defineStore("loader", {
     state: () => ({
          requests: [],
     }),
     getters: {
          IsLoading() {
               return this.requests.length > 0;
          },
     },
     actions: {
          async PushRequest(url) {
               this.requests.push(url);
          },
          async PopRequest(url) {
               this.requests.splice(this.requests.indexOf(url), 1);
          },
     },
});
