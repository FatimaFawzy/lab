<template>
     <div id="app">
          <loading v-if="IsLoading" />
          <router-view></router-view>
     </div>
</template>

<style scoped></style>
<script>
     import loading from "@/components/loading.vue";
     import { LoaderStore } from "@/store/modules/loader";
     import { mapWritableState } from "pinia";

     export default {
          components: {
               loading,
          },
          computed: {
               ...mapWritableState(LoaderStore, ["IsLoading"]),
          },
     };
</script>
<style>
     .p-datatable .p-column-header-content {
          justify-content: center;
     }
     .filter {
          align-items: flex-end;
     }
     .text-success {
          color: #2eb560;
     }
</style>
