<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة الحصص ( {{ totalCount.toLocaleString() }} )</h5>
               <Button
                    v-if="canAccess(['Admin'])"
                    size="small"
                    class="p-button-success"
                    label="اضافة حصة"
                    @click="addRecord"></Button>
          </div>
          <portions-filter></portions-filter>
          <div class="flex Excel mb-3">
               <Button label="تحميل  بيانات Excel " @click="ExportExcel" />
          </div>
          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable size="small" :value="records" responsiveLayout="scroll">
                    <Column class="text-center" header="#" field="index" />
                    <Column class="text-center" field="couponNumber" header="رقم الكوبون"></Column>
                    <Column class="text-center" field="liters" header="عدد اللترات"></Column>
                    <Column class="text-center" field="portionStartDate" header=" تاريخ  انطلاق  الحصة">
                         <template #body="slotProps">
                              {{ dateFormat(slotProps.data.portionStartDate) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="portionStartDate" header=" تاريخ  ايقاف  الحصة    ">
                         <template #body="slotProps">
                              {{ dateFormat(slotProps.data.portionEndDate) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="paidBillsCount" header="عدد العوائل  المستلمة  "></Column>
                    <Column class="text-center" field="status" header="الحالة">
                         <template #body="slotProps">
                              <Tag
                                   :severity="PortionStatus.getColorByValue(slotProps.data.status.key)"
                                   :value="PortionStatus.getLabelByValue(slotProps.data.status.key)"></Tag>
                         </template>
                    </Column>
                    <Column class="text-center" field="actions" header="الاجرائات">
                         <template #body="slotProps">
                              <!-- <Button
                              icon="pi pi-pencil"
                              class="p-button-rounded mx-1"
                              @click="editRecord(slotProps.data)"></Button> -->
                              <Button
                                   v-tooltip="' تعديل الحالة'"
                                   icon="pi pi-pencil"
                                   class="p-button-rounded mx-1"
                                   v-if="canAccess(['Admin'])"
                                   @click="editStatusRecord(slotProps.data)"></Button>

                              <Button
                                   icon="pi pi-eye"
                                   v-tooltip="'عرض الفواتير '"
                                   class="p-button-rounded mx-1"
                                   @click="showBills(slotProps.data)"></Button>

                              <!-- <Button
                              icon="pi pi-trash"
                              class="p-button-rounded mx-1 p-button-danger"
                              @click="deleteRecord(slotProps.data)"></Button> -->
                         </template>
                    </Column>
               </DataTable>
               <Paginator dir="rtl" :rows="10" :totalRecords="totalCount" v-model:first="filter.pageNumber"></Paginator>
          </div>
          <portion-modal></portion-modal>
          <portion-status-modal></portion-status-modal>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import PortionModal from "./components/portion-modal.vue";
     import PortionStatusModal from "./components/portion-status-modal.vue";
     import { usePortionsStore } from "@/store/modules/portions";
     import { PortionStatus } from "@/enums";
     import { showAlertWithConfirm } from "@/utils/helper";
     import PortionsFilter from "./components/portions-filter.vue";

     export default {
          components: {
               PortionModal,
               PortionStatusModal,
               PortionsFilter,
          },
          mounted() {
               this.resetFilter();
          },
          computed: {
               PortionStatus() {
                    return PortionStatus;
               },
               ...mapWritableState(usePortionsStore, [
                    "records",
                    "totalCount",
                    "record",
                    "filter",
                    "dialog",
                    "statusDialog",
               ]),
          },
          methods: {
               ...mapActions(usePortionsStore, ["GetRecords", "RemoveRecord", "ExportExcel", "resetFilter"]),
               deleteRecord(record) {
                    showAlertWithConfirm("هل انت متأكد من حذف هذا العنصر؟").then((res) => {
                         if (res.value) {
                              this.record.id = record.id;
                              this.RemoveRecord();
                         }
                    });
               },
               editRecord(record) {
                    let { portionStartDate, ...rest } = record;
                    portionStartDate = this.dateFormat(portionStartDate);
                    this.record = { ...rest, portionStartDate };
                    this.dialog = true;
               },
               addRecord() {
                    this.clearObjectValues(this.record);
                    this.dialog = true;
               },
               editStatusRecord(record) {
                    Object.assign(this.record, record);
                    this.statusDialog = true;
               },
               showBills(record) {
                    this.$router.push({
                         name: "bills",
                         query: { portionId: record.id },
                    });
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
<style scoped>
     .Excel {
          justify-content: flex-end;
     }
</style>
