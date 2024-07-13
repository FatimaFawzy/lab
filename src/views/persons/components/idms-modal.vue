<template>
     <Dialog
          v-model:visible="idmsDialog"
          modal
          :header="'رقم الحساب : ' + record.accountNumber"
          :style="{ width: '75rem' }">
          <hr />
          <br />

          <p class="info">معلومات المواطن</p>
          <div class="grid">
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">اسم رب الاسرة</label>
                    <InputText class="w-full" type="text" disabled :value="record.familyName" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">رقم البطاقة التموينية</label>
                    <InputText reqired class="w-full" type="text" disabled :value="record.familyNumber" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">العنوان</label>
                    <InputText class="w-full" type="text" disabled :value="record.district.name" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">الفرع</label>
                    <InputText class="w-full" type="text" disabled :value="record.branch.name" />
               </div>
          </div>

          <hr />
          <p class="info">معلومات IDMS</p>

          <div class="grid mt-1">
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">الاسم الاول</label>
                    <InputText class="w-full" type="text" disabled :value="idmsRecord.demographics.firstName" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">الاسم الثاني</label>
                    <InputText class="w-full" type="text" disabled :value="idmsRecord.demographics.secondName" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">الاسم الثالث</label>
                    <InputText class="w-full" type="text" disabled="" :value="idmsRecord.demographics.thirdName" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">الاسم الرابع</label>
                    <InputText class="w-full" type="text" disabled="" :value="idmsRecord.demographics.fourthName" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">العنوان</label>
                    <InputText class="w-full" type="text" disabled="" :value="idmsRecord.proofOfAddress.address" />
               </div>
               <div class="col-3 pb-0">
                    <label class="block text-md mb-2">المحافظة</label>
                    <InputText class="w-full" type="text" disabled="" :value="idmsRecord.proofOfAddress.provinceName" />
               </div>
          </div>

          <div class="flex actions gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
               <div>
                    <Button
                         size="small"
                         class="ml-1"
                         type="submit"
                         label="تمت الموافقة"
                         severity="success"
                         @click="done()"></Button>

                    <Button size="small" label=" تم الرفض " severity="info" @click="didntUpdate()"></Button>
               </div>
               <Button size="small" label="اغلاق" severity="danger" @click="close()"></Button>
          </div>
     </Dialog>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { usePersonsStore } from "@/store/modules/persons";

     export default {
          computed: {
               ...mapWritableState(usePersonsStore, [
                    "record",
                    "idmsDialog",
                    "updateStatus",
                    "idmsRecord",
                    "newStaus",
                    "alertMsg",
               ]),
          },

          methods: {
               ...mapActions(usePersonsStore, ["UpdateStaus"]),

               close() {
                    this.idmsDialog = false;
                    this.clearObjectValues(this.record);
               },
               done() {
                    this.newStaus = 1;
                    this.UpdateStaus().then(() => {
                         this.idmsDialog = false;
                         this.alertSuccess(this.alertMsg);
                    });
               },
               didntUpdate() {
                    this.newStaus = 4;
                    this.UpdateStaus().then(() => {
                         this.idmsDialog = false;
                         this.alertSuccess(this.alertMsg);
                    });
               },
          },
     };
</script>
<style scoped>
     .info {
          font-weight: bold;
          color: #3b3d91;
          font-size: large;
     }
     .actions {
          justify-content: space-between;
     }
</style>
