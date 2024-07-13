<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة المحطات ( {{ totalCount.toLocaleString() }} )</h5>
               <Button
                    v-if="canAccess(['Admin'])"
                    size="small"
                    class="p-button-success"
                    label="اضافة محطة"
                    @click="addRecord"></Button>
          </div>
          <stations-filter></stations-filter>

          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable size="small" :value="records" responsiveLayout="scroll">
                    <Column class="text-center" header="#" field="index" />
                    <Column class="text-center" field="name" header="اسم المحطة"></Column>
                    <!-- <Column class="text-center" field="address" header="العنوان"></Column> -->

                    <Column class="text-center" field="gov.name" header="المحافظة"></Column>
                    <Column class="text-center" field="sector.name" header="القطاع"></Column>

                    <!-- <Column class="text-center" field="branch.name" header="الفرع"></Column>   -->
                    <!-- <Column class="text-center" field="district.name" header="المنطقة"></Column> -->
                    <Column class="text-center" field="locationNumber" header="Merchant ID"></Column>
                    <Column class="text-center" field="terminalId" header="Terminal Id  "></Column>
                    <Column class="text-center" field="createdAt" header="تاريخ الاضافة">
                         <template #body="slotProps">
                              {{ dateTimeFormat(slotProps.data.createdAt) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="type" header="نوع المحطة ">
                         <template #body="slotProps">
                              {{ StationType.getLabelByValue(slotProps.data.type) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="note" header="الملاحظة"></Column>
                    <Column class="text-center" field="status" header="الحالة">
                         <template #body="slotProps">
                              <Tag
                                   :severity="stationStatus.getColorByValue(slotProps.data.status)"
                                   :value="stationStatus.getLabelByValue(slotProps.data.status)"></Tag>
                         </template>
                    </Column>
                    <Column class="text-center" field="actions" header="الاجرائات" style="width: 17%">
                         <template #body="slotProps">
                              <Button
                                   v-tooltip="'عرض  Qr Code '"
                                   icon="pi pi-qrcode"
                                   class="p-button-rounded mx-1"
                                   @click="openDownloadQrModal(slotProps.data)"></Button>
                              <Button
                                   v-if="canAccess(['Admin'])"
                                   icon="pi pi-pencil"
                                   v-tooltip="' تعديل '"
                                   class="p-button-rounded mx-1"
                                   @click="editRecord(slotProps.data)"></Button>
                              <Button
                                   v-if="slotProps.data.status == 1 && canAccess(['Admin'])"
                                   icon="pi pi-power-off"
                                   v-tooltip="' الغاء تفعيل '"
                                   class="p-button-rounded mx-1 p-button-danger"
                                   @click="changeStatus(slotProps.data)"></Button>
                              <Button
                                   icon="pi pi-power-off"
                                   v-if="slotProps.data.status == 0 && canAccess(['Admin'])"
                                   v-tooltip="'  تفعيل '"
                                   @click="changeStatus(slotProps.data)"
                                   class="p-button-rounded mx-1 p-button-success"></Button>

                              <!-- <Button
                                   icon="pi pi-trash"
                                   class="p-button-rounded mx-1 p-button-danger"
                                   @click="deleteRecord(slotProps.data)"></Button> -->
                         </template>
                    </Column>
               </DataTable>
               <Paginator dir="rtl" :rows="10" :totalRecords="totalCount" v-model:first="filter.pageNumber"></Paginator>
          </div>
          <station-modal></station-modal>
          <qrmodal></qrmodal>
          <changeStatus></changeStatus>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import StationModal from "./components/station-modal.vue";
     import { useStationsStore } from "@/store/modules/stations";
     import { showAlertWithConfirm } from "@/utils/helper";
     import StationsFilter from "./components/stations-filter.vue";
     import qrmodal from "./components/qrmodal.vue";
     import changeStatus from "./components/changeStatus.vue";
     import { stationStatus, StationType } from "@/enums";
     import { useBranchesStore } from "@/store/modules/branches";
     import { useSectorStore } from "@/store/modules/sectors";

     export default {
          components: {
               StationModal,
               StationsFilter,
               qrmodal,
               changeStatus,
          },
          mounted() {
               this.GetSectors();
               this.resetFilter();
          },
          computed: {
               stationStatus() {
                    return stationStatus;
               },

               StationType() {
                    return StationType;
               },

               ...mapWritableState(useStationsStore, [
                    "records",
                    "totalCount",
                    "record",
                    "filter",
                    "dialog",
                    "qrDialog",
                    "StatusDialog",
               ]),
          },

          methods: {
               ...mapActions(useBranchesStore, {
                    GetBranches: "GetRecords",
               }),
               ...mapActions(useSectorStore, ["GetSectors"]),

               ...mapActions(useStationsStore, ["GetRecords", "RemoveRecord", "resetFilter", "UpdateStatus"]),
               openDownloadQrModal(record) {
                    Object.assign(this.record, record);
                    this.qrDialog = true;
               },
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
                    this.GetBranches(record.govId);
                    this.dialog = true;
               },
               addRecord() {
                    this.clearObjectValues(this.record);
                    this.dialog = true;
               },
               changeStatus(record) {
                    Object.assign(this.record, record);
                    this.StatusDialog = true;
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
