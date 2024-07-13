<script setup>
     import { ref } from "vue";

     import AppMenuItem from "./AppMenuItem.vue";

     const model = ref([
          {
               // label: "Home",
               items: [
                    {
                         label: "dashboard",
                         icon: "pi pi-fw pi-th-large",
                         to: "/dashboard",
                         roles: ["User", "Admin", "InquiryEmployee"],
                    },

                    {
                         label: "تسجيل الخروج",
                         icon: "pi pi-fw pi-sign-out",
                         to: "/logout",
                    },
               ],
          },
     ]);
</script>

<template>
     <ul class="layout-menu">
          <template v-for="(item, i) in model" :key="item">
               <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
               <li v-if="item.separator" class="menu-separator"></li>
          </template>
     </ul>
</template>

<style lang="scss" scoped></style>
