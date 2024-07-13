<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة الجوالين ( {{ totalCount.toLocaleString() }} )</h5>
          </div>
          <merchants-filter></merchants-filter>
          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable size="small" :value="records" responsiveLayout="scroll">
                    <Column class="text-center" header="#" field="index" />
                    <Column class="text-center" field="name" header="اسم الجوال"></Column>
                    <Column class="text-center" field="motherName" header="اسم الام"></Column>
                    <Column class="text-center" field="phone" header="رقم الهاتف"></Column>
                    <Column class="text-center" field="accountNumber" header="رقم الحساب"></Column>
                    <Column class="text-center" field="address" header="العنوان"></Column>
                    <Column class="text-center" field="actions" header="الاجرائات">
                         <template #body="slotProps">
                              <Button
                                   icon="pi pi-qrcode"
                                   class="p-button-rounded mx-1"
                                   v-tooltip="'عرض Qr Code'"
                                   @click="openDownloadQrModal(slotProps.data)"></Button>
                         </template>
                    </Column>
               </DataTable>
               <Paginator dir="rtl" :rows="10" :totalRecords="totalCount" v-model:first="filter.skip"></Paginator>
          </div>
          <qrmodal></qrmodal>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useMerchantsStore } from "@/store/modules/merchants";
     import qrmodal from "./components/qrmodal.vue";
     import MerchantsFilter from "./components/merchants-filter.vue";

     export default {
          components: {
               qrmodal,
               MerchantsFilter,
          },
          mounted() {
               this.resetFilter();
          },
          computed: {
               ...mapWritableState(useMerchantsStore, ["records", "totalCount", "filter", "record", "dialog"]),
          },
          methods: {
               ...mapActions(useMerchantsStore, ["GetRecords", "resetFilter"]),
               openDownloadQrModal(record) {
                    Object.assign(this.record, record);
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
