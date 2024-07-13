<template>
     <div class="card">
          <div class="flex justify-content-between mb-2">
               <h5>مواطنين قيد المراجعة</h5>
          </div>
          <div class="text-center my-8 py-8">
               <div>
                    <i class="pi pi-file-excel text-green-700" style="font-size: 10rem"></i>
               </div>
               <Button class="mt-5" type="button" @click="ExportExcel">تصدير ملف اكسل</Button>
          </div>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { usePersonsStore } from "@/store/modules/persons";
     import { downloadFile } from "@/utils/helper";

     export default {
          computed: {
               ...mapWritableState(usePersonsStore, ["filter"]),
          },
          mounted() {
               this.filter.status = 2;
          },
          methods: {
               ...mapActions(usePersonsStore, ["ExportExcel"]),
          },
     };
</script>
