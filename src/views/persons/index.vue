<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة المواطنين ( {{ totalCount.toLocaleString() }} )</h5>
               <Button
                    v-if="canAccess(['Admin'])"
                    size="small"
                    class="p-button-success"
                    label="اضافة مواطن"
                    @click="addRecord"></Button>
          </div>
          <persons-filter></persons-filter>
          <div class="flex Excel mb-3">
               <Button label="تحميل  بيانات Excel " @click="ExportExcel" />
          </div>
          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable scrollable size="small" :value="records" responsiveLayout="scroll">
                    <Column class="text-center" header="#" field="index" />
                    <Column class="text-center" field="familyName" header="الاسم"></Column>
                    <Column class="text-center" field="familyNumber" header="رقم البطاقة التموينية"></Column>
                    <Column class="text-center" field="district.name" header=" اسم مركز التموين "></Column>
                    <Column class="text-center" field="district.rcNo" header=" رقم مركز التموين "></Column>
                    <Column class="text-center" field="branch.name" header="الفرع"></Column>
                    <Column class="text-center" field="agent.name" header="الوكيل"></Column>
                    <Column class="text-center" field="accountNumber" header="رقم الحساب">
                         <template #body="slotProps">
                              {{ slotProps.data.accountNumber ? slotProps.data.accountNumber : "---" }}
                         </template>
                    </Column>
                    <Column class="text-center" field="note" header=" الملاحظة">
                         <template #body="slotProps">
                              {{ slotProps.data.note ? slotProps.data.note : "---" }}
                         </template>
                    </Column>
                    <Column class="text-center" field="district.name" header=" اسم مركز التموين "></Column>
                    <Column class="text-center" field="cardType" header="نوع البطاقة">
                         <template #body="slotProps">
                              {{ CardType.getLabelByValue(slotProps.data.cardType) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="status" header="الحالة">
                         <template #body="slotProps">
                              <Tag
                                   :severity="PersonStatus.getColorByValue(slotProps.data.status)"
                                   :value="PersonStatus.getLabelByValue(slotProps.data.status)"></Tag>
                         </template>
                    </Column>
                    <Column class="text-center" field="createdAt" header="تاريخ الاضافة">
                         <template #body="slotProps">
                              {{ dateTimeFormat(slotProps.data.createdAt) }}
                         </template>
                    </Column>

                    <Column
                         class="text-center"
                         field="actions"
                         header="الاجرائات"
                         style="width: 14%"
                         v-if="canAccess(['Admin'])">
                         <template #body="slotProps">
                              <Button
                                   v-tooltip="' تعديل '"
                                   icon="pi pi-pencil"
                                   class="p-button-rounded mx-1"
                                   @click="editRecord(slotProps.data)"></Button>

                              <Button
                                   icon="pi pi-eye"
                                   v-tooltip="'بيانات IDMS '"
                                   class="p-button-rounded mx-1"
                                   v-if="slotProps.data.status == 2"
                                   @click="showIdms(slotProps.data)"></Button>
                              <Button
                                   icon="pi pi-cog"
                                   v-tooltip="'   تغيير الحالة '"
                                   class="p-button-rounded mx-1"
                                   v-if="slotProps.data.status != 2"
                                   @click="showchangeStatus(slotProps.data)"></Button>
                              <!-- <Button
                              icon="pi pi-trash"
                              class="p-button-rounded mx-1 p-button-danger"
                              @click="deleteRecord(slotProps.data)"></Button> -->
                         </template>
                    </Column>
               </DataTable>
               <Paginator dir="rtl" :rows="10" :totalRecords="totalCount" v-model:first="filter.pageNumber"></Paginator>
          </div>
          <person-modal></person-modal>
          <IdmsModal></IdmsModal>
          <changeStatus></changeStatus>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import PersonModal from "./components/person-modal.vue";
     import { usePersonsStore } from "@/store/modules/persons";
     import { CardType, PersonStatus } from "@/enums";
     import { showAlertWithConfirm } from "@/utils/helper";
     import PersonsFilter from "./components/persons-filter.vue";
     import IdmsModal from "./components/idms-modal.vue";
     import changeStatus from "./components/changeStatus.vue";

     export default {
          data() {
               return {
                    number: "",
               };
          },
          components: {
               PersonModal,
               PersonsFilter,
               IdmsModal,
               changeStatus,
          },

          mounted() {
               this.resetFilter();
          },

          computed: {
               CardType() {
                    return CardType;
               },
               PersonStatus() {
                    return PersonStatus;
               },
               ...mapWritableState(usePersonsStore, [
                    "records",
                    "totalCount",
                    "record",
                    "filter",
                    "dialog",
                    "shangeStatusDialog",
                    "idmsDialog",
               ]),
               indexColumn() {
                    const index = (rowIndex) => {
                         return rowIndex + 1; // rowIndex is zero-based, so adding 1 to start from 1
                    };
                    return this.filter.pageNumber;
                    // i + 1 + (this.currentPage - 1) * pageSize
               },
          },
          methods: {
               ...mapActions(usePersonsStore, [
                    "GetRecords",
                    "RemoveRecord",
                    "resetFilter",
                    "FindCustomer",
                    "ExportExcel",
               ]),
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
               async showIdms(record) {
                    Object.assign(this.record, record);
                    await this.FindCustomer();
                    this.idmsDialog = true;
               },
               showchangeStatus(record) {
                    Object.assign(this.record, record);

                    this.shangeStatusDialog = true;
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
