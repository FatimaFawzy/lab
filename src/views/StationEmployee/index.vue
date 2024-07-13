<template>
     <div class="grid filter mb-3">
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
          <div class="col-3 pb-0" v-if="isfilter">
               <Button label="الكل" @click="all()" />
          </div>
     </div>
     <div class="grid">
          <div class="col-12 lg:col-6 xl:col-3">
               <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                         <div>
                              <span class="block text-800 font-medium mb-2">المبلغ الكلي</span>
                              <div class="text-900 font-medium text-xl">
                                   {{ statistic.totalAmount?.toLocaleString() }}

                                   <span class="text-success">د.ع</span>
                              </div>
                         </div>
                         <div
                              class="flex align-items-center justify-content-center bg-blue-100 border-round"
                              style="width: 4rem; height: 4rem">
                              <i class="pi pi-money-bill"></i>
                         </div>
                    </div>
               </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
               <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                         <div>
                              <span class="block text-800 font-medium mb-2">عدد الحركات الكلية</span>
                              <div class="text-900 font-medium text-xl">
                                   {{ statistic.totalBillsCount?.toLocaleString() }}
                              </div>
                         </div>
                         <div
                              class="flex align-items-center justify-content-center bg-blue-100 border-round"
                              style="width: 4rem; height: 4rem">
                              <i class="pi pi-file"></i>
                         </div>
                    </div>
               </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
               <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                         <div>
                              <span class="block text-800 font-medium mb-2">عدد اللترات الكلية</span>
                              <div class="text-900 font-medium text-xl">
                                   {{ statistic.totalSoldLiters?.toLocaleString() }}
                              </div>
                         </div>
                         <div
                              class="flex align-items-center justify-content-center bg-blue-100 border-round"
                              style="width: 4rem; height: 4rem">
                              <i class="pi pi-file"></i>
                         </div>
                    </div>
               </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
               <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                         <div>
                              <span class="block text-800 font-medium mb-2">مبلغ العمولة</span>
                              <div class="text-900 font-medium text-xl">
                                   {{ statistic.taxAmount?.toLocaleString() }}
                                   <span class="text-success">د.ع</span>
                              </div>
                         </div>
                         <div
                              class="flex align-items-center justify-content-center bg-blue-100 border-round"
                              style="width: 4rem; height: 4rem">
                              <i class="pi pi-money-bill"></i>
                         </div>
                    </div>
               </div>
          </div>
     </div>
     <!-- <pdfExport></pdfExport> -->
     <BillsFilter></BillsFilter>
</template>

<script>
     import BillsFilter from "./components/StationEmployee_Bills.vue";
     import { mapActions, mapWritableState } from "pinia";
     import { useStationsEmployeeStore } from "@/store/modules/stationEmployee";
     import { usePortionsStore } from "@/store/modules/portions";
     // import pdfExport from "../stationemployee/components/pdfExport.vue";
     export default {
          components: {
               BillsFilter,
          },
          data() {
               return {
                    isfilter: false,
               };
          },
          computed: {
               User() {
                    return localStorage.user ? JSON.parse(localStorage.user) : null;
               },
               ...mapWritableState(useStationsEmployeeStore, {
                    filter: "filter",
               }),
               ...mapWritableState(usePortionsStore, ["portions"]),
               ...mapWritableState(useStationsEmployeeStore, ["statistic"]),
          },
          mounted() {
               this.filter.StationId = this.User.stationId;
               // this.GetRecords();
               // this.GetPortions();
          },

          methods: {
               ShowAll() {
                    this.isfilter = true;
               },
               all() {
                    this.filter.CouponNumber = null;
                    this.isfilter = false;
               },
               ...mapActions(usePortionsStore, {
                    GetPortions: "GetRecords",
               }),
               ...mapActions(useStationsEmployeeStore, ["GetRecords"]),
          },
          watch: {
               filter: {
                    handler() {
                         this.GetRecords();
                    },
                    deep: true,
               },
          },
     };
</script>
