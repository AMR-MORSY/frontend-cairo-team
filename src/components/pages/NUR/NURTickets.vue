<template>
  <div >
    <div class="table-container" v-if="NUR_2G_tickets.length">
     
      <NURTicketTableColumns tableHeader="2G Tickets" :tableValue="NUR_2G_tickets"/>
    </div>
    <div class="table-container" v-if="NUR_3G_tickets.length">
    
        <NURTicketTableColumns tableHeader="3G Tickets" :tableValue="NUR_3G_tickets"/>
     
    </div>
    <div class="table-container" v-if="NUR_4G_tickets.length">
     
      <NURTicketTableColumns tableHeader="4G Tickets" :tableValue="NUR_4G_tickets"/>
    </div>
    <div class="table-container" v-if="allTickets.length">
      
      <NURTicketTableColumns tableHeader="All Tickets" :tableValue="allTickets"/>
    </div>

    <Button class="block mt-5" raised label="Download" severity="danger" @click="download2GTickets" />
     
   
  </div>
</template>

<script>
import exportFromJSON from "export-from-json";
import NURTicketTableColumns from "../../helpers/Nur/NURTicketTableColumns.vue";

export default {
  data() {
    return {
      NUR_2G_tickets: [],
      NUR_3G_tickets: [],
      NUR_4G_tickets: [],
      allTickets: [],
    };
  },
  inject: ["dialogRef"],
  name: "VIPsORNodalsNURTickets",
  components:{
    NURTicketTableColumns
  },
  mounted() {
    this.mountTablesData();
  },

  methods: {
    mountTablesData() {
      if (this.dialogRef.data.NUR_2G_tickets) {
        this.NUR_2G_tickets = this.dialogRef.data.NUR_2G_tickets;
      }
      if (this.dialogRef.data.NUR_3G_tickets) {
        this.NUR_3G_tickets = this.dialogRef.data.NUR_3G_tickets;
      }
      if (this.dialogRef.data.NUR_4G_tickets) {
        this.NUR_4G_tickets = this.dialogRef.data.NUR_4G_tickets;
      }
      if (this.dialogRef.data.allTickets) {
        this.allTickets = this.dialogRef.data.allTickets;
      }
    },
    download2GTickets() {
      let tickets = [];
      if (this.NUR_2G_tickets.length > 0) {
        this.NUR_2G_tickets.forEach((element) => {
          tickets.push(element);
        });
      }

      if (this.NUR_3G_tickets.length > 0) {
        this.NUR_3G_tickets.forEach((element) => {
          tickets.push(element);
        });
      }
      if (this.NUR_4G_tickets.length > 0) {
        this.NUR_4G_tickets.forEach((element) => {
          tickets.push(element);
        });
      }
      if (this.allTickets.length > 0) {
        this.allTickets.forEach((element) => {
          tickets.push(element);
        });
      }

      const data = tickets;
      const fileName = "Tickets2G";
      const exportType = exportFromJSON.types.xls;

      if (data) exportFromJSON({ data, fileName, exportType });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>