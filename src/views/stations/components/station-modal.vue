<template>
     <Dialog v-model:visible="dialog" modal :header="record.id ? 'تعديل' : 'اضافة'" :style="{ width: '50rem' }">
          <form @submit.prevent="record.id ? update() : create()" class="border-top-1 border-bluegray-100">
               <div class="grid mt-1">
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">اسم المحطة</label>
                         <InputText class="w-full" required v-model="record.name" />
                    </div>

                    <!-- <div class="col-6 pb-0">
                         <label class="block text-md mb-2">رقم الحساب</label>
                         <InputText class="w-full" required v-model="record.accountNumber" />
                    </div> -->
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">Merchant ID</label>
                         <InputText class="w-full" required v-model="record.locationNumber" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">Terminal Id</label>
                         <InputText class="w-full" v-model="record.terminalId" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">نوع المحطة</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.type"
                              :options="StationType.asList()"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">المحافظة</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.govId"
                              :options="cities()"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
                    <!-- <div v-if="record.govId" class="col-6 pb-0">
                         <label class="block text-md mb-2">الفرع</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.branchId"
                              :options="branches()"
                              optionLabel="label"
                              optionValue="value" />
                    </div> -->
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">القطاع</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.sectorId"
                              :options="Sectors"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
                    <!-- <div v-if="record.govId" class="col-6 pb-0">
                         <label class="block text-md mb-2">المنطقة</label>
                         <Dropdown
                              required
                              filter
                              class="w-full"
                              v-model="record.districtId"
                              :options="districts(record.govId)"
                              optionLabel="label"
                              optionValue="value" />
                    </div> -->
               </div>
               <div class="flex justify-content-end gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
                    <Button size="small" label="الغاء" severity="danger" @click="close()"></Button>
                    <Button size="small" type="submit" label="حفظ" severity="success"></Button>
               </div>
          </form>
     </Dialog>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useStationsStore } from "@/store/modules/stations";
     import { StationType } from "@/enums";
     import { useCitiesStore } from "@/store/modules/cities";
     import { useBranchesStore } from "@/store/modules/branches";
     import { useSectorStore } from "@/store/modules/sectors";

     export default {
          computed: {
               ...mapWritableState(useStationsStore, ["record", "updateRecord", "dialog"]),
               ...mapWritableState(useCitiesStore, ["cities", "districts"]),
               ...mapWritableState(useBranchesStore, ["branches"]),
               ...mapWritableState(useSectorStore, ["Sectors", "totalCount"]),
               StationType() {
                    return StationType;
               },
          },

          methods: {
               ...mapActions(useStationsStore, ["AddRecord", "UpdateRecord"]),
               ...mapActions(useBranchesStore, {
                    GetBranches: "GetRecords",
               }),
               create() {
                    this.AddRecord().then(() => {
                         this.dialog = false;
                         this.alertSuccess("تمت الاضافة بنجاح");
                         this.clearObjectValues(this.record);
                    });
               },
               update() {
                    this.UpdateRecord().then(() => {
                         this.dialog = false;
                         this.alertSuccess("تم التعديل بنجاح");
                         this.clearObjectValues(this.record);
                    });
               },
               close() {
                    this.dialog = false;
                    this.clearObjectValues(this.record);
               },
          },
          // watch: {
          //      "record.govId": function (v) {
          //           if (v) {
          //                this.GetBranches(v);
          //           }
          //      },
          //      "record.districtId": function (v) {
          //           if (v && !this.record.id) {
          //                let selectedBranch = this.records.find((x) => x.id === this.record.branchId);
          //                let selectedDistrict = selectedBranch.districts.find((x) => x.id === v);
          //                if (selectedDistrict) {
          //                     this.suplimentsName = selectedDistrict.name;
          //                     this.suplimentsNumber = selectedDistrict.rcNo;
          //                }
          //           }
          //      },
          // },
     };
</script>
