<template>
     <Dialog
          v-model:visible="shangeStatusDialog"
          modal
          :header="' حالة المواطن  ' + ' - ' + PersonStatus.getLabelByValue(record.status)"
          :style="{ width: '50rem' }">
          <hr />
          <br />

          <p class="info">تغيير حالة المواطن</p>
          <div class="grid">
               <div class="col-6 pb-0">
                    <label class="block text-md mb-2">الحالة الجديدة</label>
                    <Dropdown
                         required
                         class="w-full"
                         v-model="newStaus"
                         :options="PersonStatus.asList()"
                         optionLabel="label"
                         optionValue="value" />
               </div>
          </div>

          <div class="flex actions gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
               <div>
                    <Button size="small" label="    حفظ " severity="info" @click="Update()"></Button>
               </div>
               <Button size="small" label="اغلاق" severity="danger" @click="close()"></Button>
          </div>
     </Dialog>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { usePersonsStore } from "@/store/modules/persons";
     import { PersonStatus } from "@/enums";
     export default {
          computed: {
               PersonStatus() {
                    return PersonStatus;
               },
               ...mapWritableState(usePersonsStore, [
                    "record",
                    "shangeStatusDialog",
                    "updateStatus",
                    "newStaus",
                    "alertMsg",
               ]),
          },

          methods: {
               ...mapActions(usePersonsStore, ["UpdateStaus"]),
               close() {
                    this.shangeStatusDialog = false;
                    this.clearObjectValues(this.record);
               },
               Update() {
                    this.UpdateStaus().then(() => {
                         this.shangeStatusDialog = false;
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
