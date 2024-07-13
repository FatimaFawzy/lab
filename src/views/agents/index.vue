<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة الوكلاء ( {{ totalCount.toLocaleString() }} )</h5>
               <Button
                    size="small"
                    class="p-button-success"
                    label="اضافة وكيل"
                    @click="addRecord"
                    v-if="canAccess(['Admin'])"></Button>
          </div>
          <agents-filter></agents-filter>
          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable size="small" :value="records" responsiveLayout="scroll">
                    <Column class="text-center" field="name" header="اسم الوكيل"></Column>
                    <Column class="text-center" field="number" header="رقم الوكالة"></Column>
                    <Column class="text-center" field="createdAt" header="تاريخ الاضافة">
                         <template #body="slotProps">
                              {{ dateTimeFormat(slotProps.data.createdAt) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="actions" header="الاجرائات" v-if="canAccess(['Admin'])">
                         <template #body="slotProps">
                              <Button
                                   icon="pi pi-pencil"
                                   class="p-button-rounded mx-1"
                                   v-tooltip="' تعديل '"
                                   @click="editRecord(slotProps.data)"></Button>
                              <!-- <Button
                              icon="pi pi-trash"
                              class="p-button-rounded mx-1 p-button-danger"
                              @click="deleteRecord(slotProps.data)"></Button> -->
                         </template>
                    </Column>
               </DataTable>
               <Paginator dir="rtl" :rows="10" :totalRecords="totalCount" v-model:first="filter.pageNumber"></Paginator>
          </div>
          <agent-modal></agent-modal>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import AgentModal from "./components/agent-modal.vue";
     import { useAgentsStore } from "@/store/modules/agents";
     import { showAlertWithConfirm } from "@/utils/helper";
     import AgentsFilter from "./components/agents-filter.vue";

     export default {
          components: {
               AgentModal,
               AgentsFilter,
          },
          mounted() {
               this.resetFilter();
               this.GetRecords();
          },
          computed: {
               ...mapWritableState(useAgentsStore, ["records", "totalCount", "record", "filter", "dialog"]),
          },
          methods: {
               ...mapActions(useAgentsStore, ["GetRecords", "RemoveRecord", "resetFilter"]),
               deleteRecord(record) {
                    showAlertWithConfirm("هل انت متأكد من حذف هذا العنصر؟").then((res) => {
                         if (res.value) {
                              this.record.id = record.id;
                              this.RemoveRecord();
                         }
                    });
               },
               editRecord(record) {
                    Object.assign(this.record, record);
                    this.dialog = true;
               },
               addRecord() {
                    this.clearObjectValues(this.record);
                    this.dialog = true;
               },
          },
          watch: {
               filter: {
                    handler() {
                         this.GetRecords();
                    },
                    deep: true,
               },
          },
     };
</script>
