<template>
     <div
          class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
          <div class="flex flex-column align-items-center justify-content-center">
               <div
                    style="
                         border-radius: 56px;
                         padding: 0.3rem;
                         background: linear-gradient(180deg, #ffd900 10%, rgba(237, 23, 94, 0) 30%);
                    ">
                    <form
                         @submit="submit"
                         class="w-full surface-card pb-4 pt-3 px-5 sm:px-8"
                         style="border-radius: 53px">
                         <div class="text-center mb-4">
                              <img src="/favicon.ico" alt="Image" height="100" class="mb-3" />
                              <div class="text-900 text-3xl font-medium mb-3">lab</div>
                              <span class="text-600 font-medium">login</span>
                         </div>

                         <div>
                              <label class="block text-900 text-lg font-medium mb-2">user name</label>
                              <InputText
                                   required
                                   type="text"
                                   class="w-full md:w-30rem mb-3"
                                   style="padding: 1rem"
                                   v-model="username" />

                              <label class="block text-900 font-medium text-lg mb-2">password</label>
                              <Password
                                   dir="ltr"
                                   :feedback="false"
                                   required
                                   v-model="password"
                                   :toggleMask="true"
                                   class="w-full mb-3"
                                   inputClass="w-full"
                                   :inputStyle="{ padding: '1rem' }"></Password>

                              <Button
                                   style="background-color: #ffd900; border-color: #ffc800"
                                   type="submit"
                                   label="login"
                                   class="w-full text-gray-700 p-2 mt-3 text-lg"></Button>
                         </div>
                    </form>
               </div>
          </div>
          <loading v-if="isLoading" />
     </div>
</template>

<script>
     import { mapActions } from "pinia";
     import { useAuthStore } from "@/store/modules/auth";

     import loading from "@/components/loading.vue";

     export default {
          components: {
               loading,
          },
          data() {
               return {
                    username: "",
                    password: "",
                    isLoading: false,
               };
          },
          methods: {
               ...mapActions(useAuthStore, ["login"]),
               submit(e) {
                    e.preventDefault();
                    this.isLoading = true;
                    this.login({ username: this.username, password: this.password });
                    this.isLoading = false;
               },
          },
     };
</script>

<style scoped>
     .pi-eye {
          transform: scale(1.6);
          margin-right: 1rem;
     }

     .pi-eye-slash {
          transform: scale(1.6);
          margin-right: 1rem;
     }
</style>
