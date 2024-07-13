<template>
     <div class="card pb-0">
          <div class="flex justify-content-between mb-2">
               <h5>ادارة الفواتير ( {{ totalCount.toLocaleString() }} )</h5>
          </div>
          <bills-filter></bills-filter>
          <br />
          <div class="flex justify-content-end gap-1 mb-3">
               <Button label="تحميل  بيانات Excel تفصيلية" @click="ExportBillsInExcel" />
               <Button label="تحميل  بيانات Excel مختصرة" :severity="'success'" @click="ExportDetailedBillsInExcel" />
               <Button label=" طباعة التقرير  " @click="ExportBillsReport" />
          </div>

          <div class="card flex justify-content-center mb-5" v-if="totalCount.toLocaleString() == 0">
               <InlineMessage severity="info">لا توجد بيانات</InlineMessage>
          </div>

          <div v-else>
               <DataTable :value="records" responsiveLayout="scroll" class="centered-text">
                    <Column class="text-center" header="#" field="index" />
                    <Column class="text-center" field="person.familyName" header="اسم رب الاسرة"></Column>
                    <Column class="text-center" field="portion.couponNumber" header="رقم الكوبون"></Column>
                    <Column class="text-center" field="person.familyNumber" header="رقم العائلة"></Column>
                    <Column class="text-center" field="cardNumber" header="رقم البطاقة  "></Column>
                    <Column class="text-center" field="rnn" header="RRN"></Column>
                    <Column class="text-center" field="billNumber" header="رقم الفاتورة"></Column>
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
                    <Column class="text-center" field="portion.liters" header="عدد اللترات"></Column>
                    <Column class="text-center" field="stationName" header="جهة  البيع">
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
     <div class="page" id="page" style="display: none">
          <div class="card">
               <div class="card-body">
                    <div class="subpage">
                         <div style="direction: rtl">
                              <div class="reportHeader" style="text-align: center">
                                   <h4>اجمالي تجهيز المحطات</h4>
                              </div>

                              <br />

                              <div>
                                   <table border="1" class="table bordered-table responsive-table">
                                        <thead>
                                             <tr>
                                                  <th><b>اسم المحطة</b></th>
                                                  <th><b>عدد التجهيزات</b></th>
                                                  <th><b>عدد اللترات</b></th>
                                             </tr>
                                        </thead>
                                        <tr v-for="item in BillsReport.bills" :key="item">
                                             <td>
                                                  <div>
                                                       <span>{{ item?.stationName ?? "---" }}</span>
                                                  </div>
                                             </td>
                                             <td>
                                                  <div>
                                                       <span>
                                                            {{ item?.totalBillsCount ?? "---" }}
                                                       </span>
                                                  </div>
                                             </td>

                                             <td>
                                                  <span>
                                                       {{ item?.totalLiters ?? "---" }}
                                                  </span>
                                             </td>
                                        </tr>
                                   </table>
                              </div>
                              <div class="total">
                                   <div>
                                        عدد التجهيزات :
                                        <span>{{ BillsReport?.totalBillsCount }}</span>
                                   </div>
                                   <div>
                                        عدد اللترات :
                                        <span>{{ BillsReport?.totalLiters }}</span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useBillsStore } from "@/store/modules/bills";
     import { CardType, PaymentStatus } from "@/enums";
     import BillsFilter from "./components/bills-filter.vue";

     export default {
          components: {
               BillsFilter,
          },
          mounted() {
               this.resetFilter();
               this.GetStationsBillsReport();
          },
          computed: {
               CardType() {
                    return CardType;
               },
               PaymentStatus() {
                    return PaymentStatus;
               },
               ...mapWritableState(useBillsStore, ["records", "totalCount", "filter", "BillsReport"]),
          },
          methods: {
               ...mapActions(useBillsStore, [
                    "GetRecords",
                    "resetFilter",
                    "ExportBillsInExcel",
                    "ExportDetailedBillsInExcel",
                    "GetStationsBillsReport",
               ]),
               ExportBillsReport() {
                    this.GetStationsBillsReport().then(() => {
                         this.$nextTick(() => {
                              setTimeout(function () {
                                   // Get HTML to print from element
                                   const prtHtml = document.getElementById("page")?.innerHTML;
                                   const head =
                                        document.head?.innerHTML || document.getElementsByTagName("head")[0]?.innerHTML;
                                   // Get all stylesheets HTML
                                   var css = `@page { size: portrait;  margin: 0 !important;}     @media print {       body,       .page {           margin: 0px !important;            box-shadow: 0;            -webkit-print-color-adjust: exact;             color: #000;         }         .table {           border: 1px solid black;           text-align: center;           }       td ,th{            border: 1px solid ;           }   .table> :not(:last-child)> :last-child>* {  border-bottom-color: #000;       }     }`;
                                   // Open the print window
                                   const WinPrint = window.open(
                                        "",
                                        "",
                                        "left=10,top=100,width=800,height=900,toolbar=0,scrollbars=0,status=0"
                                   );

                                   WinPrint?.document.write(
                                        `<!DOCTYPE html>  <html> <head>   ${head} </head> <style> ${css} </style>  <body>     ${prtHtml}   </body> </html>`
                                   );
                                   WinPrint?.document.close();
                                   setTimeout(() => {
                                        WinPrint?.focus();
                                        WinPrint?.print();
                                   }, 1000);
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
     .table,
     .text-wrap table {
          width: 100%;
          max-width: 100%;
          margin-bottom: 1rem;
     }

     .table {
          width: 100%;
          margin-bottom: 1rem;
          background-color: transparent;
          border-collapse: collapse;
     }
     .table td {
          border: 1px solid #dee2e6;
          padding: 8px;
          text-align: center;
     }
     .table th {
          background-color: #343a40;
          color: #fff;
          text-align: center;
          padding: 8px;
          border: 1px solid #dee2e6;
     }
     .total {
          display: flex;
          justify-content: space-around;
          border: 1px solid;
          padding: 9px;
          border-radius: 4px;
     }
     .total span {
          border: 1px solid rgb(0 0 0 / 4%);
          padding: 2px 8px;
          border-radius: 4px;
     }
     .table-responsive {
          display: block;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
     }
</style>
