<template>
     <Dialog v-model:visible="dialog" modal :header="record.id ? 'تعديل' : 'اضافة'" :style="{ width: '50rem' }">
          <form @submit.prevent="record.id ? update() : create()" class="border-top-1 border-bluegray-100">
               <div class="grid mt-1">
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">رقم الكوبون</label>
                         <InputText
                              min="1"
                              max="12"
                              class="w-full"
                              required
                              type="number"
                              v-model="record.couponNumber" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">تاريخ الحصة</label>
                         <InputText class="w-full" required type="date" v-model="record.portionStartDate" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">اللترات</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.liters"
                              :options="liters.asList()"
                              optionLabel="label"
                              optionValue="value" />
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
     import { usePortionsStore } from "@/store/modules/portions";
     import { liters } from "@/enums";

     export default {
          computed: {
               liters() {
                    return liters;
               },
               ...mapWritableState(usePortionsStore, ["record", "dialog"]),
          },
          methods: {
               ...mapActions(usePortionsStore, ["AddRecord", "UpdateRecord"]),
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
