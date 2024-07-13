<template>
     <Dialog v-model:visible="dialog" modal :header="record.id ? 'تعديل' : 'اضافة'" :style="{ width: '50rem' }">
          <form @submit.prevent="record.id ? update() : create()" class="border-top-1 border-bluegray-100">
               <div class="grid mt-1">
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">اسم الوكيل</label>
                         <InputText class="w-full" required v-model="record.name" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">رقم الوكالة</label>
                         <InputText min="1" max="12" class="w-full" required type="number" v-model="record.number" />
                    </div>
               </div>
               <div class="flex justify-content-end gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
                    <Button size="small" label="الغاء" severity="danger" @click="close()"></Button>
                    <Button size="small" type="submit" label="حفظ" severity="success"></Button>
               </div>
          </form>
     </Dialog>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useAgentsStore } from "@/store/modules/agents";

     export default {
          computed: {
               ...mapWritableState(useAgentsStore, ["record", "dialog"]),
          },
          methods: {
               ...mapActions(useAgentsStore, ["AddRecord", "UpdateRecord"]),
               create() {
                    this.AddRecord().then(() => {
                         this.dialog = false;
                         this.alertSuccess("تمت الاضافة بنجاح");
                         this.clearObjectValues(this.record);
                    });
               },
               update() {
                    this.UpdateRecord().then(() => {
                         this.dialog = false;
                         this.alertSuccess("تم التعديل بنجاح");
                         this.clearObjectValues(this.record);
                    });
               },
               close() {
                    this.dialog = false;
                    this.clearObjectValues(this.record);
               },
          },
     };
</script>
