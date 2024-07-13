<template>
     <Dialog v-model:visible="statusDialog" modal header="تعديل حالة الحصة" :style="{ width: '50rem' }">
          <form @submit.prevent="create()" class="border-top-1 border-bluegray-100">
               <div class="grid mt-1">
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">حالة الحصة</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="key"
                              :options="PortionStatusOptions.asList()"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
               </div>
               <div class="flex justify-content-end gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
                    <Button size="small" label="الغاء" severity="danger" @click="statusDialog = false"></Button>
                    <Button size="small" type="submit" label="حفظ" severity="success"></Button>
               </div>
          </form>
     </Dialog>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { usePortionsStore } from "@/store/modules/portions";
     import { PortionStatusOptions } from "@/enums";

     export default {
          data() {
               return {
                    key: 0,
               };
          },
          computed: {
               PortionStatusOptions() {
                    return PortionStatusOptions;
               },
               ...mapWritableState(usePortionsStore, ["record", "statusDialog"]),
          },
          methods: {
               ...mapActions(usePortionsStore, ["UpdateStatus"]),
               create() {
                    this.UpdateStatus(this.key).then(() => {
                         this.alertSuccess("تم تعديل حالة الحصة بنجاح");
                         this.statusDialog = false;
                    });
               },
          },
     };
</script>
