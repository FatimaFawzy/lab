<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة المستخدمين ( {{ totalCount.toLocaleString() }} )</h5>
               <Button
                    v-if="canAccess(['Admin'])"
                    size="small"
                    class="p-button-success"
                    label="اضافة مستخدم"
                    @click="addRecord"></Button>
          </div>
          <users-filter></users-filter>
          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable size="small" :value="records" responsiveLayout="scroll">
                    <Column class="text-center" header="#" field="index" />
                    <Column class="text-center" field="name" header="الاسم"></Column>
                    <Column class="text-center" field="username" header="اسم المستخدم"></Column>
                    <Column class="text-center" field="role" header="نوع الحساب ">
                         <template #body="slotProps">
                              {{ UserType.getLabelByValue(slotProps.data.role) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="phoneNumber" header="رقم الهاتف"></Column>
                    <Column class="text-center" field="createdAt" header="تاريخ الاضافة">
                         <template #body="slotProps">
                              {{ dateTimeFormat(slotProps.data.createdAt) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="actions" header="الاجرائات" v-if="canAccess(['Admin'])">
                         <template #body="slotProps">
                              <Button
                                   v-tooltip="' تعديل '"
                                   icon="pi pi-pencil"
                                   class="p-button-rounded mx-1"
                                   @click="editRecord(slotProps.data)"></Button>
                              <Button
                                   icon="pi pi-trash"
                                   v-tooltip="' حذف '"
                                   class="p-button-rounded mx-1 p-button-danger"
                                   @click="deleteRecord(slotProps.data)"></Button>
                         </template>
                    </Column>
               </DataTable>
               <Paginator dir="rtl" :rows="10" :totalRecords="totalCount" v-model:first="filter.pageNumber"></Paginator>
          </div>
          <users-modal></users-modal>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import UsersModal from "./components/users-modal.vue";
     import { useUsersStore } from "@/store/modules/users";
     import { showAlertWithConfirm } from "@/utils/helper";
     import UsersFilter from "./components/users-filter.vue";
     import { UserType } from "@/enums";
     export default {
          components: {
               UsersModal,
               UsersFilter,
          },
          mounted() {
               this.resetFilter();
               // this.GetRecords();
          },
          computed: {
               UserType() {
                    return UserType;
               },
               ...mapWritableState(useUsersStore, ["records", "totalCount", "record", "filter", "dialog"]),
          },
          methods: {
               ...mapActions(useUsersStore, ["GetRecords", "RemoveRecord", "resetFilter"]),
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
