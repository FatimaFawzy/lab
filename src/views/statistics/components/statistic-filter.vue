<template>
     <div>
          <div class="grid filter mb-3">
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">من تاريخ</label>
                    <InputText class="w-full" type="date" v-model="filter.FromDate" @change="ShowAll()" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">الى تاريخ</label>
                    <InputText class="w-full" type="date" v-model="filter.ToDate" @change="ShowAll()" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">الحصة</label>
                    <Dropdown
                         required
                         class="w-full"
                         v-model="filter.CouponNumber"
                         :options="portions"
                         optionLabel="label"
                         optionValue="CouponNumber"
                         @change="ShowAll()" />
               </div>
               <div class="col-3 pb-0" v-if="isFilter">
                    <Button label="الكل" @click="reset()" />
               </div>
          </div>
     </div>
</template>
<script>
     import { mapActions, mapWritableState } from "pinia";
     import { usePortionsStore } from "@/store/modules/portions";
     import { useStatisticsStore } from "@/store/modules/statistics";
     export default {
          data() {
               return {
                    isfilter: false,
               };
          },

          computed: {
               isFilter() {
                    return this.isfilter;
               },
               ...mapWritableState(usePortionsStore, ["portions"]),
               ...mapWritableState(useStatisticsStore, ["filter"]),
          },
          methods: {
               ShowAll() {
                    this.isfilter = true;
               },
               all() {
                    this.filter.CouponNumber = null;
                    this.isfilter = false;
               },

               ...mapActions(useStatisticsStore, ["resetFilter"]),
               reset() {
                    this.resetFilter();
                    this.isfilter = false;
               },
          },
     };
</script>
