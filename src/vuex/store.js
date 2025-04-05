// import Vuex, { mapActions } from "vuex";
import { toRaw, ref } from "vue";
import { createStore } from "vuex";
const store = createStore({
  state: {
    userData: JSON.parse(sessionStorage.getItem("User")),
    NUR: null,
   
    displaySpinnerPage: true,
    showNetworkError: null,
    siteAlarms: null,
    displayDialog: false,
    dialogMessage: "",
    showUnauthenticatedToast: false,
    permissions: [],
  },
  getters: {
    isLogin(state) {
      return state.userData;
    },
    token(state) {
      if (state.userData) {
        let userToken = state.userData.token.plainTextToken;

        return userToken;
      } else {
        let userToken = null;

        return userToken;
      }
    },

    notifications(state) {
      if (state.userData) {
      return state.userData.notifications;
      }
      return 0;
    },

    userPermissions(state) {
      return state.permissions;
    },

    userName(state) {
      if (state.userData) {
        let userName = state.userData.user.name;

        return userName;
      } else {
        let userName = null;
        return userName;
      }
    },
    userId(state) {
      if (state.userData) {
        return state.userData.user.id;
      } else {
        return null;
      }
    },
    showUnauthenticatedToast(state) {
      return state.showUnauthenticatedToast;
    },
    showNetworkErrorToast(state) {
      if (state.showNetworkError) {
        setTimeout(() => store.dispatch("showNetworkError", null), 3000);
        return state.showNetworkError;
      }
      return null;
    },
  },
  mutations: {
    USER_DATA(state, user) {
      state.userData = user;
    },
    USER_Notifications(state, notifications) {
      state.userData.notifications = notifications;
    },

    CHANGE_TIME_OUT(state, status) {
      state.sessionTimeOut = status;
    },
    SET_NUR(state, nur) {
      state.NUR = nur;
    },
    DISPLAY_SPINNER(state, status) {
      state.displaySpinnerPage = status;
    },
    DISPLAY_NETWORKERRORTOAST(state, status) {
      state.showNetworkError = status;
    },
    SITE_ALARMS(state, alarms) {
      state.siteAlarms = alarms;
    },
    DISPLAY_DIALOG(state, status) {
      state.displayDialog = status;
    },
    DIALOG_MESSAGE(state, message) {
      state.dialogMessage = message;
    },
    SHOW_UNAUTH_TOAST(state, status) {
      state.showUnauthenticatedToast = status;
    },
    USER_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    },
  },
  actions: {
    userData({ commit }, user) {
      commit("USER_DATA", user);
    },
    userPermissions({ commit }, permissions) {
      commit("USER_PERMISSIONS", permissions);
    },
    userNotifications({ commit }, notifications) {
      commit("USER_Notifications", notifications);
    },
    setNUR({ commit }, NUR) {
      commit("SET_NUR", NUR);
    },
    displaySpinnerPage({ commit }, status) {
      commit("DISPLAY_SPINNER", status);
    },
    showNetworkError({ commit }, status) {
      commit("DISPLAY_NETWORKERRORTOAST", status);
    },
    siteAlarms({ commit }, alarms) {
      commit("SITE_ALARMS", alarms);
    },
    displayDialog({ commit }, status) {
      commit("DISPLAY_DIALOG", status);
    },
    dialogMessage({ commit }, message) {
      commit("DIALOG_MESSAGE", message);
    },
    showUnauthToast({ commit }, status) {
      commit("SHOW_UNAUTH_TOAST", status);
    },
  },
});
export default store;
