<template>
  <a @click.prevent="getZoneSitesDownWithoutPowerAlarms">Down Sites Without Power Alarm</a>
</template>
  
<script>
import Energy from '../../../apis/Energy';
import zoneDownsitesTable from "../../helpers/Energy/zoneDownsitesTable.vue";
export default {

  data() {
    return {

    };

  },
  components: { zoneDownsitesTable },
  name: "zoneSitesDownWithoutPowerAlarms",
  props: ["zone", "week", "year"],

  methods: {
    getZoneSitesDownWithoutPowerAlarms() {
      this.$store.dispatch("displaySpinnerPage", false);
      let data = {
        zone: this.zone,
        week: this.week,
        year: this.year
      }
      Energy.getZoneSitesDownWithoutPowerAlarms(data).then((response) => {
        console.log(response)
        this.$dialog.open(zoneDownsitesTable, {
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
            down3G: response.data.sites.down3G,


          },
        });
      }).catch((error) => {
        console.log(error);

      })
        .finally(() => {
          this.$store.dispatch("displaySpinnerPage", true);
        });
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