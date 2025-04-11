<template>
  <navbar
    v-if="!$route.meta.hideNavbar"
    @displaySitesTable="displaySitesTable"
    :backgroundWhite="whiteBackground"
  >
  </navbar>
  <router-view></router-view>

  <DynamicDialog />
  <ConfirmDialog group="yesNo">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div
        class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded"
      >
        <div
          class="rounded-full bg-white text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20"
        >
          <i class="pi pi-question text-5xl font-extrabold"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-6">{{
          message.header
        }}</span>
        <p class="mb-0 font-semibold text-xl">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-6">
          <Button
            :severity="message.rejectProps.severity"
            :label="message.rejectProps.label"
            :icon="message.rejectProps.icon"
            raised
            @click="rejectCallback"
          ></Button>
          <Button
            :severity="message.acceptProps.severity"
            :label="message.acceptProps.label"
            :icon="message.acceptProps.icon"
            raised
            @click="acceptCallback"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>

  <ConfirmDialog group="info">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div
        class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded"
      >
        <div
          class="rounded-full bg-white text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20"
        >
          <i :class="message.icon" class="!text-6xl text-primary-500"></i>
        </div>

        <span
          class="font-extrabold text-2xl text-red-700 font-Signika block mb-2 mt-6"
          >{{ message.header }}</span
        >

        <p class="mb-0 text-xl text-font-main-color font-Signika font-semibold">
          {{ message.message }}
        </p>
        <div class="flex items-center gap-2 mt-6">
          <Button
            :severity="message.acceptProps.severity"
            :label="message.acceptProps.label"
            raised
            @click="acceptCallback"
          />
        </div>
      </div>
    </template>
  </ConfirmDialog>

  <SpinnerPage
    :displayNone="displaySpinnerPage"
    style="z-index: 10000000000"
  ></SpinnerPage>

  <!-- <UnauthenticatedToast></UnauthenticatedToast> -->
  <!-- <NetworkErrorToast
    :message="showNetworkNotificationsToast"
  ></NetworkErrorToast> -->

  <NotificationDrawer />
  <Toast
    position="bottom-right"
    :breakpoints="{ '480px': { width: '80%', margin: 'auto' } }"
  />

  

  <Toast position="bottom-center" group="headless">
    <template #message="slotProps">
      <div class="flex flex-col flex-auto w-full rounded-xl">
        <div class="flex items-center gap-2">
          <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
          <span class="font-semibold text-lg text-black">{{
            slotProps.message.summary
          }}</span>
        </div>
        <div class="font-normal my-4">
          {{ slotProps.message.detail }}
          <!-- Has created new modification action on site {{ slotProps.message.summary.site.site_code }}{{ slotProps.message.summary.site.site_name }} in {{ slotProps.message.summary.oz }} -->
        </div>
        <!-- <Button size="small" label="Reply" severity="success" @click="onReply()"></Button> -->
      </div>
    </template>
  </Toast>
</template>

<script>
import SpinnerPage from "../src/components/helpers/SpinnerPage.vue";
import navbar from "../src/components/navbar.vue";
import SitesTable from "../src/components/pages/sites/SitesTable.vue";

import NotificationDrawer from "./components/helpers/NotificationDrawer.vue";
import User from "./apis/User";
// import echo from "../src/apis/echo";

export default {
  components: {
    SpinnerPage,
    navbar,
    SitesTable,
    // UnauthenticatedToast,
    // NetworkErrorToast,
    NotificationDrawer
  },
  data() {
    return {
      // showModal: false,

      // data: "session will end after 2 minutes, renew session",
      whiteBackground: false,
      visible: false,
    };
  },
  watch: {
    $route() {
      this.$store.commit("HIDE_DRAWER_NOTIFICATION");//////////is used to hide the drawer if it exists for better customer experience
      if (this.$store.getters.isLogin) {
        User.userAbilities().then((response) => {
          let rules = [];
          if (response.data.permissions) {
            if (response.data.permissions.length > 0) {
              // console.log(response.data.permissions)
              response.data.permissions.forEach((element) => {
                let rule = {
                  action: element,
                };
                rules.push(rule);
              });
            }

            this.$ability.update(rules);
          }
        });
      }
    },
  },

  computed: {
    displaySpinnerPage() {
      return this.$store.state.displaySpinnerPage;
    },
    // displayDialog() {
    //   return this.$store.state.displayDialog;
    // },
    // dialogMessage() {
    //   return this.$store.state.dialogMessage;
    // },
    // showNetworkNotificationsToast() {
    //   if (this.$store.state.networkNotificationsToast != null) {
    //     return this.$store.state.networkNotificationsToast;
    //   }
    // },
    showNotificationDrawerMessage(){
      if (this.$store.state.drawerNotification != null) {
      
        return this.$store.state.drawerNotification;
      }
    }
  },
  name: "app",

  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.listenToPublicChannel();
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleScroll(event) {
      if (window.scrollY > 50) {
        this.whiteBackground = true;
      } else {
        this.whiteBackground = false;
      }
    },
    displaySitesTable(event) {
      this.$dialog.open(SitesTable, {
        props: {
          header: "Sites",
          style: {
            width: "75vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },
          modal: true,
        },

        data: {
          sites: event,
        },
      });
    },
    displayTheSpinner(event) {
      this.displaySpinnerPage = event;
    },

    handleModificationCreation(modification) {
      if (this.$store.getters.userId != modification.action_owner.id) {
        var owner = modification.action_owner.name;
        var details = `Has created new modification action on site ${modification.site.site_code}${modification.site.site_name} in ${modification.oz}.`;
        this.$toast.add({
          severity: "custom",
          summary: `${owner}`,
          detail: `${details}`,
          group: "headless",
          life: 7000,
          styleClass: "backdrop-blur-lg  rounded-2xl",
        });
        this.visible = true;
      }
    },
    listenToPublicChannel() {
      Echo.channel("modificationCreationChannel").listen(
        "ModificationCreated",
        (data) => {
          this.handleModificationCreation(data.modification);
        }
      );
    },
  },
};
</script>

<style lang="scss"></style>
