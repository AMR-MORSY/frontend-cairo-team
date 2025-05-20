<template>
  <div
    class="card fixed top-0 left-0 right-0 xl:px-20 z-50"
    :class="whiteBackground ? 'bg-black' : ''"
    v-if="!$route.meta.hideNavbar"
  >
    <Menubar :model="items">
      <template #start>
        <a href="#" class="flex items-center mr-10 rtl:space-x-reverse">
          <img
            src="../assets/icons8-cairo-85.png"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-xl md:text-2xl lg:text-3xl font-semibold whitespace-nowrap dark:text-white text-font-main-color font-Signika"
            >Cairo Team</span
          >
        </a>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <template v-if="item.to">
          <router-link class="text-font-main-color font-Signika" :to="item.to">
            <a v-ripple class="flex items-center" v-bind="props.action">
              <span
                v-if="item.icon"
                class="border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
                :class="item.icon"
              >
              </span>
              <span>{{ item.label }}</span>

              <OverlayBadge
                :value="item.badgeValue"
                v-if="item.badge"
                class="m-2"
              >
                <i class="pi pi-bell" style="font-size: 1.5rem" />
              </OverlayBadge>
            </a>
          </router-link>
        </template>

        <template v-if="!item.to">
          <a class="flex items-center" v-bind="props.action">
            <span
              v-if="item.icon"
              class="block border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
              :class="item.icon"
            >
            </span>
            <span class="text-font-main-color font-Signika block">{{
              item.label
            }}</span>

            <i
              v-if="hasSubmenu"
              :class="[
                'pi pi-angle-down ml-auto',
                { 'pi-angle-down': root, 'pi-angle-right': !root },
              ]"
            ></i>
          </a>
        </template>
      </template>
      <template #end>
        <form @submit.prevent="submitSearch">
          <div>
            <InputGroup>
              <InputText
                placeholder="Search"
                type="text"
                fluid
                v-model="search"
              />
              <Button
                label="Search"
                severity="info"
                size="small"
                type="submit"
              />
            </InputGroup>
          </div>
        </form>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import User from "../apis/User";
import Sites from "../apis/Sites";
import { maxLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import SitesTable from "../components/pages/sites/SitesTable.vue";
import SearchTxIssuesForm from "../components/helpers/Transmission/SearchTxIssuesForm.vue";
import { Dropdown } from "flowbite";
import { initFlowbite } from "flowbite";
import { initDropdowns } from "flowbite";
import { computed, onMounted, ref, inject } from "vue";
import store from "../vuex/store";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useAbility } from "@casl/vue";
import { useRoute } from "vue-router";
import { ABILITY_TOKEN } from "@casl/vue";
const { can } = useAbility();

const search = ref();
const toast = useToast();
const dialog = useDialog();
const router = useRouter();
const route = useRoute();
const userName = computed(() => store.getters.userName);
const isLogin = computed(() => store.getters.isLogin);

const props = defineProps(["backgroundWhite"]);
const whiteBackground = computed(() => props.backgroundWhite);
const items = ref();

const $ability = inject(ABILITY_TOKEN);

onMounted(() => {
  initFlowbite();

  updateUserAbility();
});
const updateUserAbility = () => {
  if (store.getters.isLogin) {
    User.userAbilities().then((response) => {
      let rules = [];
      if (response.data.permissions) {
        if (response.data.permissions.length > 0) {
          response.data.permissions.forEach((element) => {
            let rule = {
              action: element,
            };
            rules.push(rule);
          });
        }
        console.log(rules);
        $ability.update(rules);
        // store.dispatch("userPermissions",rules);

        items.value = [
          ...(computed(() => store.getters.isLogin)
            ? [
                {
                  label: "Home",
                  to: "/home",
                },

                {
                  label: computed(() => store.getters.userName),
                },
                {
                  label: "Dashboard",
                  items: [
                    ...(can("read_NUR_data")
                      ? [
                          {
                            label: "NUR",
                            icon: "pi pi-server",
                            shortcut: "⌘+B",
                            to: "/nur",
                          },
                        ]
                      : []),
                    // ...(can("read_TX_data")
                    //   ? [
                    //       {
                    //         label: "Tx issues",
                    //         icon: "pi pi-search",
                    //         command: () => {
                    //           SearchTxIssues();
                    //         },
                    //       },
                    //     ]
                    //   : []),
                    ...(computed(() => store.getters.isLogin)
                      ? [
                          ...(can("read_Site_data")
                            ? [
                                {
                                  label: "Sites",
                                  icon: "pi pi-server",
                                  shortcut: "⌘+S",
                                  to: "/sites",
                                },
                              ]
                            : []),
                          ...(can("read_ENERGY_data")
                            ? [
                                {
                                  label: "Energy",
                                  icon: "pi pi-bolt",
                                  shortcut: "⌘+S",
                                  to: "/energy",
                                },
                              ]
                            : []),
                          ...(can("read_CS_modifications") ||
                          can("read_CN_modifications") ||
                          can("read_CE_modifications") ||
                          can("read_GZ_modifications")
                            ? [
                                {
                                  label: "Modifications",
                                  icon: "pi pi-pencil",
                                  shortcut: "⌘+U",
                                  to: "/modifications",
                                },
                              ]
                            : []),
                        ]
                      : []),
                    {
                      label: "Notices",
                      icon: "pi pi-server",
                      shortcut: "⌘+B",
                      to: "/sites/notices",
                    },
                  ],
                },
                {
                  label: "Logout",
                  command: () => {
                    logout();
                  },
                },
                {
                  // label: "Notifications",
                  // icon: "pi pi-bell",

                  badge: 5,
                  to: "/user/notifications",
                  badgeValue: computed(() => store.getters.notifications),
                },
              ]
            : []),
        ];
      }
    });
  }
};

const nameReg = helpers.regex(/^[a-zA-Z0-9 _-]{3,}$/);
const rules = computed(() => ({
  search: {
    required: helpers.withMessage("Email is required", required),
    maxLength: helpers.withMessage("Email is required", maxLength(50)),
    nameReg: helpers.withMessage(
      "please enter a valid site name or code",
      nameReg
    ),
  },
}));
const v$ = useVuelidate(rules, { search });

const submitSearch = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  // closeMenu()
  Sites.searchSites(search.value)
    .then((response) => {
      if (response.data.message == "No data Found") {
        toast.add({
          severity: "info",
          summary: "Sorry!!!",
          detail: "No data Found",
          life: 3000,
        });
      } else {
        dialog.open(SitesTable, {
          props: {
            style: {
              width: "50vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },

            modal: true,
          },

          data: {
            sites: response.data.sites,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status == 422) {
        toast.add({
          severity: "error",
          summary: "Opes!!!",
          detail: error.response.data.errors.search[0],
          life: 3000,
        });
      }
    });
};

const SearchTxIssues = () => {
  dialog.open(SearchTxIssuesForm, {
    props: {
      style: {
        width: "90vw",
      },

      modal: true,
    },
  });
};

const logout = () => {
  User.logout()
    .then((data) => {
      store.dispatch("userData", null);
      sessionStorage.removeItem("User");

      router.push({ path: "/welcome" });
    })
    .catch((error) => {});
};
</script>

<style lang="scss" scoped>
// .display_none {
//   display: none;
// }

// .display {
//   display: block;
// }

// .p-inputtext {
//   padding-top: 0.25rem;
//   padding-bottom: 0.25rem;
// }
</style>
