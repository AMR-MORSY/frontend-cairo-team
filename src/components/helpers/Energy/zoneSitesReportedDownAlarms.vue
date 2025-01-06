<template>
  <a @click.prevent="getSitesReportedDownAlarms">Sites Reported Down Alarms</a>
</template>

<script>
import Energy from '../../../apis/Energy';
import zoneDownSitesTable from "../../helpers/Energy/zoneDownsitesTable.vue";
export default {

  data() {
    return {

    };

  },
  components:{zoneDownSitesTable},
  name: "zoneSitesReportedDownAlarms",
  props: ["zone", "week", "year"],

  methods: {
    getSitesReportedDownAlarms() {
  
      let data = {
        zone: this.zone,
        week: this.week,
        year: this.year
      }
      Energy.getSitesReportedDownAlarms(data).then((response) => {
        console.log(response)
        this.$dialog.open(zoneDownSitesTable, {
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
              down2G: response.data.sites.down2G,
              down3G:response.data.sites.down3G,
             
            },
          });
      }).catch((error) => {
        console.log(error);

      })
       
    }
  }


}



</script>

<style lang="scss" scoped>
a {
  font-size: 1rem;
  font-weight: 800;
  color: red !important;
  cursor: pointer;
}
</style>