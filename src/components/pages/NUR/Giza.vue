<template>
  <Card class=" max-w-screen-xl mx-auto mt-5">
    <template #title>
      <p style="font-size: 16px; color: black; padding: 0; text-align: center">
       Giza
      </p>
    </template>
    <template #content>


      <ZoneSubSysytemGenVIPNDL :zoneWeek="week" :zoneYear="year" :zoneRepeatedSites="gizaRepeatedSites"
        :zoneTopNUR="gizaTopNUR" zone="Giza" :zoneSub="subsystem" :zoneGen="gizaGen"
        :zoneGenStatestics="generatorStatestics" />


    </template>
  </Card>

 
</template>

<script>
import TopSites from "./TopSites.vue";
import ChartDataLabels from "chartjs-plugin-datalabels";
import siteNURTable from "./siteNURTable.vue";
import NURTickets from "./NURTickets.vue";

import NUR from "../../../apis/NUR";
import VipsOrNodals from "../NUR/VipsOrNodals.vue";
import ZoneSubSysytemGenVIPNDL from "../../helpers/Nur/ZoneSubSysytem-Gen-VIP-NDL.vue";


export default {
  data() {
    return {
      subsystem: null,
      generatorStatestics: null,
      accessStatesitcs: null,
     
    };
  },
  components: {
    TopSites,
    siteNURTable,
    VipsOrNodals,
    NURTickets,
    ZoneSubSysytemGenVIPNDL
  },
  props: [
    "gizaSubsystem",
    "gizaSubsystemCount",
    "gizaTopNUR",
    "gizaGen",
    "gizaRepeatedSites",
    "gizaAccessStatesitcs",
    "year",
    "week",
  ],
  computed: {
    token() {
      return this.$store.getters.token;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  name: "CairoEast",
  mounted() {
    this.mountSubsystemTable();
    if (this.gizaAccessStatesitcs) {
      this.accessStatesitcs = {
        labels: ["NUR", "Total Tickets", "Access Tickets"],
        datasets: [
          {
            data: [this.gizaAccessStatesitcs.NUR, ,],
            label: "NUR",
            backgroundColor: "#7F00FF",
          },
          {
            data: [, this.gizaAccessStatesitcs.totalTickets],
            label: "Total Tickets",
            backgroundColor: "#C3B1E1",
          },
          {
            data: [, , this.gizaAccessStatesitcs.accessTickets],
            label: "Access Tickets",
            backgroundColor: "#800080",
          },
        ],
      };
    }
    if (this.gizaGen) {
      this.genStatestics(this.gizaGen);
    }
  },
  methods: {
    
    mountSubsystemTable() {
      if (this.gizaSubsystem) {
        let subssytems = Object.keys(this.gizaSubsystem);
        let NURs = Object.values(this.gizaSubsystem);
        let tickets = Object.values(this.gizaSubsystemCount);
        let subssytemsLength = subssytems.length;
        let tableData = [];
        for (var i = 0; i < subssytemsLength; i++) {
          var subsystemObj = {
            subsystem: subssytems[i],
           NUR: NURs[i],
           count:tickets[i]
          };
          tableData.push(subsystemObj);
        }
        this.subsystem = tableData;
      }
    },

    genStatestics(statestics) {
      let count = [];
      let NUR = [];
      count.push(statestics.ET.count);
      count.push(statestics.ORG.count);
      count.push(statestics.Rented.count);
      count.push(statestics.VF.count);
      count.push(statestics.WE.count);
      NUR.push(statestics.ET.nur);
      NUR.push(statestics.ORG.nur);
      NUR.push(statestics.Rented.nur);
      NUR.push(statestics.VF.nur);
      NUR.push(statestics.WE.nur);

      let chart = {
        labels: ["ET", "ORG", "Rented", "VF","WE"],
        datasets: [
          {
            data: count,
            label: "Count",
            backgroundColor: "#7F00FF",
          },
          {
            data: NUR,
            label: "NUR",
            backgroundColor: "#C3B1E1",
          },
        ],
      };

      this.generatorStatestics = chart;
    },
  },
};
</script>

<style lang="scss" scoped>
.nodal {
  position: relative;
  margin-top: 10px;
  cursor: pointer;
}
.nodal::after {
  content: "Nodals";
  position: absolute;
  right: 0;
  bottom: -5px;
  color: black;
  margin-right: 20px;

  font-weight: 600;
}
</style>