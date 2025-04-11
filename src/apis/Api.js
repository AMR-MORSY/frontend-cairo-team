import axios from "axios";
import router from "../router/index";
import store from "../vuex/store";
import { toastStore } from "../ToastStore/toastStore";
import { useToastStore } from "../ToastStore/toastStore";

import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;
let Api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

function unauthorizedUnauthintecatedErrorResponse(error) {
  if (error.response.status == 419 || error.response.status == 403) {
    showUnAuthToast();
    
  } else if (error.response.status == 401) {
    showUnauthintecatedToast();
  } else if (error.response.status == 404) {
    router.push({ name: "notFound" });
  } else if(error.response.status==503)
  {
    showMaintenanceModeNotification()

  }
}

function showMaintenanceModeNotification()
{
  store.dispatch('showDrawerNotification',{message:'We’re performing scheduled maintenance. Please check back later!"...',icon:'pi pi-calendar-plus'});
}
function showNetworkToast() {
 

 store.dispatch('showDrawerNotification',{message:'Network error......',icon:'pi pi-wifi'});
}
function showUnAuthToast() {
 

  store.dispatch('showDrawerNotification',{message:'You do not have the right permission......',icon:'pi pi-user'});
 }

function showUnauthintecatedToast() {
  // const toastLiveExample = document.getElementById("liveToast");
  // const toastBootstrap = new bootstrap.Toast(toastLiveExample);
  sessionStorage.removeItem("User");
  store.dispatch("userData", null);
  // store.dispatch("showUnauthToast", true);
  router.push({ path: "/user/login" });
  // toastBootstrap.show();
  // store.dispatch('showNetworkError','Unauthenticated');
  store.dispatch('showDrawerNotification',{message:'You are not allowed to access this data, please login first......',icon:'pi pi-user'});
}

Api.defaults.withCredentials = true;
Api.defaults.baseURL = import.meta.env.VITE_BASE_URL;

Api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getters.token}`;
  store.dispatch("displaySpinnerPage", false);
  return config;
});

Api.interceptors.response.use(
  function (response) {
    store.dispatch("displaySpinnerPage", true);

    return response;
  },
  function (error) {
    store.dispatch("displaySpinnerPage", true);
    if (!error.response) {
      showNetworkToast();
    } else {
      unauthorizedUnauthintecatedErrorResponse(error);
    }

    return Promise.reject(error);
  }
);

let downloadApi = axios.create({
  responseType: "blob",
  headers: {
    "Content-Type": "application/json",
  },
});
downloadApi.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getters.token}`;
  store.dispatch("displaySpinnerPage", false);
  return config;
});

downloadApi.defaults.withCredentials = true;
downloadApi.defaults.baseURL = import.meta.env.VITE_BASE_URL;
downloadApi.interceptors.response.use(
  function (response) {
    store.dispatch("displaySpinnerPage", true);
    return response;
  },
  function (error) {
    store.dispatch("displaySpinnerPage", true);
    if (!error.response) {
      showNetworkToast();
    } else {
      unauthorizedUnauthintecatedErrorResponse(error);
    }
    return Promise.reject(error);
  }
);

let uploadApi = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
uploadApi.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getters.token}`;
  store.dispatch("displaySpinnerPage", false);
  return config;
});

uploadApi.defaults.withCredentials = true;
uploadApi.defaults.baseURL = import.meta.env.VITE_BASE_URL;
uploadApi.interceptors.response.use(
  function (response) {
    store.dispatch("displaySpinnerPage", true);
    return response;
  },
  function (error) {
    store.dispatch("displaySpinnerPage", true);

    if (!error.response) {
      showNetworkToast();
    } else {
      unauthorizedUnauthintecatedErrorResponse(error);
    }

    return Promise.reject(error);
  }
);
function allInstances() {
  return {
    Api: Api,
    downloadApi: downloadApi,
    uploadApi: uploadApi,
  };
}

export default allInstances();
