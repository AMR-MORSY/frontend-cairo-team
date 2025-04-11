// import Vuex, { mapActions } from "vuex";
import { toRaw, ref } from "vue";
import { createStore } from "vuex";
const store = createStore({
  state: {
    userData: JSON.parse(sessionStorage.getItem("User")),
    NUR: null,
   
    displaySpinnerPage: true,
   
    siteAlarms: null,
    
    permissions: [],
   
    drawerNotification:{
      visible:false,
      message:null,
      icon:null
    },
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
    
    SITE_ALARMS(state, alarms) {
      state.siteAlarms = alarms;
    },
   
    USER_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    },
   
    SHOW_DRAWER_NOTIFICATION(state,payload)
    {
    
      state.drawerNotification={
        ...state.drawerNotification,visible:true,...payload
      }
    },
    HIDE_DRAWER_NOTIFICATION(state,payload)
    {
      state.drawerNotification.visible=false
    }
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
  
    siteAlarms({ commit }, alarms) {
      commit("SITE_ALARMS", alarms);
    },
   
    showDrawerNotification({commit},payload)
    {
      commit ('SHOW_DRAWER_NOTIFICATION',payload)
    },
    hideDrawerNotification({commit})
    {
      commit("HIDE_DRAWER_NOTIFICATION")
    }
    
  },
});
export default store;
