import { createRouter, createWebHistory } from "vue-router";
import Sheet from "../components/pages/energySheet/Sheet.vue";

import newSitesInsert from "../components/pages/sites/newSitesInsert.vue";
import newSiteInsert from "../components/pages/sites/newSiteInsert.vue";
import login from "../components/pages/User/login.vue";
import register from "../components/pages/User/register.vue";
import home from "../components/home.vue";
import resetPassword from "../components/pages/User/resetPassword.vue";
import unauthorized from "../components/unauthorized.vue";
import nurIndex from "../components/pages/NUR/nurIndex.vue";
import NUR2G from "../components/pages/NUR/NUR2G.vue";
import NUR3G from "../components/pages/NUR/NUR3G.vue";
import NUR4G from "../components/pages/NUR/NUR4G.vue";
import NURStatestics from "../components/pages/NUR/NURStatestics.vue";
import cascades from "../components/pages/sites/cascades.vue";
import nodals from "../components/pages/sites/nodals.vue";
import modifications from "../components/pages/Modifications/modifications.vue";
import modificationsIndex from "../components/pages/Modifications/modificationsIndex.vue";
import energyIndex from "../components/pages/energySheet/energyIndex.vue";
import Details from "../components/pages/sites/Details.vue";
import CascadesUpdate from "../components/pages/sites/CascadesUpdate.vue";
import SiteModifications from "../components/pages/Modifications/SiteModifications.vue";
import NewModification from "../components/pages/Modifications/NewModification.vue";
import UpdateModification from "../components/pages/Modifications/UpdateModification.vue";
import dashboard from "../components/pages/dashboard.vue";
import NUR from "../components/pages/NUR/NUR.vue";
import energy from "../components/pages/energySheet/energy.vue";
import sites from "../components/pages/sites/sites.vue";
import siteUpdate from "../components/pages/sites/siteUpdate.vue";
import energyStatestics from "../components/pages/energySheet/energyStatestics.vue";
import notFound from "../components/notFound.vue";
import store from "../vuex/store";
import validateToken from "../components/pages/User/validateToken.vue";
import TheWelcome from "../components/TheWelcome.vue";
import siteTxIssues from "../components/pages/Transmission/siteTxIssues.vue";
import SearchTxIssues from "../components/pages/Transmission/SearchTxIssues.vue";
import validateSignUpCode from "../components/pages/User/validateSignUpCode.vue";
import ActivateUserAccount from "../components/pages/User/ActivateUserAccount.vue";
import FMStatestics from "../components/pages/NUR/FMStatestics.vue";
import ModificationsByDates from "../components/pages/Modifications/ModificationsByDates.vue";
import PreQuotation from "../components/pages/Modifications/PreQuotation.vue";
import ViewModification from "../components/pages/Modifications/ViewModification.vue";
import InsertMailPrices from "../components/pages/Modifications/InsertMailPrices.vue";
import PreQuotationUpdate from "../components/pages/Modifications/PreQuotationUpdate.vue";
import ModificationsSearchPriceList from "../components/pages/Modifications/ModificationsSearchPriceList.vue";
import ModificationsSearchDate from "../components/pages/Modifications/ModificationsSearchDate.vue";
import ModificationsSearchCategory from "../components/pages/Modifications/ModificationsSearchCategory.vue";
import ModificationsSearchWorkOrder from "../components/pages/Modifications/ModificationsSearchWorkOrder.vue";
import ModificationByWO from "../components/pages/Modifications/ModificationByWO.vue";
import ModificationInvoices from "../components/pages/Modifications/ModificationInvoices.vue";
import ModificationInvoiceView from "../components/pages/Modifications/ModificationInvoiceView.vue";
import ModificationsDashboard from "../components/pages/Modifications/ModificationsDashboard.vue";
import Notifications from "../components/pages/User/Notifications.vue";
import ModificationsWithoutPQ from "../components/pages/Modifications/ModificationsWithoutPQ.vue";
import ViewNotification from "../components/pages/User/ViewNotification.vue";
import UnreportedModifications from "../components/pages/Modifications/UnreportedModifications.vue";
const routes = [
  {
    path: "/energy/sheet",
    component: Sheet,
    meta: { requiresAuth: true },
  
  },
  { path: "/energy", component: energy, meta: { requiresAuth: true } },
  {
    path: "/energy/index",
    component: energyIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/energy/statestics/:week/:year",
    component: energyStatestics,
    props: true,
    meta: { requiresAuth: true },
  },
  
  {
    path: "/modifications/index/:columnName/:columnValue",
    component: modificationsIndex,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/quotation/modification/:id",
    component: PreQuotation,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/modifications/filterdates/:dateType/:from_date?/:to_date?",
    component: ModificationsByDates,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/modifications/new/:site_code/:site_name/:oz",
    component: NewModification,
    props: true,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/modification/wo/:wo",
    component: ModificationByWO,
    props: true,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/modification/update/:id",
    component: UpdateModification,
    props: true,
    meta: { requiresAuth: true },
  
  },
  {
    path: "/modification/view/:id",
    component: ViewModification,
    props: true,
    meta: { requiresAuth: true },
  
  },
  {
    path: "/modifications",
    component: modifications,
    meta: { requiresAuth: true},
  
  },
  {
    path: "/modifications/without/pq/:oz/:action_owner",
    component: ModificationsWithoutPQ,
    meta: { requiresAuth: true},
    props: (route) => ({ 
      oz: route.params.oz || null, // Explicitly set to null if missing,
      action_owner:route.params.action_owner||null
    })
  
  },
  {
    path: "/modifications/unreported-modifications/:oz/:action_owner",
    component: UnreportedModifications,
    meta: { requiresAuth: true},
    props: (route) => ({ 
      oz: route.params.oz || null, // Explicitly set to null if missing,
      action_owner:route.params.action_owner||null
    })
  
  },
  {
    path: "/modifications/search/pricelist",
    component: ModificationsSearchPriceList,
    meta: { requiresAuth: true},
  
  },
  {
    path: "/modifications/search/date",
    component: ModificationsSearchDate,
    meta: { requiresAuth: true},
  
  },
  {
    path: "/modifications/search/category",
    component: ModificationsSearchCategory,
    meta: { requiresAuth: true},
  
  },
  {
    path: "/modifications/invoices",
    component:ModificationInvoices,
    meta: { requiresAuth: true},
  
  },
  {
    path: "/modification/invoice/view/:invoice_id",
    component:ModificationInvoiceView,
    meta: { requiresAuth: true},
    props: true,
  
  },
  {
    path: "/modifications/search/workorder",
    component: ModificationsSearchWorkOrder,
    meta: { requiresAuth: true},
  
  },
  {
    path: "/modifications/dashboard/:year",
    component: ModificationsDashboard,
    meta: { requiresAuth: true},
    props:true
  
  },
  {
    path: "/modifications/sitemodifications/:site_code/:site_name/:oz",
    component: SiteModifications,
    props: true,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/quotation/mailprices/index/:modification_id/:quotation_id?",
    component: InsertMailPrices,
    props: true,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/quotation/update/:modification_id/:quotation_id",
    component: PreQuotationUpdate,
    props: true,
    meta: { requiresAuth: true },
   
  },
  { path: "/sites", component: sites, meta: { requiresAuth: true } },
  {
    path: "/sites/details/:site_code",
    component: Details,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/sites/cascades",
    component: cascades,
    meta: { requiresAuth: true},
   
  },
  {
    path: "/sites/storeSites",
    component: newSitesInsert,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/sites/storeSite",
    component: newSiteInsert,
    meta: { requiresAuth: true},
    name:"storeSite",
   
  },
  {
    path: "/sites/update/:siteCode",
    component: siteUpdate,
    props: true,
    meta: { requiresAuth: true },
  
  },
  {
    path: "/sites/nodals",
    component: nodals,
    meta: { requiresAuth: true },
 
  },
  {
    path: "/sites/cascades/update/:site_code",
    component: CascadesUpdate,
    props: true,
    
    meta:{requiresAuth: true},
  
  },
  
  { path: "/nur", component: NUR, meta: { requiresAuth: true } },
  { path: "/nur/index", component: nurIndex, meta: { requiresAuth: true } },
  {
    path: "/nur/statestics/:week/:year",
    component: NURStatestics,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/FM/statestics/:week/:year",
    component:FMStatestics,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/nur/2G",
    component: NUR2G,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/nur/3G",
    component: NUR3G,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/nur/4G",
    component: NUR4G,
    meta: { requiresAuth: true },
   
  },
  { path: "/", redirect: "/welcome" },
  { path: "/welcome", component: TheWelcome, meta: { hideNavbar: true },name:"welcome" },
  {
    path: "/home",
    component: home,
    name: "home",
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", component: notFound, meta: { hideNavbar: true },name:"notFound" },
  
  {
    path: "/user/login",
    component: login,
    name: "login",
    meta: { hideNavbar: true },
    beforeEnter: (to, from, next) => {
      if(store.getters.isLogin)
      {
        next({path:"/welcome"});
         

      }
      else{
        next();
         

      }
   
  },
  },
  {
    path: "/user/:token",
    component: validateToken,
    name: "validateToken",
    props: true,
    meta: { hideNavbar: true },
    beforeEnter: (to, from, next) => {
      if(store.getters.isLogin)
      {
        next({path:"/welcome"});
         

      }
      else{
        next();
         

      }
   
  },
  },
  {
    path: "/user/notifications",
    component:Notifications,
    name: "notifications",
  
    meta: { requiresAuth: true  },
   
   

  },
  {
    path: "/user/notification/view/:notification_id",
    component:ViewNotification,
   
    props:true,
  
    meta: { requiresAuth: true  },
   
   

  },
  {
    path: "/user/signUp/:code",
    component: validateSignUpCode,
    name: "validateSignUpCode",
    props: true,
    meta: { hideNavbar: true },
    beforeEnter: (to, from, next) => {
      if(store.getters.isLogin)
      {
        next({path:"/welcome"});
         

      }
      else{
        next();
         

      }
   
  },
  },
  {
    path: "/user/activateUserAccount",
    component: ActivateUserAccount,
    name: "ActivateUserAccount",
    
    meta: { hideNavbar: true },
    beforeEnter: (to, from, next) => {
      if(store.getters.isLogin)
      {
        next({path:"/welcome"});
         

      }
      else{
        next();
         

      }
   
  },

  },
  {
    path: "/user/register",
    component: register,
    meta: { hideNavbar: true },
    beforeEnter: (to, from, next) => {
      if(store.getters.isLogin)
      {
        next({path:"/welcome"});
         

      }
      else{
        next();
         

      }
   
  },
  },
  {
    path: "/user/resetpassword",
    component: resetPassword,
    meta: { hideNavbar: true },
    beforeEnter: (to, from, next) => {
      if(store.getters.isLogin)
      {
        next({path:"/welcome"});   

      }
      else{
        next();
         

      }
   
  },
  },
  {
    path: "/unauthorized/:path",
    component: unauthorized,
    meta: { hideNavbar: true,requiresAuth:true },
    name: "unauthorized",
    props:true,
   
  },
  
  {
    path: "/siteTxIssues/:site_code",
    component: siteTxIssues,
    props: true,
    
    meta:{requiresAuth: true},
    name: "siteTxIssues",
   
   
  },
  {
    path: "/searchTxIssues/:fromDate/:toDate/:issue",
    component: SearchTxIssues,
    props: true,
    
    meta:{requiresAuth: true},
    name: "searchTxIssues",
   
   
  },
  
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLogin) {

    next({ name: "login",
      query:{redirect:to.fullPath}//////save the full path as a query to be used in login component to redirect the user to his required route after successfully login  
     });
  } else {
    next();
  }
  
});

export default router;
