<template>
  <!-- <div class=" px-2 flex justify-center items-center w-svw h-svh "> -->
    <div class="notification">
      <div class="notification-header">
        <h2 class="notification-title">Important System Update</h2>
        <!-- <span class="notification-slug">system-update-2023</span> -->
        <button class="close-btn" aria-label="Close notification">
          &times;
        </button>
      </div>
      <div class="notification-body">
        <p class="notification-message">
          We'll be performing scheduled maintenance this Saturday from 2:00 AM
          to 4:00 AM EST. During this time, the service may be temporarily
          unavailable. We apologize for any inconvenience.
        </p>
        <a href="https://example.com/system-updates" class="notification-link"
          >View Details</a
        >
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["notification_id"]);
</script>

<style>
.notification {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.notification:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.notification-header {
  padding: 16px 20px;
  background-color:  #673EE6;
  color: white;
  position: relative;
}

.notification-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  padding-right: 30px;
}

.notification-slug {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
}

.notification-body {
  padding: 20px;
  line-height: 1.5;
  color: #333;
}

.notification-message {
  margin: 0 0 20px 0;
}

.notification-link {
  display: inline-block;
  padding: 10px 16px;
  background-color: #673EE6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.notification-link:hover {
  background-color: #3a5bef;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.close-btn:hover {
  opacity: 1;
}
</style>
