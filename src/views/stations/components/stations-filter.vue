<template>
     <div class="grid filter mb-3">
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">اسم المحطة</label>
               <InputText class="w-full" required v-model="filter.name" @input="showIsFilter()" />
          </div>
          <!-- <div class="col-3 pb-0">
               <label class="block text-md mb-2">رقم الحساب</label>
               <InputText
                    type="number"
                    class="w-full"
                    required
                    v-model="filter.accountNumber"
                    @input="showIsFilter()" />
          </div> -->
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">Merchant ID</label>
               <InputText
                    type="number"
                    class="w-full"
                    required
                    v-model="filter.locationNumber"
                    @input="showIsFilter()" />
          </div>
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">نوع المحطة</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.type"
                    :options="StationType.asList()"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">المحافظة</label>

               <Dropdown
                    class="w-full"
                    @change="showIsFilter()"
                    v-model="filter.govId"
                    :options="cities()"
                    optionLabel="label"
                    optionValue="value" />
          </div>
          <div class="col-4 pb-0">
               <label class="block text-md mb-2">القطاع</label>

               <Dropdown
                    class="w-full"
                    @change="showIsFilter()"
                    v-model="filter.sectorId"
                    :options="Sectors"
                    optionLabel="label"
                    optionValue="value" />
          </div>
          <!-- <div v-if="filter.govId" class="col-3 pb-0">
               <label class="block text-md mb-2">المنطقة</label>
               <Dropdown
                    class="w-full"
                    @change="showIsFilter()"
                    v-model="filter.districtId"
                    :options="districts(filter.govId)"
                    optionLabel="label"
                    optionValue="value" />
          </div> -->
          <div class="col-4 pb-0" v-if="isfilter">
               <Button label="عرض جميع البيانات" severity="info" outlined @click="reset()" />
          </div>
     </div>
</template>
<script>
     import { mapWritableState, mapActions } from "pinia";
     import { useStationsStore } from "@/store/modules/stations";
     import { useSharedStore } from "@/store/modules/shared";
     import { StationType } from "@/enums";
     import { useCitiesStore } from "@/store/modules/cities";
     import { useSectorStore } from "@/store/modules/sectors";

     export default {
          mounted() {
               this.isfilter = false;
          },
          computed: {
               ...mapWritableState(useCitiesStore, ["cities", "districts"]),
               ...mapWritableState(useSectorStore, ["Sectors", "totalCount"]),

               StationType() {
                    return StationType;
               },
               ...mapWritableState(useStationsStore, {
                    filter: "filter",
               }),
               ...mapWritableState(useSharedStore, ["isfilter"]),
          },
          methods: {
               ...mapActions(useStationsStore, ["resetFilter"]),
               ...mapActions(useSharedStore, ["showIsFilter"]),
               reset() {
                    this.isfilter = false;
                    this.resetFilter();
               },
          },
     };
</script>
