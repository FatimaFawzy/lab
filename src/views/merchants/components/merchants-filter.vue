<template>
     <div class="grid filter mb-3">
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">اسم الجوال</label>
               <InputText class="w-full" required v-model="filter.name" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">رقم الهاتف</label>
               <InputText type="number" class="w-full" required v-model="filter.phoneNumber" @input="showIsFilter()" />
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
          <div class="col-3 pb-0" v-if="isfilter">
               <Button label="عرض جميع البيانات" severity="info" outlined @click="reset()" />
          </div>
     </div>
</template>
<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useMerchantsStore } from "@/store/modules/merchants";
     import { useSharedStore } from "@/store/modules/shared";

     export default {
          mounted() {
               this.isfilter = false;
          },
          computed: {
               ...mapWritableState(
                    useMerchantsStore,

                    {
                         filter: "filter",
                    }
               ),

               ...mapWritableState(useSharedStore, ["isfilter"]),
          },
          methods: {
               ...mapActions(useMerchantsStore, ["resetFilter"]),
               ...mapActions(useSharedStore, ["showIsFilter"]),
               reset() {
                    this.isfilter = false;
                    this.resetFilter();
               },
          },
     };
</script>
