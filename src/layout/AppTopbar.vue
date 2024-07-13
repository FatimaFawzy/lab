<script setup>
     import { ref, onMounted, onBeforeUnmount } from "vue";
     import { useLayout } from "@/layout/composables/layout";

     const { onMenuToggle, layoutConfig, changeThemeSettings } = useLayout();

     const outsideClickListener = ref(null);
     const topbarMenuActive = ref(false);

     onMounted(() => {
          bindOutsideClickListener();
     });

     onBeforeUnmount(() => {
          unbindOutsideClickListener();
     });

     const onChangeTheme = (theme, mode) => {
          const elementId = "theme-css";
          const linkElement = document.getElementById(elementId);
          const cloneLinkElement = linkElement.cloneNode(true);
          const newThemeUrl = linkElement.getAttribute("href").replace(layoutConfig.theme.value, theme);
          cloneLinkElement.setAttribute("id", elementId + "-clone");
          cloneLinkElement.setAttribute("href", newThemeUrl);
          cloneLinkElement.addEventListener("load", () => {
               linkElement.remove();
               cloneLinkElement.setAttribute("id", elementId);
               changeThemeSettings(theme, mode === "dark");
          });
          linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
     };

     const bindOutsideClickListener = () => {
          if (!outsideClickListener.value) {
               outsideClickListener.value = (event) => {
                    if (isOutsideClicked(event)) {
                         topbarMenuActive.value = false;
                    }
               };
               document.addEventListener("click", outsideClickListener.value);
          }
     };
     const unbindOutsideClickListener = () => {
          if (outsideClickListener.value) {
               document.removeEventListener("click", outsideClickListener);
               outsideClickListener.value = null;
          }
     };
     const isOutsideClicked = (event) => {
          if (!topbarMenuActive.value) return;

          const sidebarEl = document.querySelector(".layout-topbar-menu");
          const topbarEl = document.querySelector(".layout-topbar-menu-button");

          return !(
               sidebarEl.isSameNode(event.target) ||
               sidebarEl.contains(event.target) ||
               topbarEl.isSameNode(event.target) ||
               topbarEl.contains(event.target)
          );
     };
</script>

<template>
     <div class="layout-topbar flex justify-content-between">
          <div class="flex justify-content-between">
               <router-link to="/" class="layout-topbar-logo">
                    <img src="/favicon.ico" alt="logo" />
                    <span class="text-sm md:text-xl">lab</span>
               </router-link>

               <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
                    <i class="pi pi-bars"></i>
               </button>
          </div>
          <div class="gap-2 flex justify-content-center align-items-center">
               <div class="flex hidden md:block">
                    <Button
                         v-if="layoutConfig.theme.value === 'lara-light-indigo'"
                         icon="pi pi-moon"
                         @click="onChangeTheme('lara-dark-indigo', 'dark')"
                         text></Button>
                    <Button v-else icon="pi pi-sun" @click="onChangeTheme('lara-light-indigo', 'light')" text></Button>
               </div>
               <span class="text-xl">{{ User?.name }}</span>
               <i class="pi pi-user"></i>
          </div>
     </div>
</template>

<style lang="scss" scoped></style>
