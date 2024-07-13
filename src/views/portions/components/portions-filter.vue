<template>
     <div class="grid filter mb-3">
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">رقم الكوبون</label>
               <InputText class="w-full" required v-model="filter.couponNumber" @input="showIsFilter()" />
          </div>
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">حالة الحصة</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.status"
                    :options="PortionStatusOptions.asList()"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0" v-if="isfilter">
               <Button label="عرض جميع البيانات" severity="info" outlined @click="reset()" />
          </div>
     </div>
</template>
<script>
     import { mapWritableState, mapActions } from "pinia";
     import { usePortionsStore } from "@/store/modules/portions";
     import { PortionStatusOptions } from "@/enums";
     import { useSharedStore } from "@/store/modules/shared";

     export default {
          mounted() {
               this.isfilter = false;
          },
          computed: {
               PortionStatusOptions() {
                    return PortionStatusOptions;
               },
               ...mapWritableState(usePortionsStore, {
                    filter: "filter",
               }),
               ...mapWritableState(useSharedStore, ["isfilter"]),
          },
          methods: {
               ...mapActions(usePortionsStore, ["resetFilter"]),
               ...mapActions(useSharedStore, ["showIsFilter"]),
               reset() {
                    this.isfilter = false;
                    this.resetFilter();
               },
          },
     };
</script>
