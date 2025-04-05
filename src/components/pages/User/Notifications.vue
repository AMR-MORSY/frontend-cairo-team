<template>
  <div class="container mt-20" v-if="notifications.length > 0">
    <div class="header">
      <h1 class="font-extrabold text-font-main-color font-Signika text-lg">
        Notifications
      </h1>
      <div class="actions">
        <button
          class="btn btn-primary"
          @click.prevent="markAllNotificationAsRead"
        >
          Mark all as read
        </button>
        <button
          class="btn btn-secondary"
          @click.prevent="clearAllNotifications"
        >
          Clear All
        </button>
      </div>
    </div>

    <div class="notification-list">
      <!-- Unread Notification Example -->
      <div
        :class="[
          notification.read_at == null ? 'unread' : '',
          'notification-item',
        ]"
        v-for="notification in notifications"
        :key="notification.id"
      >
        <div class="notification-icon">
          <i class="pi pi-bell"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">{{ notification.data.title }}</div>
          <div class="notification-message">
            <!-- You have received a new message from John Doe regarding your recent
            project submission. -->
            {{ notification.data.slug }}
          </div>
          <div class="notification-meta">
            <span class="notification-time"
              ><i class="pi pi-clock"></i> {{ notification.created_at }}</span
            >
            <div class="notification-actions">
              <button
                class="action-btn"
                @click.prevent="markAsRead(notification)"
              >
                Mark as read
              </button>
              <!-- <button
                class="action-btn"
                @click.prevent="goToViewNotification(notification)"
                @click="toggle"
              >
                View
              </button> -->
              <button
                class="action-btn"
                @click="toggle($event, notification)"
                :value="notification"
              >
                View
              </button>
              <button
                class="action-btn"
                @click.prevent="clearNotification(notification)"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <Popover ref="op">
        <div class="notification" v-if="selectedNotification">
          <div class="notification-header">
            <h2 class="notification-title">
              {{ selectedNotification.data.title }}
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
              {{ selectedNotification.data.message }}
            </p>
            <a
              v-if="selectedNotification.data.link"
              :href="selectedNotification.data.link"
              class="notification-link"
              >View Details</a
            >
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
    <h3 class="no-notifications-title">No notifications yet</h3>
    <p class="no-notifications-message">
      When you have new notifications, they'll appear here. Check back later or
      explore other sections.
    </p>
    <a href="#" class="action-button">Explore More</a>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import User from "../../../apis/User";
import store from "../../../vuex/store";

import { computed } from "vue";

const notificationArray = ref([]);
const notifications = computed(() => notificationArray.value);

const op = ref();

const totalRecords = ref(0);
const perPage = ref(5);
const first = ref(0);
const page = ref(1);
const currentPage = ref(1);

const selectedNotification = ref();
const toggle = (event, notification = null) => {
  if (notification != null) {
    selectedNotification.value = notification;
  }

  // selectedNotification.value=event
  op.value.toggle(event);
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
  notificationArray.value = [];
  notificationsArray.forEach((element) => {
    element.created_at = formatDate(element.created_at);
    notificationArray.value.push(element);
  });
};

const onPageChange = (event) => {
  console.log(event);
  first.value = event.first;
  perPage.value = event.rows;
  page.value = Math.floor(event.first / event.rows) + 1;

  getUserNotifications();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getUserNotifications = () => {
  User.userNotifications(page.value, perPage.value).then((response) => {
    console.log(response);
    totalRecords.value = response.data.notifications.total;
    currentPage.value = response.data.notifications.current_page;

    if (
      response.data.notifications.data.length === 0 && //////if the received array of the current page is empty and the current page value that comes from the server is greater than 1, we have to go down to the previous page and call the method again to receive the data of this page
      currentPage.value > 1
    ) {
      // Go to previous page
      page.value = currentPage.value - 1;
      first.value = (page.value - 1) * perPage.value; ////////this will point at the previous page
      getUserNotifications(page.value);
      store.dispatch("userNotifications", response.data.notifications.total);
      var user = JSON.parse(sessionStorage.getItem("User"));
      user.notifications = response.data.notifications.total;
      sessionStorage.setItem("User", JSON.stringify(user));

      formatNotificationsDateAndFillNotificationsArray(
        response.data.notifications.data
      );
    } else {
      store.dispatch("userNotifications", response.data.notifications.total);
      var user = JSON.parse(sessionStorage.getItem("User"));
      user.notifications = response.data.notifications.total;
      sessionStorage.setItem("User", JSON.stringify(user));

      formatNotificationsDateAndFillNotificationsArray(
        response.data.notifications.data
      );
    }
  });
};

const markAsRead = (notification) => {
  if (notification.read_at == null) {
    User.markNotificationAsRead(notification.id).then((response) => {
      console.log(response);
      if (response.data.message == "success") {
        // formatNotificationsDateAndFillNotificationsArray(
        //   response.data.notifications
        // );
        getUserNotifications();
      }
    });
  }
};

const markAllNotificationAsRead = () => {
  User.markAllNotificationAsRead().then((response) => {
    if (response.data.message == "success") {
      // formatNotificationsDateAndFillNotificationsArray(
      //   response.data.notifications
      // );
      getUserNotifications();
    }
  });
};

const clearNotification = (notification) => {
  User.deleteNotification(notification.id).then((response) => {
    if (response.data.message == "success") {
      store.dispatch("userNotifications", response.data.notifications.total);
      var user = JSON.parse(sessionStorage.getItem("User"));
      user.notifications = response.data.notifications.total;
      sessionStorage.setItem("User", JSON.stringify(user));
      getUserNotifications();

      // formatNotificationsDateAndFillNotificationsArray(
      //   response.data.notifications
      // );
    }
  });
};

const clearAllNotifications = () => {
  User.clearAllNotifications().then((response) => {
    if (response.data.message == "success") {
      // store.dispatch("userNotifications", response.data.notifications.total);
      // var user = JSON.parse(sessionStorage.getItem("User"));
      // user.notifications = response.data.notifications.total;
      // sessionStorage.setItem("User", JSON.stringify(user));
      getUserNotifications();
      // formatNotificationsDateAndFillNotificationsArray(
      //   response.data.notifications
      // );
    }
  });
};

onMounted(() => {
  getUserNotifications();
});
</script>

<style>
:root {
  --primary-color: #4285f4;
  --secondary-color: #f1f3f4;
  --text-color: #202124;
  --light-text: #5f6368;
  --border-color: #dadce0;
  --unread-bg: #f8f9fa;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
}

body {
  background-color: #f8f9fa;
  color: var(--text-color);
}

.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 15px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #3367d6;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: var(--text-color);
}

.btn-secondary:hover {
  background-color: #e8eaed;
}

.notification-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.notification-item {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: background-color 0.2s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: var(--secondary-color);
}

.notification-item.unread {
  background-color: var(--unread-bg);
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primary-color);
  font-size: 18px;
}

.notification-content {
  flex-grow: 1;
}

.notification-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.notification-message {
  color: var(--light-text);
  font-size: 14px;
  margin-bottom: 6px;
  line-height: 1.4;
}

.notification-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--light-text);
}

.notification-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.notification-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  color: var(--light-text);
  cursor: pointer;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.action-btn:hover {
  background-color: #e8eaed;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--light-text);
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--secondary-color);
}

.empty-state h3 {
  margin-bottom: 8px;
  font-weight: 500;
}

.no-notifications-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.no-notifications-icon {
  font-size: 48px;
  margin-bottom: 20px;
  color: #d1d5db;
}

.no-notifications-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}

.no-notifications-message {
  font-size: 16px;
  margin-bottom: 20px;
  max-width: 400px;
}

.action-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-button:hover {
  background-color: #e0e0e0;
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .actions {
    width: 100%;
    justify-content: space-between;
  }

  .btn {
    flex-grow: 1;
    text-align: center;
  }
}
</style>
