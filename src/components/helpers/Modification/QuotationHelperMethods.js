// import Modifications from "../../../apis/Modifications";
// import PriceListTable from "./PriceListTable.vue";

//  import { useToast } from "primevue/usetoast";

// import Toast from "primevue/toast";

// import Dialog from "primevue/dialog";

// import { useDialog } from "primevue/usedialog";

// const toast=useToast();

// const dialog=useDialog();

// export default function searchPriceListItems(data) {
//   Modifications.searchPriceList(data).then((response) => {
//     console.log(response.data);
//     if (response.data.message == "No data found") {
//       Toast.add({
//         severity: "error",
//         summary: "Error Message",
//         detail: "No data Found",
//         life: 3000,
//       });
//     } else {
//       Dialog.open(PriceListTable, {
//         props: {
//           style: {
//             width: "50vw",
//           },
//           breakpoints: {
//             "960px": "75vw",
//             "640px": "90vw",
//           },

//           modal: true,
//         },

//         data: {
//           priceListItems: response.data.priceList,
//         },
//       });
   
//     }
//   });
// }
