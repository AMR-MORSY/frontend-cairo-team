import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store";
import router from "./router";


import KeyFilter from "primevue/keyfilter";

import Ripple from "primevue/ripple";
import spinnerButton from "./components/helpers/spinnerButton.vue";
import helperTable from "./components/helpers/helperTable.vue";

import navbar from "./components/navbar.vue";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import Card from "primevue/card";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Chart from "primevue/chart";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Checkbox from "primevue/checkbox";
import Tooltip from "primevue/tooltip";
import ProgressSpinner from "primevue/progressspinner";
import DialogService from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";
import FileUpload from "primevue/fileupload";
import ProgressBar from "primevue/progressbar";
import Badge from "primevue/badge";
import SpinnerPage from "./components/helpers/SpinnerPage.vue";
import Details from "./components/pages/sites/Details.vue";
import TabPanel from "primevue/tabpanel";
import PickList from "primevue/picklist";
import Fieldset from "primevue/fieldset";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
// import Datepicker from "@vuepic/vue-datepicker";
// import "@vuepic/vue-datepicker/dist/main.css";
import Divider from "primevue/divider";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import SpeedDial from "primevue/speeddial";
import OverlayPanel from "primevue/overlaypanel";
import { abilitiesPlugin } from "@casl/vue";
import ability from "./services/ability";
import FloatLabel from "primevue/floatlabel";
import { definePreset } from "@primevue/themes";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import InputGroup from "primevue/inputgroup";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import Menubar from "primevue/menubar";
import RadioButton from "primevue/radiobutton";
import MultiSelect from "primevue/multiselect";
import Popover from "primevue/popover";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import MeterGroup from "primevue/metergroup";
import DatePicker from "primevue/datepicker";
import OverlayBadge from "primevue/overlaybadge";
import Avatar from "primevue/avatar";
import Knob from "primevue/knob";
import Paginator from "primevue/paginator";
import Drawer from 'primevue/drawer';
import Message from "primevue/message";

import "../node_modules/bootstrap/dist/js/bootstrap.min";

import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

import JsonExcel from "vue-json-excel3";

import "./assets/style.css";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
});
const myPresets = definePreset(Aura, {
  semantic: {
    myButton: {
      warn: {
        background: "white",
        paddigX: "0.75rem",
        paddigY: "0.75rem",
        borderColor: "#673EE6",
        color: "black",
      },
    },
  },
  components: {
    inputtext: {
      focusBorderColor: "#673EE6",
      disabledBackground: "white",
      // paddingY:"0.25rem",
    },
    multiselect: {
      disabledBackground: "white",
    },
    select: {
      disabledBackground: "white",
    },
    textarea: {
      disabledBackground: "white",
    },
    button: {
      warnBackground: "{my.button.warn.background}",
      paddigX: "{my.button.padding.x}",
      paddigY: "{my.button.padding.y}",
      borderColor: "{my.button.border.color}",
      color: "{my.button.color}",
    },
    menubar: {
      background: "transparent",
      border: {
        color: "transparent",
      },
      // base:{
      item: {
        focus: {
          background: "transparent",
        },
      },

      // },
    },
  },
});

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(VueChartkick)
  .use(PrimeVue, {
    theme: {
      preset: myPresets,
    },
  })
  .use(ToastService)
  .use(DialogService)
  .use(ConfirmationService)
  .use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  })

  .directive("tooltip", Tooltip)
  .directive("ripple", Ripple)
  .directive("keyfilter", KeyFilter)
  .component("Datepicker", DatePicker)
  .component("ConfirmDialog", ConfirmDialog)
  .component("Toast", Toast)
  .component("SpinnerPage", SpinnerPage)
  .component("Fieldset", Fieldset)
  .component("DynamicDialog", DynamicDialog)
  .component("Menubar", Menubar)
  .component("Dropdown", Dropdown)
  .component("Divider", Divider)
  .component("Calendar", Calendar)
  .component("Textarea", Textarea)
  .component("Details", Details)
  .component("Dialog", Dialog)
  .component("Badge", Badge)
  .component("Tab", Tab)
  .component("TabPanel", TabPanel)
  .component("TabPanels", TabPanels)
  .component("Tabs", Tabs)
  .component("TabList", TabList)
  .component("ProgressBar", ProgressBar)
  .component("FileUpload", FileUpload)
  .component("Card", Card)
  .component("PickList", PickList)
  .component("ProgressSpinner", ProgressSpinner)
  .component("Checkbox", Checkbox)
  .component("Password", Password)
  .component("InputText", InputText)
  .component("InputNumber", InputNumber)
  .component("InputGroup", InputGroup)
  .component("Select", Select)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("Chart", Chart)
  .component("SpeedDial", SpeedDial)
  .component("Button", Button)
  .component("navbar", navbar)
  .component("spinnerButton", spinnerButton)
  .component("helperTable", helperTable)
  .component("OverlayPanel", OverlayPanel)
  .component("downloadExcel", JsonExcel)
  .component("FloatLabel", FloatLabel)
  .component("RadioButton", RadioButton)
  .component("MultiSelect", MultiSelect)
  .component("Popover", Popover)
  .component("ColumnGroup", ColumnGroup)
  .component("Row", Row)
  .component("MeterGroup", MeterGroup)
  .component("Knob", Knob)
  .component("OverlayBadge", OverlayBadge)
  .component("Avatar", Avatar)
  .component("Message", Message)
  .component("Paginator", Paginator)
.component("Drawer",Drawer)
  .mount("#app");
