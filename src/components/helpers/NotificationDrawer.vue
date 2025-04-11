<template>
  <Drawer
    v-model:visible="visible"
    @update:visible="onChangeVisibility"
    position="bottom"
    style="height: auto"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <span :class="[icon,' text-font-main-color']" style="font-size: 2.5rem" ></span>
        <p class="font-bold text-font-main-color font-Signika text-lg">{{ message }}</p>
      </div>
    </template>

    <!-- <template #footer>
        <div class="flex items-center gap-2">
            <Button label="Account" icon="pi pi-user" class="flex-auto" outlined></Button>
            <Button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text></Button>
        </div>
    </template> -->
  </Drawer>
</template>

<script setup>
import { computed, ref } from "vue";

import store from "../../vuex/store";



const visible = computed( {
  get: () => {

   return store.state.drawerNotification.visible;
  },
  set: (value) => {
    if (!value) {
      store.commit("HIDE_DRAWER_NOTIFICATION");
    }
  }
});

 const message=computed(()=>store.state.drawerNotification.message)
 const icon=computed(()=>store.state.drawerNotification.icon)

const onChangeVisibility = (value) => {
  if (!value) {
    store.commit("HIDE_DRAWER_NOTIFICATION");
  }
};
</script>
