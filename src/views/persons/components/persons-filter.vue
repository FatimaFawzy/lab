<template>
     <div class="grid filter mb-3">
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">اسم رب الاسرة</label>
               <InputText class="w-full" required v-model="filter.familyName" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">رقم البطاقة التموينية</label>
               <InputText class="w-full" type="number" required v-model="filter.familyNumber" @input="showIsFilter()" />
          </div>

          <div class="col-3 pb-0">
               <label class="block text-md mb-2">رقم الحساب</label>
               <InputText
                    type="number"
                    class="w-full"
                    required
                    v-model="filter.accountNumber"
                    @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">المحافظة</label>

               <Dropdown
                    required
                    class="w-full"
                    @change="
                         GetBranches(this.filter.govId);
                         showIsFilter();
                    "
                    v-model="filter.govId"
                    :options="cities()"
                    optionLabel="label"
                    optionValue="value" />
          </div>
          <div class="col-3 pb-0" v-if="filter.govId">
               <label class="block text-md mb-2">الفرع</label>

               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.BranchId"
                    :options="branches()"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0" v-if="filter.BranchId">
               <label class="block text-md mb-2">اسم مركز التموين</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.districtId"
                    :options="districts(filter.BranchId)"
                    optionLabel="label"
                    optionValue="value" />
          </div>

          <!-- <div class="col-3 pb-0">
               <label class="block text-md mb-2">منفذ التجهيز</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.stationId"
                    :options="stations"
                    optionLabel="label"
                    optionValue="value" />
          </div> -->

          <div class="col-3 pb-0">
               <label class="block text-md mb-2">نوع البطاقة</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.cardType"
                    :options="CardType.asList()"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">الحالة</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.Status"
                    :options="PersonStatus.asList()"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">حالة تفعيل المواطن</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.IsActive"
                    :options="isActive"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">من تاريخ</label>
               <InputText
                    class="w-full"
                    required
                    type="date"
                    v-model="filter.FromCreatedDate"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">الى تاريخ</label>
               <InputText class="w-full" required type="date" v-model="filter.ToCreatedDate" @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0" v-if="isfilter">
               <Button label="عرض جميع البيانات" severity="info" outlined @click="reset()" />
          </div>
     </div>
</template>
<script>
     import { mapActions, mapWritableState } from "pinia";
     import { usePersonsStore } from "@/store/modules/persons";
     import { useCitiesStore } from "@/store/modules/cities";
     import { useStationsStore } from "@/store/modules/stations";
     import { useBranchesStore } from "@/store/modules/branches";
     import { CardType } from "@/enums";
     import { PersonStatus } from "@/enums";
     import { useSharedStore } from "@/store/modules/shared";
     export default {
          // setup() {
          //      const branches = useBranchesStore().branches();
          //      const cities = useCitiesStore().cities();

          //      return { branches, cities };
          // },
          computed: {
               isActive() {
                    return [
                         {
                              value: true,
                              label: " مفعل",
                         },
                         {
                              value: false,
                              label: "غير مفعل",
                         },
                    ];
               },
               CardType() {
                    return CardType;
               },
               PersonStatus() {
                    return PersonStatus;
               },
               ...mapWritableState(usePersonsStore, {
                    filter: "filter",
               }),
               ...mapWritableState(useStationsStore, ["stations"]),
               ...mapWritableState(useSharedStore, ["isfilter"]),
               ...mapWritableState(useCitiesStore, ["cities"]),
               ...mapWritableState(useBranchesStore, ["branches", "districts"]),
          },
          mounted() {
               this.isfilter = false;
          },
          methods: {
               ...mapActions(useBranchesStore, {
                    GetBranches: "GetRecords",
               }),

               ...mapActions(useStationsStore, {
                    GetStations: "GetRecords",
               }),
               ...mapActions(usePersonsStore, ["resetFilter"]),
               ...mapActions(useSharedStore, ["showIsFilter"]),
               reset() {
                    this.isfilter = false;
                    this.resetFilter();
               },
          },
     };
</script>
