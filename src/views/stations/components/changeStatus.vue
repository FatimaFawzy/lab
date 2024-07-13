<template>
     <Dialog
          v-model:visible="StatusDialog"
          modal
          :header="record.status == 1 ? 'الغاء التفعيل ' : ' تفعيل '"
          :style="{ width: '60rem' }">
          <div class="">
               <div class="border-top-1 border-bluegray-100">
                    <br />
                    <label class="block text-md mb-2">ملاحظة</label>
                    <InputText type="text" v-model="note" class="w-full" placeholder="سبب تغيير الحالة" />
               </div>

               <div class="flex justify-content-end gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
                    <Button size="small" label="اغلاق" severity="secondary" @click="StatusDialog = false"></Button>
                    <Button
                         size="small"
                         v-if="record.status == 1"
                         @click="update(record.id, record.status)"
                         :label="'الغاء التفعيل '"
                         :severity="'danger'"></Button>
                    <Button
                         size="small"
                         v-if="record.status == 0"
                         @click="update(record.id, record.status)"
                         :label="' تفعيل '"
                         :severity="'success'"></Button>
               </div>
               <br />
          </div>
     </Dialog>
</template>

<script>
     import { mapWritableState, mapActions } from "pinia";
     import { useStationsStore } from "@/store/modules/stations";

     export default {
          data() {
               return {
                    newStatus: 0,
               };
          },
          computed: {
               ...mapWritableState(useStationsStore, ["record", "StatusDialog", "note"]),
          },
          methods: {
               ...mapActions(useStationsStore, ["GetRecords", "UpdateStatus"]),

               update(id, status) {
                    if (status == 0) {
                         this.UpdateStatus(id, 1).then(() => {
                              this.GetRecords();
                              this.StatusDialog = false;
                              this.note = "";
                         });
                    } else if (status == 1) {
                         this.UpdateStatus(id, 0).then(() => {
                              this.GetRecords();
                              this.StatusDialog = false;
                              this.note = "";
                         });
                    }
               },
          },
     };
</script>
