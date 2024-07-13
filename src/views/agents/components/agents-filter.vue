<template>
     <div class="grid mb-3">
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">اسم الوكيل</label>
               <InputText class="w-full" required v-model="filter.name" />
          </div>
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">رقم الوكالة</label>
               <InputText type="number" class="w-full" required v-model="filter.number" />
          </div>
     </div>
</template>
<script>
     import { mapWritableState } from "pinia";
     import { useAgentsStore } from "@/store/modules/agents";

     export default {
          computed: {
               ...mapWritableState(useAgentsStore, {
                    filter: "filter",
               }),
          },
     };
</script>
