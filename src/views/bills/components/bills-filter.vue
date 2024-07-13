<template>
     <div class="grid filter mb-3">
          <div class="col-3 pb-0" v-if="User.role != 3">
               <label class="block text-md mb-2">اسم رب الاسرة</label>
               <InputText class="w-full" required v-model="filter.personName" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">رقم الفاتورة</label>
               <InputText type="number" class="w-full" required v-model="filter.billNumber" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0" v-if="User.role != 3">
               <label class="block text-md mb-2">رقم العائلة</label>
               <InputText class="w-full" v-model="filter.familyNumber" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">رقم البطاقة</label>
               <InputText class="w-full" v-model="filter.CardNumber" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">RRN</label>
               <InputText class="w-full" v-model="filter.Rnn" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0" v-if="User.role != 3">
               <label class="block text-md mb-2">جهة البيع</label>
               <Dropdown
                    class="w-full"
                    v-model="Selling"
                    :options="SellingSides"
                    optionLabel="label"
                    optionValue="value" />
          </div>
          <div class="col-3 pb-0" v-if="Selling == 1 && User.role != 3">
               <label class="block text-md mb-2">المحطة</label>
               <Dropdown
                    required
                    filter
                    :virtualScrollerOptions="{
                         lazy: true,
                         onLazyLoad: onLazyLoad,
                         itemSize: 40,
                         showLoader: false,
                    }"
                    class="w-full"
                    v-model="filter.stationId"
                    :options="stations"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>

          <div class="col-3 pb-0" v-if="Selling == 0 && User.role != 3">
               <label class="block text-md mb-2">الجوال</label>
               <Dropdown
                    filter
                    class="w-full"
                    :virtualScrollerOptions="{
                         lazy: true,
                         onLazyLoad: onMerchantLoad,
                         itemSize: 40,
                         showLoader: false,
                    }"
                    v-model="filter.MerchantId"
                    :options="merchants"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">الحصة</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.portionId"
                    :options="portions"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <!-- <div class="col-3 pb-0">
               <label class="block text-md mb-2">حالة الدفع</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.paymentStatus"
                    :options="PaymentStatus.asList()"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div> -->
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">من تاريخ</label>
               <InputText class="w-full" type="date" v-model="filter.fromCreatedDate" @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">الى تاريخ</label>
               <InputText class="w-full" type="date" v-model="filter.toCreatedDate" @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0" v-if="isfilter">
               <Button label="عرض جميع البيانات" severity="info" outlined @click="reset()" />
          </div>
     </div>
</template>
<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useBillsStore } from "@/store/modules/bills";
     import { usePortionsStore } from "@/store/modules/portions";
     import { useStationsStore } from "@/store/modules/stations";
     import { useSharedStore } from "@/store/modules/shared";
     import { useMerchantsStore } from "@/store/modules/merchants";
     import { PaymentStatus } from "@/enums";
     import { ref } from "vue";
     export default {
          setup() {
               const isOpen = ref(false);
               const toggleDropdown = () => {
                    isOpen.value = !isOpen.value;
               };

               const handleOptionClick = (option) => {
                    // Close the dropdown after selecting an option
                    isOpen.value = false;
               };

               return {
                    isOpen,
                    toggleDropdown,
                    handleOptionClick,
               };
          },
          props: {
               isStation: Boolean,
          },
          data() {
               return {
                    isStationLoaded: false,
                    isMerchantLoaded: false,
                    Selling: 1,
               };
          },
          computed: {
               User() {
                    return localStorage.user ? JSON.parse(localStorage.user) : null;
               },
               SellingSides() {
                    return [
                         {
                              value: 0,
                              label: "الجوال",
                         },
                         {
                              value: 1,
                              label: "المحطة",
                         },
                    ];
               },
               PaymentStatus() {
                    return PaymentStatus;
               },
               ...mapWritableState(useBillsStore, {
                    filter: "filter",
               }),
               ...mapWritableState(usePortionsStore, ["portions"]),
               ...mapWritableState(useStationsStore, ["stations"]),
               ...mapWritableState(useMerchantsStore, ["merchants"]),
               ...mapWritableState(useSharedStore, ["isfilter"]),
          },
          mounted() {
               if (this.$route.query.portionId) {
                    this.filter.portionId = this.$route.query.portionId;
               }

               this.GetPortions();
               if (this.User.role != 3) {
                    this.GetStations();
                    this.GetMerchants();
               }

               this.isfilter = false;
          },
          methods: {
               onLazyLoad() {
                    if (!this.isStationLoaded) {
                         this.GetStations(true);
                    }
                    this.isStationLoaded = true;
               },
               onMerchantLoad() {
                    if (!this.isMerchantLoaded) {
                         this.GetMerchants(true);
                    }
                    this.isMerchantLoaded = true;
               },
               ...mapActions(usePortionsStore, {
                    GetPortions: "GetRecords",
               }),
               ...mapActions(useStationsStore, {
                    GetStations: "GetRecords",
               }),
               ...mapActions(useMerchantsStore, {
                    GetMerchants: "GetRecords",
               }),
               ...mapActions(useBillsStore, ["resetFilter", "resetStationFilter"]),
               ...mapActions(useSharedStore, ["showIsFilter"]),
               reset() {
                    this.isfilter = false;
                    if (this.isStation) {
                         this.resetStationFilter();
                    } else {
                         this.resetFilter();
                    }
               },
          },
     };
</script>
<style>
     .p-dropdown-filter-container,
     .p-dropdown-clearable {
          direction: ltr !important;
     }
     .dropdown {
          position: relative;
          display: inline-block;
          width: 100%;
     }

     .dropdown button {
          background-color: #f8f9fa;
          border: 1px solid #ced4da;
          padding: 8px 16px;
          cursor: pointer;
     }

     .dropdown-menu {
          position: absolute;
          list-style: none;
          padding: 0;
          margin: 0;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          z-index: 1;
          width: 100%;
          margin-top: -34px;
     }

     .dropdown-menu li {
          padding: 8px 16px;
     }

     .dropdown-menu li button {
          background: none;
          border: none;
          cursor: pointer;
     }

     .dropdown-menu li button:hover {
          background-color: #f8f9fa;
     }
</style>
