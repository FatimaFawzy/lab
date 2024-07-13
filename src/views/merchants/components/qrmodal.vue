<template>
     <Dialog v-model:visible="dialog" modal :header="record.name" :style="{ width: '60rem' }">
          <div class="border-top-1 border-bluegray-100">
               <div ref="qrcode" class="text-center">
                    <vue-qrcode :value="record.id" :options="{ width: 600 }"></vue-qrcode>
                    <div class="text-6xl font-medium -mt-2">شركة توزيع المنتجات النفطية</div>

                    <div class="mt-5 pb-4">
                         <div class="text-5xl font-medium mb-1">
                              {{ record.name }}
                         </div>
                         <div class="text-6xl font-medium mt-5">{{ record.subscription?.subscriptionNumber }}</div>
                    </div>
                    <div class="flex justify-content-center mt-2">
                         <img src="/qi-logo.png" width="120" height="60" />
                         <img class="-mt-2" src="/opdc.png" width="85" height="85" />
                         <img class="mx-5" src="/rafidain-bank.png" width="65" height="65" />
                    </div>
                    <div class="py-4 flex justify-content-center align-content-center gap-2">
                         <img class="-mt-1 border-round-2xl" src="/qi-service-logo.png" width="50" height="50" />
                         <div class="text-4xl font-medium">قم بمسح الكود لشراء الحصة النفطية</div>
                    </div>
               </div>
               <div class="flex justify-content-end gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
                    <Button size="small" label="الغاء" severity="danger" @click="dialog = false"></Button>
                    <Button size="small" @click="downloadPdf" label="حفظ" severity="success"></Button>
               </div>
          </div>
     </Dialog>
</template>

<script>
     import { mapWritableState } from "pinia";
     import { useMerchantsStore } from "@/store/modules/merchants";
     import html2canvas from "html2canvas";
     import { jsPDF } from "jspdf";

     export default {
          computed: {
               ...mapWritableState(useMerchantsStore, ["record", "dialog"]),
          },
          methods: {
               async downloadPdf() {
                    const image = this.$refs.qrcode;

                    // Render HTML element to canvas
                    const canvas = await html2canvas(image);

                    // Create PDF
                    const pdf = new jsPDF("p", "mm", "a4"); // Changed 'p' to 'l'
                    const imgData = canvas.toDataURL("image/jpeg");
                    const imgWidth = 210;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
                    pdf.save(this.record.name + ".pdf");
               },
          },
     };
</script>
