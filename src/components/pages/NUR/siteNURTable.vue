<template>
  <div class="container">
    <div v-if="count2G" class="mb-2">
      <DataTable
        :value="siteNUR2G"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="text-lg text-font-main-color font-Signika font-semibold">
            2G NUR
          </div>
        </template>
        <Column
          v-for="col in columns"
          :field="col.field"
          :header="col.header"
          :key="col.field"
          :sortable="col.sortable"
        ></Column>
      </DataTable>
      <!-- <div class="mt-2">
        <Button
          label="Download 2G NUR"
          severity="secondary"
          class="block"
          @click="download2GNUR"
        />
      </div> -->
    </div>
    <div v-if="count3G" class="mb-2">
      <DataTable
        :value="siteNUR3G"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="text-lg text-font-main-color font-Signika font-semibold">
            3G NUR
          </div>
        </template>
        <Column
          v-for="col in columns"
          :field="col.field"
          :header="col.header"
          :key="col.field"
          :sortable="col.sortable"
        ></Column>
      </DataTable>
      <!-- <div class="mt-2">
        <Button
          label="Download 3G NUR"
          severity="secondary"
          class="block"
          @click="download3GNUR"
        />
      </div> -->
    </div>
    <div v-if="count4G" class="mb-2">
      <DataTable
        :value="siteNUR4G"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="text-lg text-font-main-color font-Signika font-semibold">
            4G NUR
          </div>
        </template>
        <Column
          v-for="col in columns"
          :field="col.field"
          :header="col.header"
          :key="col.field"
          :sortable="col.sortable"
        ></Column>
      </DataTable>
      <!-- <div class="mt-2">
        <Button
          label="Download 4G NUR"
          severity="secondary"
          class="block"
          @click="download4GNUR"
        />
      </div> -->
    </div>
    <div v-if="countFM2G" class="mb-2">
      <DataTable
        :value="siteFM2G"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="text-lg text-font-main-color font-Signika font-semibold">
            2G FM NUR
          </div>
        </template>
        <Column
          v-for="col in columns"
          :field="col.field"
          :header="col.header"
          :key="col.field"
          :sortable="col.sortable"
        ></Column>
      </DataTable>
      <!-- <div class="mt-2">
        <Button
          label="Download 4G NUR"
          severity="secondary"
          class="block"
          @click="download4GNUR"
        />
      </div> -->
    </div>
    <div v-if="countFM3G" class="mb-2">
      <DataTable
        :value="siteFM4G"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="text-lg text-font-main-color font-Signika font-semibold">
            3G FM NUR
          </div>
        </template>
        <Column
          v-for="col in columns"
          :field="col.field"
          :header="col.header"
          :key="col.field"
          :sortable="col.sortable"
        ></Column>
      </DataTable>
      <!-- <div class="mt-2">
        <Button
          label="Download 4G NUR"
          severity="secondary"
          class="block"
          @click="download4GNUR"
        />
      </div> -->
    </div>
    <div v-if="countFM4G" class="mb-2">
      <DataTable
        :value="siteFM4G"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="text-lg text-font-main-color font-Signika font-semibold">
            4G FM NUR
          </div>
        </template>
        <Column
          v-for="col in columns"
          :field="col.field"
          :header="col.header"
          :key="col.field"
          :sortable="col.sortable"
        ></Column>
      </DataTable>
    
    </div>
      <div class="mt-2">
        <Button
          label="Download Tickets"
          severity="secondary"
          class="block uppercase"
          @click="downloadTickets"
        />
      </div>
  </div>
</template>

<script>
import SiteAlarmsTable from "./SiteAlarmsTable.vue";
import NUR from "../../../apis/NUR";
import allInstances from "../../../apis/Api";
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      siteNUR3G: [],
      siteNUR2G: [],
      siteNUR4G: [],
      siteFM3G: [],
      siteFM4G: [],
      siteFM2G: [],
      count2G: false,
      count3G: false,
      count4G: false,
      countFM2G: false,
      countFM3G: false,
      countFM4G: false,
      columns: null,
    };
  },
  created() {
    this.columns = [
      { field: "week", header: "Week", sortable: true },
      { field: "Dur_Hr", header: "Durations" },
      { field: "begin", header: "Start Time", sortable: true },
      { field: "end", header: "End Time", sortable: true },
      { field: "nur", header: "NUR" },
      { field: "sub_system", header: "Subsystem" },
      { field: "cells", header: "Cells" },
      { field: "impacted_sites", header: "impacted" },
    ];
  },
  components: {
    SiteAlarmsTable,
  },
  // emits: ["displayNoneSpinner"],
  inject: ["dialogRef"],
  // props:["siteNUR3G","siteNUR2G","siteNUR4G"],
  name: "siteNURTable",
  mounted() {
    this.checkNUR();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isLogin) {
        return vm.$router.push("/user/login");
      }
    });
  },

  computed: {
    token() {
      return this.$store.getters.token;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    // getSiteAlarms() {
    //   // console.log(this.siteNUR3G);
    //   // if (this.count2G == true) {
    //   //   this.siteCode = this.siteNUR2G[0].problem_site_code;
    //   //   this.siteName = this.siteNUR2G[0].problem_site_name;
    //   // } else if (this.count3G == true) {
    //   //   this.siteCode = this.siteNUR3G[0].problem_site_code;
    //   //   this.siteName = this.siteNUR3G[0].problem_site_name;
    //   // } else if (this.count4G == true) {
    //   //   this.siteCode = this.siteNUR4G[0].problem_site_code;
    //   //   this.siteName = this.siteNUR4G[0].problem_site_name;
    //   // }
    //   // this.$dialog.open(SiteAlarmsTable, {
    //   //   props: {
    //   //     header: this.siteName,
    //   //     style: {
    //   //       width: "75vw",
    //   //     },
    //   //     breakpoints: {
    //   //       "960px": "75vw",
    //   //       "640px": "90vw",
    //   //     },
    //   //     //   modal: true,
    //   //   },
    //     // templates: {
    //     //   footer: () => {
    //     //     return [
    //     //       h(Button, {
    //     //         label: "No",
    //     //         icon: "pi pi-times",
    //     //         onClick: () => dialogRef.close({ buttonType: "No" }),
    //     //         class: "p-button-text",
    //     //       }),
    //     //       h(Button, {
    //     //         label: "Yes",
    //     //         icon: "pi pi-check",
    //     //         onClick: () => dialogRef.close({ buttonType: "Yes" }),
    //     //         autofocus: true,
    //     //       }),
    //     //     ];
    //     //   },
    //     // },
    //     data: {
    //       site_code: this.dialogRef.data.site_code,
    //       site_name: this.dialogRef.data.site_name,
    //     },
    //   });
    // },
    checkNUR() {
      this.siteNUR3G = this.dialogRef.data.NUR3G;
      if (this.siteNUR3G.length > 0) {
        this.count3G = true;
      }
      this.siteNUR2G = this.dialogRef.data.NUR2G;
      if (this.siteNUR2G.length > 0) {
        this.count2G = true;
      }
      this.siteNUR4G = this.dialogRef.data.NUR4G;
      if (this.siteNUR4G.length > 0) {
        this.count4G = true;
      }
      this.siteFM4G = this.dialogRef.data.FM4G;
      if (this.siteFM4G.length > 0) {
        this.countFM4G = true;
      }
      this.siteFM3G = this.dialogRef.data.FM3G;
      if (this.siteFM3G.length > 0) {
        this.countFM3G = true;
      }
      this.siteFM2G = this.dialogRef.data.FM2G;
      if (this.siteFM2G.length > 0) {
        this.countFM2G = true;
      }
    },
    // download2GNUR() {
    //   let data = {
    //     site_code: this.dialogRef.data.NUR2G[0].problem_site_code,
    //   };

    //   NUR.download2GNUR(data)
    //     .then((response) => {
    //       console.log(response);
    //       var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    //       var fileLink = document.createElement("a");
    //       fileLink.href = fileUrl;
    //       fileLink.setAttribute(
    //         "download",
    //         `${this.dialogRef.data.NUR2G[0].problem_site_name}NUR2G.xlsx`
    //       );
    //       document.body.appendChild(fileLink);
    //       fileLink.click();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {});
    // },
    // download3GNUR() {
    //   let data = {
    //     site_code: this.dialogRef.data.NUR3G[0].problem_site_code,
    //   };

    //   NUR.download3GNUR(data)
    //     .then((response) => {
    //       console.log(response);
    //       var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    //       var fileLink = document.createElement("a");
    //       fileLink.href = fileUrl;
    //       fileLink.setAttribute(
    //         "download",
    //         `${this.dialogRef.data.NUR3G[0].problem_site_name}NUR3G.xlsx`
    //       );
    //       document.body.appendChild(fileLink);
    //       fileLink.click();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {});
    // },
    downloadTickets() {
      // let data = {
      //   site_code: this.dialogRef.data.NUR4G[0].problem_site_code,
      // };

      // NUR.download4GNUR(data)
      //   .then((response) => {
      //     console.log(response);
      //     var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      //     var fileLink = document.createElement("a");
      //     fileLink.href = fileUrl;
      //     fileLink.setAttribute(
      //       "download",
      //       `${this.dialogRef.data.NUR4G[0].problem_site_name}NUR4G.xlsx`
      //     );
      //     document.body.appendChild(fileLink);
      //     fileLink.click();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })
      //   .finally(() => {});
      var NUR = [];
      if (this.count2G) {
        this.siteNUR2G.forEach((element)=>{
          NUR.push(element)
        })
      }
      if (this.count3G) {
        this.siteNUR3G.forEach((element)=>{
          NUR.push(element)
        })
      }
      if (this.count4G) {
        this.siteNUR4G.forEach((element)=>{
          NUR.push(element)
        })
      }
      if (this.countFM2G) {
        this.siteFM2G.forEach((element)=>{
          NUR.push(element)
        })
      }
      if (this.countFM3G) {
        this.siteFM3G.forEach((element)=>{
          NUR.push(element)
        })
      }
      if (this.countFM4G) {
        this.siteFM4G.forEach((element)=>{
          NUR.push(element)
        })
      }
      const NURSheet = XLSX.utils.json_to_sheet(NUR);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        NURSheet,
        "NUR"
      );

      XLSX.writeFile(workbook, `${this.dialogRef.data.site_code}-${this.dialogRef.data.site_name}NUR.xlsx`, { compression: true });
    },
  },
};
</script>

<style lang="scss" scoped></style>
