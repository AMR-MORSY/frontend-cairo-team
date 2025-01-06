<template>
  <div id="cairo-and-zones" v-if="isAlarmsAvailable">
    <section id="cairo">
      <div class="container mt-5">
        <Card>
          <template #title>
            <div class="d-flex justify-content-center align-items-center">
              <p style="text-align: center">{{ period }} {{ period_No }}</p>
            </div>
          </template>
          <template #content>
            <div class="row mt-5">
              <div class="col-12 col-md-4">
                <Card>
                  <template #title>
                    <div class="d-flex justify-content-center align-items-center">
                      <p style="text-align: center">Power Alarms</p>
                    </div>
                  </template>
                  <template #content>
                    <Chart type="bar" :data="zonesPowerAlrarmsCount" :options="lightOptions" :plugins="plugins" />
                  </template>
                </Card>
              </div>
              <div class="col-12 col-md-4">
                <Card>
                  <template #title>
                    <div class="d-flex justify-content-center align-items-center">
                      <p style="text-align: center">HT Alarms</p>
                    </div>
                  </template>
                  <template #content>
                    <Chart type="bar" :data="zonesHTAlrarmsCount" :options="lightOptions" :plugins="plugins" />
                  </template>
                </Card>
              </div>
              <div class="col-12 col-md-4">
                <Card>
                  <template #title>
                    <div class="d-flex justify-content-center align-items-center">
                      <p style="text-align: center">Gen Alarms</p>
                    </div>
                  </template>
                  <template #content>
                    <Chart type="bar" :data="zonesGenAlrarmsCount" :options="lightOptions" :plugins="plugins" />
                  </template>
                </Card>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
    <section id="zones">
      <cairo-south-energy 
       
           :cairoSouthSitesReportedHTAlarms="cairoSouthSitesReportedHTAlarms
    " :cairoSouthSitesReportedGenAlarms="cairoSouthSitesReportedGenAlarms
    " :period="period" :period_No="period_No" zone="Cairo South" :year="year">
      </cairo-south-energy>
      <cairo-east-energy 
     
          :cairoEastSitesReportedHTAlarms="cairoEastSitesReportedHTAlarms
    " :cairoEastSitesReportedGenAlarms="cairoEastSitesReportedGenAlarms
    " :period="period" :period_No="period_No" zone="Cairo East" :year="year"></cairo-east-energy>
      <cairo-north-energy 
     
          :cairoNorthSitesReportedHTAlarms="cairoNorthSitesReportedHTAlarms
    " :cairoNorthSitesReportedGenAlarms="cairoNorthSitesReportedGenAlarms
    " :period="period" :period_No="period_No" :year="year" zone="Cairo North">
      </cairo-north-energy>
      <giza-energy 
     
        :gizaSitesReportedHTAlarms="gizaSitesReportedHTAlarms"
        :gizaSitesReportedGenAlarms="gizaSitesReportedGenAlarms" :period="period" :period_No="period_No"
        zone="Giza" :year="year"></giza-energy>
    </section>
  </div>

  <div v-if="!isAlarmsAvailable">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <transition name="fade" v-if="notFoundErrors" appear>
            <div class="errors card">
              <p v-for="error in notFoundErrors" :key="error">
                {{ error }}
              </p>
              <div>
                <Button label="Back" class="p-button-danger" @click="this.$router.go(-1)" />
              </div>
            </div>
          </transition>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Energy from "../../../apis/Energy";
import CairoEastEnergy from "../energySheet/CairoEastEnergy.vue";
import CairoNorthEnergy from "../energySheet/CairoNorthEnergy.vue";
import CairoSouthEnergy from "../energySheet/CairoSouthEnergy.vue";
import GizaEnergy from "../energySheet/GizaEnergy.vue";
import ChartDataLabels from "chartjs-plugin-datalabels";
export default {
  data() {
    return {
      isAlarmsAvailable: false,
      alarms: null,
      period: null,
      period_No: null,
     
    
      cairoEastSitesReportedHTAlarms: null,
      cairoNorthSitesReportedHTAlarms: null,
      cairoSouthSitesReportedHTAlarms: null,
      gizaSitesReportedHTAlarms: null,

      cairoEastSitesReportedGenAlarms: null,
      cairoNorthSitesReportedGenAlarms: null,
      cairoSouthSitesReportedGenAlarms: null,
      gizaSitesReportedGenAlarms: null,

      zonesPowerAlrarmsCount: null,
      lightOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
          datalabels: {
            anchor: "end",
          },
        },
      },
      plugins: [ChartDataLabels],

      zonesHTAlrarmsCount: null,
      zonesGenAlrarmsCount: null,
      notFoundErrors: null,
    };
  },
  name: "energyStatestics",
  props: ["week", "year"],

  components: {
    CairoEastEnergy,
    CairoNorthEnergy,
    CairoSouthEnergy,
    GizaEnergy,
  },
  watch: {
    week() {
      this.getEnergyStatestics();
    },
  },

  mounted() {
    this.getEnergyStatestics();
  },
  methods: {
    getEnergyStatestics() {
      this.$store.dispatch("displaySpinnerPage", false);
      let data = {
        week: this.week,

        year: this.year,
      };
      Energy.getEnergyStatestics(data)
        .then((response) => {
          console.log(response);
          this.isAlarmsAvailable = true;
          this.alarms = response.data.Alarms;
          this.period = this.alarms.period;
          this.period_No = this.alarms.period_No;
       
          ////////////Zones Sites reported HT Alarms ///////////

          if (this.alarms.zonesSitesReportedHTAlarms["Cairo North"]) {
            this.cairoNorthSitesReportedHTAlarms = Object.values(
              this.alarms.zonesSitesReportedHTAlarms["Cairo North"]
            );
          }
          if (this.alarms.zonesSitesReportedHTAlarms["Cairo East"]) {
            this.cairoEastSitesReportedHTAlarms = Object.values(
              this.alarms.zonesSitesReportedHTAlarms["Cairo East"]
            );
          }

          if (this.alarms.zonesSitesReportedHTAlarms["Cairo South"]) {
            this.cairoSouthSitesReportedHTAlarms = Object.values(
              this.alarms.zonesSitesReportedHTAlarms["Cairo South"]
            );
          }
          if (this.alarms.zonesSitesReportedHTAlarms["Giza"]) {
            this.gizaSitesReportedHTAlarms = Object.values(
              this.alarms.zonesSitesReportedHTAlarms["Giza"]
            );
          }

          //////////Zones Sites reported Gen Alarms ///////////
          if (this.alarms.zonesSitesReportedGenAlarms["Cairo North"]) {
            this.cairoNorthSitesReportedGenAlarms = Object.values(
              this.alarms.zonesSitesReportedGenAlarms["Cairo North"]
            );
          }

          if (this.alarms.zonesSitesReportedGenAlarms["Cairo East"]) {
            this.cairoEastSitesReportedGenAlarms = Object.values(
              this.alarms.zonesSitesReportedGenAlarms["Cairo East"]
            );
          }

          if (this.alarms.zonesSitesReportedGenAlarms["Cairo South"]) {
            this.cairoSouthSitesReportedGenAlarms = Object.values(
              this.alarms.zonesSitesReportedGenAlarms["Cairo South"]
            );
          }
          if (this.alarms.zonesSitesReportedGenAlarms["Giza"]) {
            this.gizaSitesReportedGenAlarms = Object.values(
              this.alarms.zonesSitesReportedGenAlarms["Giza"]
            );
          }

          /////////////Cairo zones Power Alarms Count//////////

          this.zonesPowerAlrarmsCount = {
            labels: Object.keys(this.alarms.zonesPowerAlarmsCount),

            datasets: [
              {
                label: "Count Power Alarms",
                backgroundColor: "#C3B1E1",
                data: Object.values(this.alarms.zonesPowerAlarmsCount),
                borderWidth: 1,
              },
              {
                label: "Sites reported Power Alarms",
                backgroundColor: "var(--purple-500)",
                data: Object.values(this.alarms.zonesSitesReportedPowerAlarms),
                borderWidth: 1,
              },
            ],
          };
          /////////////////////////Cairo Zones HT Alarms count///////////////////////

          this.zonesHTAlrarmsCount = {
            labels: Object.keys(this.alarms.zonesHTAlarmsCount),

            datasets: [
              {
                label: "Count HT Alarms",
                backgroundColor: "#C3B1E1",
                data: Object.values(this.alarms.zonesHTAlarmsCount),
                borderWidth: 1,
              },
              {
                label: "Sites reported HT Alarms",
                backgroundColor: "var(--purple-500)",
                data: Object.values(this.alarms.zonesNumberSitesReportedHTAlarms),
                borderWidth: 1,
              },
            ],
          };
          ////////////////////////Cairo Zones Gen Alarms count///////////////
          this.zonesGenAlrarmsCount = {
            labels: Object.keys(this.alarms.zonesGenAlarmsCount),

            datasets: [
              {
                label: "Count Gen Alarms",
                backgroundColor: "#C3B1E1",
                data: Object.values(this.alarms.zonesGenAlarmsCount),
                borderWidth: 1,
              },
              {
                label: "Sites reported Gen Alarms",
                backgroundColor: "var(--purple-500)",
                data: Object.values(this.alarms.zonesNumberSitesReportedGenAlarms),
                borderWidth: 1,
              },
            ],
          };
        })
        .catch((error) => {
          this.isAlarmsAvailable = false;
          if (error.response.status == 404) {
            this.notFoundErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.$store.dispatch("displaySpinnerPage", true);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#cairo {
  margin-top: 6em;
}

#zones {
  margin-bottom: 4em;
}

.errors {
  padding: 3rem;

  p {
    color: red;
    text-align: center;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.fade-enter-active {
  animation: woble 1s ease;
}

@keyframes woble {
  0% {
    opacity: 0;
    transform: translateY(-300px);
  }

  50% {
    opacity: 1;
    transform: translateY(0px);
  }

  60% {
    transform: translateY(16px);
  }

  70% {
    transform: translateY(-16px);
  }

  80% {
    transform: translateY(8px);
  }

  90% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>