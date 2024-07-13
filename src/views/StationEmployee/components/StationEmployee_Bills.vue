<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة الفواتير ( {{ totalCount.toLocaleString() }} )</h5>
          </div>
          <bills-filter :isStation="true"></bills-filter>
          <!-- <pdfExport></pdfExport> -->

          <div class="d-none" id="bill">
               <div class="continer-fluid" style="height: 100vh !important">
                    <div class="row mt-0 p-2" dir="rtl">
                         <div class="col-12 mb-4 border-bottom text-center h-100">
                              <div class="row align-items-center">
                                   <div class="col-4"></div>
                                   <div class="col-4">
                                        <span>
                                             <img class="w-1 h-1" src="../../../../public/favicon.ico" alt="" />
                                        </span>
                                   </div>
                                   <span class="col-4 text-left">
                                        <p class="p-0" v-if="filter.fromCreatedDate">
                                             من تاريخ:
                                             <span>
                                                  {{ dateTimeFormat(filter.fromCreatedDate) }}
                                             </span>
                                        </p>
                                        <p class="p-0" v-if="!filter.fromCreatedDate">من تاريخ: ----</p>

                                        <p class="p-0" v-if="filter.toCreatedDate">
                                             الى تاريخ:
                                             {{ dateTimeFormat(filter.toCreatedDate) }}
                                        </p>
                                        <p class="p-0" v-if="!filter.toCreatedDate">
                                             الى تاريخ:
                                             <span>{{ dateTimeFormat(date) }}</span>
                                        </p>
                                   </span>
                              </div>
                         </div>

                         <div class="col-4 my-0">
                              <div class="card bg-primary o-hidden">
                                   <div class="card-body p-0 pt-2">
                                        <div class="text-center">
                                             <p class="text-dark text-20 mb-0">مبلغ اللترات الكلي</p>
                                             <p class="text-dark text-18 line-height-1">
                                                  {{ commaFormat(BillsSummary.totalAmount) }}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div class="col-4 my-0">
                              <div class="card bg-primary o-hidden">
                                   <div class="card-body p-0 pt-2">
                                        <div class="text-center">
                                             <p class="text-dark text-20 mb-0">عدد اللترات الكلي</p>
                                             <p class="text-dark text-18 line-height-1">
                                                  {{ commaFormat(BillsSummary.totalLiters) }}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div class="col-4 my-0">
                              <div class="card bg-primary o-hidden">
                                   <div class="card-body p-0 pt-2">
                                        <div class="text-center">
                                             <p class="text-dark text-20 mb-0">مبلغ العمولة الكلي</p>
                                             <p class="text-dark text-18 line-height-1">
                                                  {{ commaFormat(BillsSummary.totalTaxAmount) }}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div class="row p-2 justify-content-center">
                         <div class="col-6 my-2">
                              <div class="card bg-primary o-hidden">
                                   <div class="card-body p-0 pt-2">
                                        <div class="text-center">
                                             <p class="text-dark text-20">
                                                  عدد الحركات {{ BillsSummary.totalBillsCount }}
                                             </p>
                                             <p class="text-dark p-0 mt-2 text-20" style="margin-top: -10px !important">
                                                  <span class="mx-1">
                                                       مبلغ
                                                       <span class="mx-1">
                                                            {{ commaFormat(BillsSummary.totalAmount) }}
                                                       </span>
                                                  </span>
                                                  <span>/</span>
                                                  <span class="mx-2" dir="rtl">
                                                       {{ commaFormat(BillsSummary.totalLiters) }} لتر
                                                  </span>
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <br />
          <div class="flex Excel mb-3">
               <!-- <Button label="تحميل  بيانات Excel " @click="ExportBillsInExcel" class="ml-1" /> -->
               <Button label="طباعة  التقرير  " @click="printMenu()" />
          </div>

          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable :value="records" responsiveLayout="scroll" class="centered-text">
                    <Column class="text-center" header="#" field="index" />
                    <Column class="text-center" field="portion.couponNumber" header="رقم الكوبون"></Column>
                    <Column class="text-center" field="billNumber" header="رقم الفاتورة"></Column>
                    <Column class="text-center" field="cardNumber" header="رقم البطاقة  "></Column>
                    <Column class="text-center" field="rnn" header=" RRN"></Column>
                    <Column class="text-center" field="paidAmount" header="مبلغ الفاتورة">
                         <template #body="slotProps">
                              {{ slotProps.data.paidAmount ? slotProps.data.paidAmount.toLocaleString() : "---" }}
                         </template>
                    </Column>
                    <Column class="text-center" field="paymentTaxAmount" header="العمولة">
                         <template #body="slotProps">
                              {{
                                   slotProps.data.paymentTaxAmount
                                        ? slotProps.data.paymentTaxAmount.toLocaleString()
                                        : "---"
                              }}
                         </template>
                    </Column>
                    <Column class="text-center" field="portion.liters" header=" عدد اللترات"></Column>

                    <Column class="text-center" field="stationName" header="  جهة  البيع">
                         <template #body="slotProps">
                              <span v-if="slotProps.data.stationName">محطة</span>
                              <span v-else>جوال</span>
                         </template>
                    </Column>
                    <Column class="text-center" field="stationName" header=" اسم جهة  البيع  ">
                         <template #body="slotProps">
                              <span v-if="slotProps.data.stationName">{{ slotProps.data.stationName }}</span>
                              <span v-else>
                                   {{ slotProps.data.merchantName }}
                              </span>
                         </template>
                    </Column>

                    <Column class="text-center" field="createdAt" header="تاريخ الدفع">
                         <template #body="slotProps">
                              {{ dateTimeFormat(slotProps.data.createdAt) }}
                         </template>
                    </Column>
                    <Column class="text-center" field="paymentStatus" header="الحالة">
                         <template #body="slotProps">
                              <Tag
                                   :severity="PaymentStatus.getColorByValue(slotProps.data.paymentStatus)"
                                   :value="PaymentStatus.getLabelByValue(slotProps.data.paymentStatus)"></Tag>
                         </template>
                    </Column>
               </DataTable>

               <Paginator dir="rtl" :rows="10" :totalRecords="totalCount" v-model:first="filter.pageNumber"></Paginator>
          </div>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useBillsStore } from "@/store/modules/bills";
     import { CardType, PaymentStatus } from "@/enums";
     import BillsFilter from "../../bills/components/bills-filter.vue";
     // import pdfExport from "../components/pdfExport.vue";

     export default {
          components: {
               BillsFilter,
               // pdfExport,
          },
          mounted() {
               this.resetFilter();
               // this.GetRecords();
               this.filter.StationId = this.User.stationId;
          },
          computed: {
               date() {
                    return Date.now();
               },

               User() {
                    return localStorage.user ? JSON.parse(localStorage.user) : null;
               },
               CardType() {
                    return CardType;
               },
               PaymentStatus() {
                    return PaymentStatus;
               },
               ...mapWritableState(useBillsStore, ["BillsSummary", "records", "totalCount", "filter"]),
          },
          methods: {
               ...mapActions(useBillsStore, ["GetBillsSummary", "GetRecords", "resetFilter", "ExportBillsInExcel"]),
               printMenu() {
                    this.GetBillsSummary().then(() => {
                         this.$nextTick(() => {
                              setTimeout(function () {
                                   var newWin = window.open("");
                                   var data = document.getElementById("bill").innerHTML;
                                   newWin.document.open();
                                   newWin.document.write(`
             <html>
               <head>
                 <title>التقرير</title>
                 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                 <style>
                 *{
                   font-family:Tajawal;
                   color:black;
                 }
                 table:first-child tbody tr th:nth-child(odd){
                   color:#000000ab
                 }
                 .bg-primary{
                   background-color:#c3d3c6  !important
                 }
                 </style>
                 <style type="text/css" media="print">
                     body {

                     }
                     img{
                         width:200px;
                     }
                     @page {
                       size: landscape !important;
                      }
                    
                     .bg-primary{
                       background-color:#c3d3c6  !important
                     }
                     .waterMark {
                       position: absolute;
                       bottom: 0px;
                       top:80px;
                       right: 0px;
                       margin:auto;
                       left:0px;
                       opacity: 0.2;
                       z-index: 999;
                     }

                 </style>
               </head>
             <body class="text-right" dir="rtl" onload="window.print();window.close()">
             ${data}
             </body>
             </html>`);

                                   newWin.document.close();
                              }, 50);
                         });
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
     .d-none {
          display: none;
     }
</style>
