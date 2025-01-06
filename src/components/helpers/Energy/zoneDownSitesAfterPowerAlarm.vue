<template>
    <a @click.prevent="getZoneDownSitesAfterPowerAlarm">Down Sites After Power Alarm</a>
  </template>
  
  <script>
  import Energy from '../../../apis/Energy';
  import zoneDownSitesAfterPowerTable from "../../helpers/Energy/zoneDownSitesAfterPowerTable.vue";
  export default {
  
    data() {
      return {
  
      };
  
    },
    components:{zoneDownSitesAfterPowerTable},
    name: "zoneDownSitesAfterPowerAlarm",
    props: ["zone", "week", "year"],
  
    methods: {
        getZoneDownSitesAfterPowerAlarm() {
       
        let data = {
          zone: this.zone,
          week: this.week,
          year: this.year
        }
        Energy.getZoneDownSitesAfterPowerAlarm(data).then((response) => {
          console.log(response)
          this.$dialog.open(zoneDownSitesAfterPowerTable, {
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
                sites: response.data.sites,
              
               
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