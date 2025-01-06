<template>
 
 <Card class=" max-w-screen-xl mx-auto mt-5">
    <template #title>
      <p style="font-size: 16px; color: black; padding: 0; text-align: center">
        Cairo East
      </p>
    </template>
    <template #content>


      <ZoneSubSysytemGenVIPNDL :zoneWeek="week" :zoneYear="year" :zoneRepeatedSites="cairoEastRepeatedSites"
        :zoneTopNUR="cairoEastTopNUR" zone="Cairo East" :zoneSub="subsystem" :zoneGen="cairoEastGen"
        :zoneGenStatestics="generatorStatestics" />


    </template>
  </Card>
</template>

<script>
import TopSites from "./TopSites.vue";

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
    "cairoEastSubsystem",
    "cairoEastSubsystemCount",
    "cairoEastTopNUR",
    "cairoEastGen",
    "cairoEastRepeatedSites",
    "cairoEastAccessStatesitcs",
    "week",
    "year",
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

    if (this.cairoEastGen) {
      this.genStatestics(this.cairoEastGen);
    }
    if (this.cairoEastAccessStatesitcs) {
      this.accessStatesitcs = {
        labels: ["NUR", "Total Tickets", "Access Tickets"],
        datasets: [
          {
            data: [this.cairoEastAccessStatesitcs.NUR, ,],
            label: "NUR",
            backgroundColor: "#7F00FF",
          },
          {
            data: [, this.cairoEastAccessStatesitcs.totalTickets],
            label: "Total Tickets",
            backgroundColor: "#C3B1E1",
          },
          {
            data: [, , this.cairoEastAccessStatesitcs.accessTickets],
            label: "Access Tickets",
            backgroundColor: "#800080",
          },
        ],
      };
    }
  },
  methods: {
    
   
    mountSubsystemTable() {
      if (this.cairoEastSubsystem) {
       
        let subssytems = Object.keys(this.cairoEastSubsystem);
        let NURs = Object.values(this.cairoEastSubsystem);
        let tickets = Object.values(this.cairoEastSubsystemCount);
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
.p-button.vip {
  background-color: var(--purple-700) !important;
  background-size: 200% 100%;
  background-position: right bottom;
  transition: background-position 0.5s ease-out;
  color: #fff;
  border-color: var(--purple-700);
}
.p-button.vip:hover {
  background-position: left bottom !important;
  border-color: var(--purple-700) !important;
}
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