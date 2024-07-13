<template>
     <button class="btn-style pointer dropdown-item" @click="printMenu()">طباعة التقرير</button>
     <div class="d-none" id="bill">
          <div class="continer-fluid" style="height: 100vh !important">
               <div class="row mt-0 p-2" dir="rtl">
                    <div class="col-12 mb-4 border-bottom text-center h-100">
                         <div class="row align-items-center">
                              <!-- <span class="col-4 text-right">
                                   <p class="p-0" *ngIf="station">اسم المحطة: {{ station?.name }}</p>
                                   <p class="p-0" *ngIf="station">رمز المحطة: {{ station?.stationCode }}</p>
                              </span> -->

                              <div class="col-4">
                                   <span class="col-4">
                                        <img class="w-3 h-3" src="../../../public/favicon.ico" alt="" />
                                        <!-- <img class="col-6" src="../../../../assets/OPDC-removebg-preview.png" alt="" /> -->
                                   </span>
                              </div>

                              <!-- <span class="col-4 text-left">
                                   <p class="p-0" @if="filter.c">
                                        من تاريخ:
                                        <span *ngIf="FromDateTime">
                                             {{ FromDateTime | date : " dd-MM-yyyy" : "" : "ar" }}
                                        </span>
                                   </p>
                                   <p class="p-0" *ngIf="!FromDateTime">من تاريخ: ----</p>

                                   <p class="p-0" *ngIf="ToDateTime">
                                        الى تاريخ:
                                        {{ ToDateTime ? (ToDateTime | date : "dd-MM-yyyy" : "" : "ar") : "" }}
                                   </p>
                                   <p class="p-0" *ngIf="!ToDateTime">
                                        الى تاريخ:
                                        <span>{{ date | date : "dd-MM-yyyy" : "" : "ar" }}</span>
                                   </p>
                              </span> -->
                         </div>
                    </div>

                    <div class="col-4 my-0">
                         <div class="card bg-primary o-hidden">
                              <div class="card-body p-0 pt-2">
                                   <div class="text-center">
                                        <p class="text-dark text-20 mb-0">مبلغ اللترات الكلي</p>
                                        <p class="text-dark text-18 line-height-1">
                                             {{ BillsSummary.totalAmount }}
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
                                             {{ BillsSummary.totalLiters }}
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
                                             {{ BillsSummary.totalTaxAmount }}
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
                                        <p class="text-dark text-20">عدد الحركات {{ BillsSummary.totalBillsCount }}</p>
                                        <p class="text-dark p-0 mt-2 text-20" style="margin-top: -10px !important">
                                             <span class="mx-1">
                                                  مبلغ
                                                  <span class="mx-1">
                                                       {{ BillsSummary.totalAmount }}
                                                  </span>
                                             </span>
                                             <span>/</span>
                                             <span class="mx-2" dir="rtl">{{ BillsSummary.totalLiters }} لتر</span>
                                        </p>
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
     import { useStationsStore } from "@/store/modules/stations";

     export default {
          computed: {
               ...mapWritableState(useStationsStore, ["BillsSummary", "filter"]),
          },

          methods: {
               ...mapActions(useStationsStore, ["GetBillsSummary"]),

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
                     @page {
                       size: landscape !important;
                      }
                     th, td {
                       border: 1px solid #202020
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

                    console.log(this.BillsSummary);
               },
               goBack() {
                    window.history.back();
               },
          },
          mounted() {
               console.log(this.filter);
               //    this.GetRecords({
               //         startDate: this.$route.params.start,
               //         endDate: this.$route.params.end,
               //    }).then(() => {
               //         this.$nextTick(() => {
               //              window.print();
               //         });
               //    });
          },
     };
</script>
<!-- <script>

     @Component({
       selector: "app-print-dashboard",
       templateUrl: "./print-dashboard.component.html",
       styleUrls: ["./print-dashboard.component.scss"],
     })
     export class PrintDashboardComponent implements OnInit {
       @Input() takePage: any;
       @Input() pageNo: any;
       @Input() searchForm: any;
       @Input() statistics: any;
       @Input() station:any;
       @Input() FromDateTime: any;
       @Input() ToDateTime: any;


       bill: any;
       loaderData: boolean;
       date: any;
       companyInfo: any;
       dashboardStatcstics: any;
       transictions: any;
       totalItems: any;

       url = environment.url;

       tokenData: any;
       constructor(
         private jwtService: JwtHelperService,
       ) { }

       ngOnInit() {
         this.date = Date.now();

         this.tokenData = this.jwtService.decodeToken(localStorage.getItem("token"));
       }

       printMenu() {

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
                     @page {
                       size: landscape !important;
                      }
                     th, td {
                       border: 1px solid #202020
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


       }
     }
</script> -->
<style>
     .d-none {
          display: none;
     }
</style>
