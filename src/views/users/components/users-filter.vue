<template>
     <div class="grid filter mb-3">
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">الاسم</label>
               <InputText class="w-full" required v-model="filter.name" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">اسم المستخدم</label>
               <InputText class="w-full" required v-model="filter.username" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">رقم الهاتف</label>
               <InputText type="number" class="w-full" required v-model="filter.phoneNumber" @input="showIsFilter()" />
          </div>
          <div class="col-3 pb-0">
               <label class="block text-md mb-2">نوع الحساب</label>
               <Dropdown
                    required
                    class="w-full"
                    v-model="filter.Role"
                    :options="UserType.asList()"
                    optionLabel="label"
                    optionValue="value"
                    @change="showIsFilter()" />
          </div>
          <div class="col-3 pb-0" v-if="isfilter">
               <Button label="عرض جميع البيانات" severity="info" outlined @click="reset()" />
          </div>
     </div>
</template>
<script>
     import { mapActions, mapWritableState } from "pinia";
     import { useUsersStore } from "@/store/modules/users";
     import { useSharedStore } from "@/store/modules/shared";
     import { UserType } from "@/enums";
     export default {
          mounted() {
               this.isfilter = false;
          },
          computed: {
               UserType() {
                    return UserType;
               },
               ...mapWritableState(useUsersStore, {
                    filter: "filter",
               }),
               ...mapWritableState(useSharedStore, ["isfilter"]),
          },
          methods: {
               ...mapActions(useUsersStore, ["resetFilter"]),
               ...mapActions(useSharedStore, ["showIsFilter"]),
               reset() {
                    this.isfilter = false;

                    this.resetFilter();
               },
          },
     };
</script>
