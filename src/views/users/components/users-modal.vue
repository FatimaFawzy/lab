<template>
     <Dialog v-model:visible="dialog" modal :header="record.id ? 'تعديل' : 'اضافة'" :style="{ width: '50rem' }">
          <form @submit.prevent="record.id ? update() : create()" class="border-top-1 border-bluegray-100">
               <div class="grid mt-1">
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">الاسم</label>
                         <InputText class="w-full" required type="text" v-model="record.name" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">رقم الهاتف</label>
                         <InputText class="w-full" required type="number" v-model="record.phoneNumber" />
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">اسم المستخدم</label>
                         <InputText
                              class="w-full"
                              required
                              type="text"
                              :class="error !== '' ? 'border-error' : ''"
                              v-model="record.username"
                              @input="validateUsername" />
                         <span class="error" v-if="error">{{ error }}</span>
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">كلمة السر</label>
                         <Password
                              :required="!record.id"
                              class="w-full"
                              v-model="record.password"
                              :toggleMask="true"
                              inputClass="w-full"></Password>
                    </div>
                    <div class="col-6 pb-0">
                         <label class="block text-md mb-2">نوع الحساب</label>
                         <Dropdown
                              required
                              class="w-full"
                              v-model="record.role"
                              :options="UserType.asList()"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
                    <div class="col-6 pb-0" v-if="record.role == 3">
                         <label class="block text-md mb-2">المحطة</label>
                         <Dropdown
                              :virtualScrollerOptions="{
                                   lazy: true,
                                   onLazyLoad: onLazyLoad,
                                   itemSize: 40,
                                   showLoader: false,
                              }"
                              class="w-full"
                              v-model="record.stationId"
                              :options="stations"
                              optionLabel="label"
                              optionValue="value" />
                    </div>
               </div>
               <div class="flex justify-content-end gap-2 border-top-1 border-bluegray-100 mt-3 pt-3">
                    <Button size="small" label="الغاء" severity="danger" @click="close()"></Button>
                    <Button
                         size="small"
                         :disabled="error !== ''"
                         type="submit"
                         :label="record.id ? 'حفظ' : 'اضافة'"
                         severity="success"></Button>
               </div>
          </form>
     </Dialog>
</template>

<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useUsersStore } from "@/store/modules/users";
     import { useStationsStore } from "@/store/modules/stations";

     import { UserType } from "@/enums";

     export default {
          data() {
               return {
                    isStationLoaded: false,
                    error: "",
               };
          },
          computed: {
               UserType() {
                    return UserType;
               },
               ...mapWritableState(useStationsStore, ["stations"]),
               ...mapWritableState(useUsersStore, ["record", "dialog"]),
          },
          mounted() {
               this.GetStations();
          },
          methods: {
               ...mapActions(useUsersStore, ["AddRecord", "UpdateRecord"]),
               ...mapActions(useStationsStore, {
                    GetStations: "GetRecords",
               }),
               validateUsername() {
                    const regex = /^[a-zA-Z._-]+$/;
                    if (!regex.test(this.record.username)) {
                         this.error = "اسم المستخدم يحتوي فقط على الاحرف الانكليزية و الرموز ( - _  .)";
                    } else {
                         this.error = "";
                    }
               },
               onLazyLoad() {
                    if (!this.isStationLoaded) {
                         this.GetStations(true);
                    }
                    this.isStationLoaded = true;
               },

               create() {
                    this.validateUsername();
                    if (!this.error) {
                         this.AddRecord().then(() => {
                              this.dialog = false;
                              this.alertSuccess("تمت الاضافة بنجاح");
                              this.clearObjectValues(this.record);
                         });
                    } else {
                         this.error = "اسم المستخدم يحتوي فقط على الاحرف الانكليزية و الرموز ( - _  .)";
                    }
               },
               update() {
                    this.validateUsername();
                    if (!this.error) {
                         this.UpdateRecord().then(() => {
                              this.dialog = false;
                              this.alertSuccess("تم التعديل بنجاح");
                              this.clearObjectValues(this.record);
                         });
                    } else {
                         this.error = "اسم المستخدم يحتوي فقط على الاحرف الانكليزية و الرموز ( - _  .)";
                    }
               },
               close() {
                    this.dialog = false;
                    this.clearObjectValues(this.record);
               },
          },
     };
</script>
<style>
     .error {
          color: #d71d1d;
     }
     .border-error {
          border: 1px solid red;
     }
</style>
