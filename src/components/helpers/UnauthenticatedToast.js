import router from "../../router/index";
import store from "../../vuex/store";



import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;


const timeoutInMS = 60 * 60 * 1000; // 3 minutes -> 3 * 60 * 1000
let timeoutId;
  
function handleInactive() {
    // Here you want to logout a user and/or ping your token
    const toastLiveExample = document.getElementById("liveToast");
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    store.dispatch("showUnauthToast", true);
  
    toastBootstrap.show();
   
}

function startTimer() { 
    // setTimeout returns an ID (can be used to start or clear a timer)
    timeoutId = setTimeout(handleInactive, timeoutInMS);
}

function resetTimer() { 
    clearTimeout(timeoutId);
    startTimer();
}
 
function setupTimers () {
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
     
    startTimer();
}

function clearStorageAndLogin()
{
    sessionStorage.removeItem("User");
    store.dispatch("userData", null);
    store.dispatch("showUnauthToast",false);
  
   
    router.push({ path: "/user/login" });

}


document.addEventListener("DOMContentLoaded",
function(){
    setupTimers()

});

const toastLiveExample = document.getElementById("liveToast");
toastLiveExample.addEventListener("hide.bs.toast", function () {
    clearStorageAndLogin();

});

