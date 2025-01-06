<template>
  <div class="container mt-5">
    <Card>
         <template #title>
             <div class="d-flex justify-content-center align-items-center">
          <p style="text-align: center">Cairo North</p>
        </div>
     
      </template>
      <template #content>
         <div class="row mt-5">
      
         <div class="col-12 col-md-6 mt-2">
          <TopSites :zoneAlarms="{
                alarms: cairoNorthSitesReportedHTAlarms,
                alarmsName: 'sitesReportedHTAlarms',
              }"  @siteCode=" getSiteCode">
            <template #header> Sites Reported HT Alarms </template>
            <template #columns>
              <Column field="siteName" header="Name"></Column>
              <Column field="count" header="Count" sortable></Column>
              <Column field="highest_duration" header="Highest Dur" sortable=""></Column>
            </template>
          </TopSites>
        </div>
         <div class="col-12 col-md-6 mt-2">
          <TopSites :zoneAlarms="{
                alarms: cairoNorthSitesReportedGenAlarms,
                alarmsName: 'sitesReportedGenAlarms',
              }"  @siteCode=" getSiteCode">
            <template #header> Sites Reported Gen Alarms </template>
            <template #columns>
              <Column field="siteName" header="Name"></Column>
              <Column field="count" header="Count" sortable></Column>
              <Column field="highest_duration" header="Highest Dur" sortable></Column>
            </template>
          </TopSites>
        </div>
         <div class="col-12 mt-2">
            <template v-if="countHTAlarms">
              <Button
                type="button"
                class="p-button-help"
                @click="downloadHTSites()"
              >
                <span class="material-symbols-sharp">download</span>
                <span class="font-bold">HT Sites</span>
              </Button>
            </template>
          </div>
          <zoneSitesReportedDownAlarms zone="Cairo North" :week="period_No" :year="year"></zoneSitesReportedDownAlarms>
          <zoneDownSitesAfterPowerAlarm zone="Cairo North" :week="period_No" :year="year"></zoneDownSitesAfterPowerAlarm>
          <zoneSitesDownWithoutPowerAlarms zone="Cairo North" :week="period_No" :year="year"></zoneSitesDownWithoutPowerAlarms>
      </div>

      </template>
     
    </Card>
  </div>
 
</template>

<script>
import TopSites from "../energySheet/TopSites.vue";
import EnergyHelperFunctions from "./EnergyHelperFunctions";
import SiteAlarmsTable from "../../helpers/Sites/SiteAlarmsTable.vue";
import zoneSitesReportedDownAlarms from "../../helpers/Energy/zoneSitesReportedDownAlarms.vue";
import zoneDownSitesAfterPowerAlarm from "../../helpers/Energy/zoneDownSitesAfterPowerAlarm.vue";
import zoneSitesDownWithoutPowerAlarms from"../../helpers/Energy/zoneSitesDownWithoutPowerAlarms.vue";
export default {
  data() {
    return {
      selectedSiteCode: null,
      alarmsName: null,
   
     
       countHTAlarms:false,
    
    };
  },
  components:{
    TopSites,
    SiteAlarmsTable,
    zoneSitesReportedDownAlarms,
    zoneDownSitesAfterPowerAlarm,
    zoneSitesDownWithoutPowerAlarms,

  },
  //  watch:{
  //   siteAlarms(value){
  //      if (value) {
  //       this.$dialog.open(SiteAlarmsTable, {
  //         props: {
  //           style: {
  //             width: "75vw",
  //           },
  //           breakpoints: {
  //             "960px": "75vw",
  //             "640px": "90vw",
  //           },
  //           modal: true,
  //         },

  //         onClose: (options) => {
  //           this.$store.dispatch("siteAlarms", null);
  //         },
  //       });
  //     }

  //   },

  // },
  // computed:{

  //   siteAlarms(){

  //     if(this.$store.state.siteAlarms)
  //     {
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }

  //   },



  // },
   beforeUpdate(){
    if(this.cairoNorthSitesReportedHTAlarms!=null &&this.cairoNorthSitesReportedHTAlarms.length>0)
    this.countHTAlarms=true;

  },
  props: [
  "cairoNorthSitesReportedHTAlarms",
  "cairoNorthSitesReportedGenAlarms",
  "period_No",
  "period",
  "zone",
  "year"],
  methods:{
     getSiteCode(event) {
   
      this.selectedSiteCode = event.siteCode;
      this.alarmsName = event.alarmsName;
    
     
      if (this.alarmsName == "sitesReportedHTAlarmsDetails") {
        EnergyHelperFunctions.getSiteHighTempAlarms(this.selectedSiteCode);
      } else if (this.alarmsName == "sitesReportedGenAlarmsDetails") {
         EnergyHelperFunctions.getSiteGenAlarms(this.selectedSiteCode);
      }
    },
     downloadHTSites() {
      EnergyHelperFunctions.downloadZoneHTSites(this.zone,this.period,this.period_No);
      
    },
   
  },
    

  

};
</script>

<style lang="scss" scoped>
</style>