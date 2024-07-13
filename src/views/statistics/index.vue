<template>
     <div>
          <statisticFilter></statisticFilter>
          <div class="grid">
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-2">عدد المحطات الكلي</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalStationsCount?.toLocaleString() }}
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-user"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-2">عدد الجوالين الكلي</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalMerchantsCount?.toLocaleString() }}
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-user"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-3">عدد العوائل الكلي</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalPersonsCount?.toLocaleString() }}
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-purple-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-credit-card"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-3">عدد الكوبونات الكلي</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalPortionsCount?.toLocaleString() }}
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-file"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-3">عدد اللترات الكلي</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalLitersCount?.toLocaleString() }}
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-file"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-3">عدد الفواتير الكلي</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalPaidBillsCount?.toLocaleString() }}
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-file"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-3">المبلغ الكلي</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalBillsAmount?.toLocaleString() }}
                                        <span class="text-success">د.ع</span>
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-file"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                         <div class="flex justify-content-between mb-3">
                              <div>
                                   <span class="block text-800 font-medium mb-3">العمولة الكلية</span>
                                   <div class="text-900 font-medium text-xl">
                                        {{ statistics.totalBillsTaxAmount?.toLocaleString() }}
                                        <span class="text-success">د.ع</span>
                                   </div>
                              </div>
                              <div
                                   class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                   style="width: 4rem; height: 4rem">
                                   <i class="pi pi-file"></i>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div class="grid mt-1">
               <div class="col-12 xl:col-6">
                    <div class="card">
                         <h5>عدد الفواتير الشهرية</h5>
                         <Chart type="bar" :data="billsInEachPortionMonthly" :options="lineOptions" />
                    </div>
               </div>
               <div class="col-12 xl:col-6">
                    <div class="card">
                         <h5>حالة تسجيل المواطنين</h5>
                         <Chart type="bar" :data="activeAndInActivePersonsCount" :options="lineOptions" />
                    </div>
               </div>

               <div class="col-12 xl:col-6">
                    <div class="card">
                         <h5>مبلغ الفواتير في كل حصة شهريه</h5>
                         <Chart type="bar" :data="paidAmountMonthly" :options="lineOptions" />
                    </div>
               </div>

               <div class="col-12 xl:col-6">
                    <div class="card">
                         <h5>المواطنين المسجلين شهريا</h5>
                         <Chart type="bar" :data="registeredPersonsMonthly" :options="lineOptions" />
                    </div>
               </div>

               <div class="col-12 xl:col-6">
                    <div class="card">
                         <h5>نوع البطاقات</h5>

                         <div class="flexCard">
                              <Chart type="pie" :data="oldAndNewCardsCount" :options="pieOptions" />
                         </div>
                    </div>
               </div>

               <div class="col-12 xl:col-6">
                    <div class="card">
                         <h5>عدد الحصص شهريا</h5>

                         <Chart type="bar" :data="recievedAndUnRecievedCount" :options="chartOptions" />
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
     import { computed, reactive, ref, watch, watchEffect, onMounted } from "vue";
     import { useLayout } from "@/layout/composables/layout";
     import { useStatisticsStore } from "@/store/modules/statistics";
     import { usePortionsStore } from "@/store/modules/portions";
     import statisticFilter from "./components/statistic-filter.vue";
     const statisticsStore = useStatisticsStore();
     const PortionsStore = usePortionsStore();

     const GetRecords = () => {
          statisticsStore.GetStatistics();
          statisticsStore.GetPaidBillsInEachPortionMonthly();
          statisticsStore.GetUnPaidBillsInEachPortionMonthly();
          statisticsStore.GetActiveAndInActivePersons();
          statisticsStore.GetPaidAmountMonthly();
          statisticsStore.GetRegisteredPersonsMonthly();
          statisticsStore.GetOldAndNewCardsCount();
          statisticsStore.GetReceivedAndNotReceivedPortionsMonthly();
          PortionsStore.GetRecords();
     };

     watchEffect(() => {
          GetRecords();
     });

     const statistics = computed(() => {
          return statisticsStore.records.statistics;
     });

     const filter = computed(() => {
          return statisticsStore.filter;
     });

     const billsInEachPortionMonthly = computed(() => {
          return reactive({
               labels: statisticsStore.labels,
               datasets: [
                    {
                         label: "الفواتير المدفوعة",
                         data: statisticsStore.records.paidBillsInEachPortionMonthly.values,
                         fill: false,
                         backgroundColor: "#00bb7e",
                         borderColor: "#00bb7e",
                         tension: 0.4,
                    },
               ],
          });
     });

     const activeAndInActivePersonsCount = computed(() => {
          const documentStyle = getComputedStyle(document.body);
          return reactive({
               labels: statisticsStore.records.activeAndInActivePersonsCount.labels,
               datasets: [
                    {
                         label: "مواطن",
                         data: statisticsStore.records.activeAndInActivePersonsCount.values,
                         fill: false,
                         backgroundColor: [
                              documentStyle.getPropertyValue("--cyan-500"),
                              documentStyle.getPropertyValue("--orange-500"),
                              documentStyle.getPropertyValue("--gray-500"),
                         ],
                         hoverBackgroundColor: [
                              documentStyle.getPropertyValue("--cyan-400"),
                              documentStyle.getPropertyValue("--orange-400"),
                              documentStyle.getPropertyValue("--gray-400"),
                         ],
                         tension: 0.4,
                    },
               ],
          });
     });

     const paidAmountMonthly = computed(() => {
          return reactive({
               labels: statisticsStore.labels,
               datasets: [
                    {
                         label: "دينار",
                         data: statisticsStore.records.paidAmountMonthly.values,
                         fill: false,
                         backgroundColor: "#2f4860",
                         borderColor: "#2f4860",
                         tension: 0.4,
                    },
               ],
          });
     });

     const registeredPersonsMonthly = computed(() => {
          return reactive({
               labels: statisticsStore.labels,
               datasets: [
                    {
                         label: "مواطن",
                         data: statisticsStore.records.registeredPersonsMonthly.values,
                         fill: false,
                         backgroundColor: "#2f4860",
                         borderColor: "#2f4860",
                         tension: 0.4,
                    },
               ],
          });
     });
     // const ratio = computed(() => {
     //      return reactive({
     //           labels: statisticsStore.labels,

     //           datasets: [
     //                {
     //                     label: "نسبة عدد العوائل المستلمة الى غير المستلمة",
     //                     data: [statisticsStore.records.ReceivedPortionToUnReceivedRatio.ratio],
     //                     fill: false,
     //                     backgroundColor: "#2f4860",
     //                     borderColor: "#2f4860",
     //                     tension: 0.4,
     //                },
     //           ],
     //      });
     // });

     const oldAndNewCardsCount = computed(() => {
          const documentStyle = getComputedStyle(document.body);
          return reactive({
               labels: statisticsStore.records.oldAndNewCardsCount.labels,
               datasets: [
                    {
                         label: "بطاقة",
                         data: statisticsStore.records.oldAndNewCardsCount.values,
                         backgroundColor: [
                              documentStyle.getPropertyValue("--gray-500"),
                              documentStyle.getPropertyValue("--cyan-500"),
                         ],
                         hoverBackgroundColor: [
                              documentStyle.getPropertyValue("--gray-400"),
                              documentStyle.getPropertyValue("--cyan-400"),
                         ],
                    },
               ],
          });
     });
     const recievedAndUnRecievedCount = computed(() => {
          const documentStyle = getComputedStyle(document.body);
          return reactive({
               labels: statisticsStore.labels,
               datasets: [
                    {
                         label: "حصص  مستلمة ",
                         backgroundColor: documentStyle.getPropertyValue("--cyan-500"),
                         borderColor: documentStyle.getPropertyValue("--cyan-500"),
                         data: statisticsStore.records.personsReceivedPortionCount,
                         tension: 0.4,
                    },
                    {
                         label: "حصص غير مستلمة ",
                         backgroundColor: documentStyle.getPropertyValue("--gray-500"),
                         borderColor: documentStyle.getPropertyValue("--gray-500"),
                         data: statisticsStore.records.personsDidNotReceivedPortionCount,
                         tension: 0.4,
                    },
               ],
          });
     });

     const { isDarkTheme } = useLayout();

     const lineOptions = ref(null);

     const pieOptions = ref({
          plugins: {
               datalabels: {
                    display: true,
                    color: "black", // Set the color of the data labels
                    formatter: function (value) {
                         return value + "%"; // Add percentage sign to data labels
                    },
               },
               legend: {
                    labels: {
                         display: true,
                         color: "#495057",
                    },
                    datalabels: {
                         display: true,
                         color: "black", // Set the color of the data labels
                         formatter: function (value) {
                              return value + "%"; // Add percentage sign to data labels
                         },
                    },
               },
          },
     });

     const applyLightTheme = () => {
          lineOptions.value = {
               plugins: {
                    datalabels: {
                         display: true,
                         color: "black", // Set the color of the data labels
                         formatter: function (value) {
                              return value + "%"; // Add percentage sign to data labels
                         },
                    },
                    legend: {
                         labels: {
                              display: true,
                              color: "#495057",
                         },
                    },
               },
               scales: {
                    x: {
                         ticks: {
                              color: "#495057",
                         },
                         grid: {
                              color: "#ebedef",
                         },
                         scaleLabel: {
                              display: true,
                         },
                    },
                    y: {
                         ticks: {
                              color: "#495057",
                         },
                         grid: {
                              color: "#ebedef",
                         },
                         scaleLabel: {
                              display: true,
                         },
                    },
               },
          };
     };

     const applyDarkTheme = () => {
          lineOptions.value = {
               plugins: {
                    datalabels: {
                         display: true,
                         color: "black", // Set the color of the data labels
                         formatter: function (value) {
                              return value + "%"; // Add percentage sign to data labels
                         },
                    },
                    legend: {
                         labels: {
                              display: true,
                              color: "#ebedef",
                         },
                    },
               },
               scales: {
                    x: {
                         ticks: {
                              color: "#ebedef",
                         },
                         grid: {
                              color: "rgba(160, 167, 181, .3)",
                         },
                         scaleLabel: {
                              display: true,
                         },
                    },
                    y: {
                         ticks: {
                              color: "#ebedef",
                         },
                         grid: {
                              color: "rgba(160, 167, 181, .3)",
                         },
                         scaleLabel: {
                              display: true,
                         },
                    },
               },
          };
     };

     watch(
          isDarkTheme,
          (val) => {
               if (val) {
                    applyDarkTheme();
               } else {
                    applyLightTheme();
               }
          },
          { immediate: true },
          filter,
          {
               handler() {
                    this.GetRecords();
               },
               deep: true,
          }
     );
</script>
<style scoped>
     .flexCard {
          display: flex;
          flex-direction: column;
          align-items: center;
     }
     .card {
          height: 100%;
     }
</style>
