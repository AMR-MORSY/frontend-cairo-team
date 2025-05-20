<template>
  <div class="container mt-20" v-if="site_notices.length > 0">
    <div class="header">
      <h1 class="font-extrabold text-font-main-color font-Signika text-lg">
        Notices
      </h1>
      <div class="actions">
        <button class="btn btn-primary" @click.prevent="createSiteNotice">
          Create New
        </button>
      </div>
    </div>

    <div class="notification-list">
      <div
        v-for="notice in site_notices"
        :key="notice.id"
        :class="[notice.is_solved == 'No' ? 'unread' : '', 'notification-item']"
      >
        <div class="notification-icon">
          <i class="pi pi-bell"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">{{ notice.title }}</div>

          <div class="notification-meta">
            <span class="notification-time"
              ><i class="pi pi-clock"></i> {{ notice.created_at }}</span
            >
            <div class="notification-actions">
              <p class="font-bold pt-1 pb-1 pl-2 pr-2">
                Type:<span class="text-blue-600">{{
                  notice.notice_type.name
                }}</span>
              </p>
              <p
                v-if="notice.is_solved == 'No'"
                class="text-red-600 pt-1 pb-1 pl-2 pr-2"
              >
                Not Solved
              </p>
              <p
                v-if="notice.is_solved == 'Yes'"
                class="text-green-600 pt-1 pb-1 pl-2 pr-2"
              >
                Solved
              </p>
              <button
                class="action-btn"
                @click="toggle($event, notice)"
                :value="notice"
              >
                View
              </button>

              <button class="action-btn" @click.prevent="updateNotice(notice)">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <Popover ref="op">
        <div class="notification" v-if="selectedNotice">
          <div class="notification-header">
            <h2 class="notification-title">
              {{ selectedNotice.title }}
            </h2>
            <!-- <span class="notification-slug">system-update-2023</span> -->
            <button
              class="close-btn"
              @click="toggle"
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
          <div class="notification-body">
            <p class="notification-message">
              {{ selectedNotice.description }}
            </p>
            <!-- <a
              v-if="selectedNotification.data.link"
              :href="selectedNotification.data.link"
              class="notification-link"
              >View Details</a
            > -->
          </div>
        </div>
      </Popover>
    </div>

    <div class="w-full flex justify-center my-4 px-2">
      <Paginator
        :rows="perPage"
        :totalRecords="totalRecords"
        v-model:first="first"
        :rowsPerPageOptions="[5, 10, 20, 30]"
        @page="onPageChange"
      ></Paginator>
    </div>
  </div>

  <div class="no-notifications-container mt-20" v-else>
    <div class="no-notifications-icon">
      <i class="pi pi-bell" style="font-size: 2rem"></i>
      <!-- Alternative icons: far fa-bell, far fa-inbox -->
    </div>
    <h3 class="no-notifications-title">No notices yet</h3>
    <p class="no-notifications-message">
      When you have new notices, they'll appear here. Check back later or
      explore other sections.
    </p>
    <div class="flex justify-center gap-4">
      <a href="#" class="action-button" @click="goBack">Back</a>
      <a href="#" class="action-button" @click="createSiteNotice">Create New</a>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import Sites from "../../../apis/Sites";
import { useRouter } from "vue-router";
import NoticeCreationForm from "../../helpers/Sites/NoticeCreationForm.vue";
import { useDialog } from "primevue/usedialog";
import { onMounted } from "vue";
const dialog = useDialog();
const props = defineProps(["site_code"]);
const site_notices = ref([]);
const router = useRouter();

const op = ref();
const totalRecords = ref(0);
const perPage = ref(5);
const first = ref(0);
const page = ref(1);
const currentPage = ref(1);

const goBack = () => {
  router.back();
};
const formatDate = (datetimeString) => {
  const date = new Date(datetimeString);

  return date.toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

const formatNotificationsDateAndFillNotificationsArray = (
  notificationsArray
) => {
  site_notices.value = [];
  notificationsArray.forEach((element) => {
    element.created_at = formatDate(element.created_at);
    site_notices.value.push(element);
  });
};

const onPageChange = (event) => {
  console.log(event);
  first.value = event.first;
  perPage.value = event.rows;
  page.value = Math.floor(event.first / event.rows) + 1;

  getSiteNotices();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const selectedNotice = ref();
const toggle = (event, notice = null) => {
  if (notice != null) {
    selectedNotice.value = notice;
  }

  op.value.toggle(event);
};

watch(
  () => props.site_code,
  () => getSiteNotices()
); /////////////////////////the right way of writing watch

const getSiteNotices = () => {
  Sites.siteNotices(props.site_code, page.value, perPage.value)
    .then((response) => {
      console.log(response);
      totalRecords.value = response.data.notices.total;
      currentPage.value = response.data.notices.current_page;

      if (
        response.data.notices.data.length === 0 && //////if the received array of the current page is empty and the current page value that comes from the server is greater than 1, we have to go down to the previous page and call the method again to receive the data of this page
        currentPage.value > 1
      ) {
        // Go to previous page
        page.value = currentPage.value - 1;
        first.value = (page.value - 1) * perPage.value; ////////this will point at the previous page
        getSiteNotices();

        formatNotificationsDateAndFillNotificationsArray(
          response.data.notices.data
        );
      } else {
        formatNotificationsDateAndFillNotificationsArray(
          response.data.notices.data
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  getSiteNotices();
});
const createSiteNotice = () => {
  dialog.open(NoticeCreationForm, {
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
      action: "Insert",
      site_code: props.site_code,
    },
    onClose: () => {
      window.location.reload();
    },
  });
};
const updateNotice = (notice) => {
  dialog.open(NoticeCreationForm, {
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
      rowData: notice,
      action: "Update",
      site_code: props.site_code,
    },
    onClose: () => {
      window.location.reload();
    },
  });
};
</script>

<style scoped></style>
