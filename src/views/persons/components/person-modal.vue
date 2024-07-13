<template>
     <Dialog v-model:visible="dialog" modal :header="record.id ? 'تعديل' : 'اضافة'" :style="{ width: '50rem' }">
          <form @submit.prevent="record.id ? update() : create()" class="border-top-1 border-bluegray-100">
               <div class="grid mt-1">
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">اسم رب الاسرة</label>
                         <InputText required class="w-full" type="text" v-model="record.familyName" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">رقم البطاقة التموينية</label>
                         <InputText required class="w-full" type="text" v-model="record.familyNumber" />
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
                    <div v-if="record.govId" class="col-6 pb-0">
                         <label class="block text-md mb-2">الفرع</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.branchId"
                              :options="branches()"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
                    <div v-if="record.branchId" class="col-6 pb-0">
                         <label class="block text-md mb-2">المنطقة</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.districtId"
                              :options="districts(record.branchId)"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
                    <div v-if="record.districtId && !this.record.id" class="col-6 pb-0">
                         <label class="block text-md mb-2">اسم مركز التموين</label>
                         <InputText disabled class="w-full" type="text" v-model="suplimentsName" />
                    </div>
                    <div v-if="record.districtId && !this.record.id" class="col-6 pb-0">
                         <label class="block text-md mb-2">رقم مركز التموين</label>
                         <InputText disabled class="w-full" type="text" v-model="suplimentsNumber" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">الوكيل</label>
                         <Dropdown
                              required
                              class="w-full"
                              @filter="searchAgents"
                              v-model="record.agentId"
                              :options="agents()"
                              optionLabel="label"
                              optionValue="value"
                              filter />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">نوع البطاقة</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.cardType"
                              :options="CardType.asList()"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">الملاحظة</label>
                         <InputText type="text" v-model="record.note" class="w-full" />
                    </div>
               </div>
               <div class="flex justify-content-end gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
                    <Button size="small" label="الغاء" severity="danger" @click="close()"></Button>
                    <Button size="small" type="submit" label="حفظ" severity="success"></Button>
               </div>
          </form>
     </Dialog>
</template>

<script>
     import { mapActions, mapGetters, mapWritableState } from "pinia";
     import { usePersonsStore } from "@/store/modules/persons";
     import { useBranchesStore } from "@/store/modules/branches";
     import { useCitiesStore } from "@/store/modules/cities";
     import { useAgentsStore } from "@/store/modules/agents";
     import { CardType } from "@/enums";

     export default {
          data() {
               return {
                    suplimentsName: "",
                    suplimentsNumber: "",
               };
          },
          computed: {
               CardType() {
                    return CardType;
               },
               ...mapGetters(useAgentsStore, ["agents"]),
               ...mapWritableState(useAgentsStore, {
                    agentsFilter: "filter",
               }),
               ...mapWritableState(useBranchesStore, ["branches", "districts", "records"]),
               ...mapWritableState(usePersonsStore, ["record", "dialog"]),
               ...mapWritableState(useCitiesStore, ["cities"]),
          },
          methods: {
               searchAgents({ value }) {
                    this.agentsFilter.name = value;
                    this.getAgents();
               },
               ...mapActions(useBranchesStore, {
                    GetBranches: "GetRecords",
               }),
               ...mapActions(useAgentsStore, { getAgents: "GetRecords" }),
               ...mapActions(usePersonsStore, ["AddRecord", "UpdateRecord"]),
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
          watch: {
               "record.govId": function (v) {
                    if (v) {
                         this.GetBranches(v);
                    }
               },
               "record.districtId": function (v) {
                    if (v && !this.record.id) {
                         let selectedBranch = this.records.find((x) => x.id === this.record.branchId);
                         let selectedDistrict = selectedBranch.districts.find((x) => x.id === v);
                         if (selectedDistrict) {
                              this.suplimentsName = selectedDistrict.name;
                              this.suplimentsNumber = selectedDistrict.rcNo;
                         }
                    }
               },
          },
     };
</script>
