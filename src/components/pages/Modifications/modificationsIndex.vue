

<template>
  <FilteredModificationsTable :modificationsData="modifications" />>
</template>

<script setup>
import Modifications from "../../../apis/Modifications";
import FilteredModificationsTable from "../../helpers/Modification/FilteredModificationsTable.vue";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { onMounted } from "vue";

const modifications = ref([]);
const toast=useToast();
const props = defineProps(["columnName", "columnValue"]);

onMounted(()=>{
  getModificationsIndex();
})

const getModificationsIndex = () => {
  let data = {
    columnName: props.columnName,
    columnValue: props.columnValue,
  };

  Modifications.getModificationIndex(data)

    .then((response) => {
      console.log(response)
    
      modifications.value = response.data.modifications;
      
    })
    .catch((error) => {
      if (error.response.status == 422) {
        let errors = error.response.data.errors;
        if (errors.columnName) {
          errors.columnName.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Error Message",
              detail: element,
              life: 3000,
            });
          });
        } else if (errors.columnValue) {
          errors.columnValue.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Error Message",
              detail: element,
              life: 3000,
            });
          });
        }
      }
    })
    .finally(() => {});
};

// export default {
//   data() {
//     return {
//       modifications: [],
//       isRowSelected: false,
//       selectedModification: null,
//       thereIsMod: false,
//       noModifications: false,
//     };
//   },

//   computed: {
//     totalCost() {
//       if (!this.modifications) {
//         return 0;
//       } else {
//         return this.modifications.reduce(function (sum, current) {
//           return sum + Number(current.final_cost);
//         }, 0);
//       }
//     },
//     downloadModifications() {
//       return this.modifications;
//     },

//   },
//   props: ["columnName", "columnValue"],
//   created() {
//     this.getModificationsIndex();
//   },

//   name: "modificationsIndex",
//   methods: {
//     getModificationsIndex() {

//       let data = {
//         columnName: this.columnName,
//         columnValue: this.columnValue,
//       };

//       Modifications.getModificationIndex(data)

//         .then((response) => {

//           this.modifications = response.data.modifications;
//           if (this.modifications.length > 0) {
//             this.thereIsMod = true;
//           }
//           else {
//             this.noModifications = true;
//           }
//         })
//         .catch((error) => {

//           if (error.response.status == 422) {
//             let errors = error.response.data.errors;
//             if (errors.columnName) {
//               errors.columnName.forEach((element) => {
//                 this.$toast.add({
//                   severity: "error",
//                   summary: "Error Message",
//                   detail: element,
//                   life: 3000,
//                 });
//               });
//             } else if (errors.columnValue) {
//               errors.columnValue.forEach((element) => {
//                 this.$toast.add({
//                   severity: "error",
//                   summary: "Error Message",
//                   detail: element,
//                   life: 3000,
//                 });
//               });
//             }
//           }
//         })
//         .finally(() => {

//         });
//     },

//     downloadModfications() {
//       let data = {
//         column_name: this.columnName,
//         column_value: this.columnValue,
//       };

//       Modifications.downloadModifications(data)
//         .then((response) => {
//           console.log(response);
//           var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
//           var fileLink = document.createElement("a");
//           fileLink.href = fileUrl;
//           fileLink.setAttribute(
//             "download",
//             `${this.columnValue}Modifications.xlsx`
//           );
//           document.body.appendChild(fileLink);
//           fileLink.click();
//         })
//         .catch((error) => { });
//     },
//     onRowSelect() {

//       this.isRowSelected = true;

//     },
//     gotToUpdateModification() {
//       this.$router.push(
//         `/modifications/update/${this.selectedModification.id}`
//       );
//     },

//     deleteModification() {
//       this.$confirm.require({
//         message: "Are you sure you want to proceed?",
//         header: "Confirmation",
//         icon: "pi pi-exclamation-triangle",
//         accept: () => {
//           this.$confirm.close();
//           this.isRowSelected = false;
//           this.$store.dispatch("displaySpinnerPage", false);
//           let data = {
//             id: this.selectedModification.id,
//           };

//           Modifications.deleteModification(data)

//             .then((response) => {
//               this.getModificationsIndex();
//             })
//             .catch((error) => { });
//         },
//         reject: () => {
//           this.$confirm.close();
//           this.isRowSelected = false;
//           //callback to execute when user rejects the action
//         },
//       });
//     },
//   },
// };
</script>

<style lang="scss" scoped>
.no-modification {
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-modification p {
  color: red;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
