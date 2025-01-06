<template>
  <div class="table-container text-sm" v-if="batteries">
    <DataTable :value="batteries" scrollable class="p-datatable-sm" stripedRows selectionMode="single" dataKey="id"
      @row-select="onRowSelect" v-model:selection="selectedBattery">
      <Column selectionMode="single"></Column>
      <Column field="batteries_brand" header="Batteries Brand"></Column>
      <Column field="battery_amp_hr" header="Battery Amp Hr"></Column>
      <Column field="battery_volt" header="Battery Volt"></Column>
      <Column field="no_strings" header="No. Strings"></Column>
      <Column field="stock" header="Stock"></Column>
      <Column field="batteries_status" header="Batteries Status"></Column>
      <Column field="theft_case" header="Theft Case"></Column>
      <Column field="installation_date" header="Installation Date" sortable></Column>
      <Column field="category" header="Category"></Column>
      <Column field="comment" header="Comment"></Column>
    </DataTable>
  </div>
  <div class="flex justify-evenly items-center px-5 py-3 " style="border-top: 1px solid gray;">
    <Button class="block" severity="success" :disabled="disableButton" @click="updateBattery()"
      v-if="$can('update_Batteries_data')" label="Update" />
    <Button class="block" severity="danger" :disabled="disableButton" @click="openDeleteBattRecordConfirmation()"
      v-if="$can('delete_Batteries_data')" label="Delete" />
    <Button class="block" severity="info" @click="insertNewBatteryData" v-if="$can('create_Batteries_data')"
      label="Add" />

  </div>
  
</template>

<script>

import BatteriesUpdate from './BatteriesUpdate.vue';
import Sites from "../../../apis/Sites";

export default {
  data() {
    return {

      batteries: null,
      selectedBattery: null,
      disableButton: true,
      site_code: null,
    
    };
  },
  inject: ["dialogRef"],
  components: {
    BatteriesUpdate,

  },

  mounted() {
    this.mountTableData();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/user/login") {
        this.dialogRef.close();
      }

    }

  },

  name: "SiteBatteriesTable",
  methods: {
    // downloadSiteAlarms(siteCode, alarmName, siteName) {
    //     let data = {
    //         siteCode: siteCode,
    //     };

    //     if (alarmName == "power") {
    //         Energy.downloadSitePowerAlarms(data)
    //             .then((response) => {
    //                 console.log(response);
    //                 var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    //                 var fileLink = document.createElement("a");
    //                 fileLink.href = fileUrl;
    //                 fileLink.setAttribute("download", `${siteName}PowerAlarms.xlsx`);
    //                 document.body.appendChild(fileLink);
    //                 fileLink.click();
    //             })
    //             .catch((error) => { });
    //     } else if (alarmName == "highTemp") {
    //         Energy.downloadSiteHighTempAlarms(data)
    //             .then((response) => {
    //                 console.log(response);
    //                 var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    //                 var fileLink = document.createElement("a");
    //                 fileLink.href = fileUrl;
    //                 fileLink.setAttribute("download", `${siteName}HighTempAlarms.xlsx`);
    //                 document.body.appendChild(fileLink);
    //                 fileLink.click();
    //             })
    //             .catch((error) => { });
    //     } else if (alarmName == "gen") {
    //         Energy.downloadSiteGenAlarms(data)
    //             .then((response) => {
    //                 console.log(response);
    //                 var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    //                 var fileLink = document.createElement("a");
    //                 fileLink.href = fileUrl;
    //                 fileLink.setAttribute("download", `${siteName}GenAlarms.xlsx`);
    //                 document.body.appendChild(fileLink);
    //                 fileLink.click();
    //             })
    //             .catch((error) => { });
    //     }
    // },

    mountTableData() {
      this.batteries = this.dialogRef.data.batteries
      this.site_code = this.dialogRef.data.site_code;


    },
    insertNewBatteryData() {
      this.dialogRef.close();
      this.$dialog.open(BatteriesUpdate, {
        props: {
          style: {
            width: "75vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },
          modal: true,

        },
        data: {
          battery: null,
          action: "create",
          site_code: this.site_code
        }


      });


    },
    updateBattery() {
      this.dialogRef.close();
      this.$dialog.open(BatteriesUpdate, {
        props: {
          style: {
            width: "75vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },
          modal: true,

        },
        data: {
          battery: this.selectedBattery,
          action: "update",
          site_code: this.site_code
        }


      });

    },
    onRowSelect() {
      this.disableButton = false;


    },
    delteBatteryRecord() {
     
      Sites.deleteBatteryRecord(this.selectedBattery.id).then((response) => {
        if (response.data.message == 'success') {
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Deleted Successfully",
            life: 3000,
          });

          this.dialogRef.close();

        }

      })

    },
    
    openDeleteBattRecordConfirmation() {
     
      this.$confirm.require({
        message: "This will delete the Battery record",
        header: "Delete Record",
        icon: "pi pi-info-circle",
        rejectProps: {

          icon: 'pi pi-times',
          outlined: true,
          size: 'small',
          severity: 'success',

        },
        acceptProps: {
          severity: 'danger',

          icon: 'pi pi-check',
          size: 'small'
        },
        accept: () => {
          this.$confirm.close();

          this.delteBatteryRecord()
        },
        reject: () => {
          this.$confirm.close();

        },

      });

    }
  },
};
</script>

<style lang="scss" scoped></style>