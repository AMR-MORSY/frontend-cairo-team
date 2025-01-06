<template>
  <div class=" w-screen-2xl px-10 py-20" v-if="isNURAvailable">


    <Card class=" max-w-screen-xl mx-auto">
      <template #header>

        <div class="title">
          <p>Week:{{ week }}</p>
        </div>
      </template>
      <template #content>
        <div class="flex items-center">
          <Button label="FM" severity="danger" @click="goToFM()"
            class=" block text-lg font-Signika text-white rounded" />
        </div>


        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-3 lg:col-span-1 mt-5">
            <Card>

              <template #content>
                <!-- <Chart type="bar" :data="zones2GNUR" :options="lightOptions" :plugins="plugins" /> -->
                <BarChart :chartDataSets="zones2GNUR" chartTitle="Zone 2G NUR" chartId="NUR2G" />
              </template>
              <template #footer>
                <p>Cairo 2G NUR={{ cairo2GNUR }}</p>
              </template>
            </Card>
          </div>
          <div class="col-span-3 lg:col-span-1 mt-5">
            <Card>

              <template #content>
                <BarChart :chartDataSets="zones3GNUR" chartTitle="Zone 3G NUR" chartId="NUR3G" />

              </template>
              <template #footer>
                <p>Cairo 3G NUR={{ cairo3GNUR }}</p>
              </template>
            </Card>
          </div>
          <div class="col-span-3 lg:col-span-1 mt-5">
            <Card>

              <template #content>
                <BarChart :chartDataSets="zones4GNUR" chartTitle="Zone 4G NUR" chartId="NUR4G" />
              </template>
              <template #footer>
                <p>Cairo 4G NUR={{ cairo4GNUR }}</p>
              </template>
            </Card>
          </div>

        </div>

      </template>


    </Card>
    <Card class=" max-w-screen-xl mx-auto mt-5">
      <template #content>

        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-3  lg:col-span-1 mt-5">
            <Card>
              <template #title>

                <div style="display: flex;align-items: center;justify-content: center;">
                  <div class="w-1/2" style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        ">
                    <img src="../../logos/week-icon.aba4072e.svg" @click="getCairoNUR_CYearlyAnalysis"
                      style="cursor: pointer" alt="" class="w-1/4" v-tooltip.right="'Weekly Analysis'" />
                  </div>
                </div>
              </template>
              <template #content>
                <BarChart :chartDataSets="zonesCombinedNUR" chartTitle="Cairo Combined NUR" chartId="NURcombined" />

              </template>
            </Card>
          </div>
          <div class="col-span-3  lg:col-span-2 mt-5">
            <Card>

              <template #content>
                <BarChart :chartDataSets="cairoSubsystem" chartTitle="Cairo Subsystem" chartId="cairoSubsys" />

              </template>
            </Card>
          </div>
          <div class="col-span-3   mt-5">
            <Card>

              <template #content>
                <BarChart :chartDataSets="cairoTopRepeated" chartTitle="Cairo Top Repeated Sites"
                  chartId="cairoTopRepeated" />

              </template>
            </Card>
            <Card class=" mt-3">

              <template #content>
                <BarChart :chartDataSets="officesNUR" chartTitle="Offices"
                  chartId="cairoOffices" />

              </template>
            </Card>
          </div>
          <!-- <div class="col-span-3  lg:col-span-1 mt-5">
            <Card>
              
              <template #content>
                <BarChart :chartDataSets="zonesResponseWithAccess" chartTitle="Response with Access"/>
              
              </template>
            </Card>
          </div>
          <div class="col-span-3  lg:col-span-1 mt-5">
            <Card>
             
              <template #content>
                <BarChart :chartDataSets="zonesResponseWithoutAccess" chartTitle="Response W.O Access"/>
            
              </template>
            </Card>
          </div>  -->

        </div>
        <Card class="mt-5">
          <template #content>
            <div class="grid grid-cols-5 gap-4">
              <div class="col-span-5 md:col-span-1">
                <div class="transmission w-100" style="cursor: pointer" @click="getCairoMWWeeklyNUR">
                  <img
                    src="../../logos/favpng_falesia-systems-sp-o-o-microwave-transmission-mini-link-rectifier-xpic.png"
                    alt="" class="w-1/2 mx-auto block" />
                </div>
              </div>
              <div class="col-span-5 md:col-span-1">
                <div class="gen w-100" style="cursor: pointer" @click="getCairoGenWeeklyNUR">
                  <img src="../../logos/33kva-cat-silent-diesel-generator-cat-de33gc.jpg" alt=""
                    class="w-1/2 mx-auto block" />
                </div>
              </div>
              <div class="col-span-5 md:col-span-1">
                <div class="BTS w-100" style="cursor: pointer" @click="getCairoNodeBWeeklyNUR">
                  <img src="../../logos/Nortel-GSM-800012000.jpg" alt="" class="w-1/2 mx-auto block" />
                </div>
              </div>

              <div class="col-span-5 md:col-span-1">
                <div class="power w-100" style="cursor: pointer" @click="getCairoPowerWeeklyNUR">
                  <img src="../../logos/power-plant-icon.svg" alt="" class="w-1/2 mx-auto block" />
                </div>
              </div>
              <div class="col-span-5 md:col-span-1">
                <div class="modifications w-75" style="cursor: pointer" @click="getCairoModificationWeeklyNUR">
                  <img src="../../logos/clipart3239793.png" alt="" class="w-1/2 mx-auto block" />
                </div>
              </div>
            </div>

          </template>
        </Card>
      </template>
    </Card>

    <CairoSouth :cairoSouthTopNUR="cairoSouthTopNUR" :cairoSouthRepeatedSites="cairoSouthRepeatedSites"
      :cairoSouthGen="cairoSouthGen" :cairoSouthSubsystem="cairoSouthSubsystem"
      :cairoSouthSubsystemCount="cairoSouthSubsystemCount" :cairoSouthAccessStatesitcs="cairoSouthAccessStatesitcs"
      :week="week" :year="year" />
    <CairoEast :cairoEastTopNUR="cairoEastTopNUR" :cairoEastRepeatedSites="cairoEastRepeatedSites"
      :cairoEastGen="cairoEastGen" :cairoEastSubsystem="cairoEastSubsystem"
      :cairoEastSubsystemCount="cairoEastSubsystemCount" :cairoEastAccessStatesitcs="cairoEastAccessStatesitcs"
      :week="week" :year="year" />
    <CairoNorth :cairoNorthTopNUR="cairoNorthTopNUR" :cairoNorthRepeatedSites="cairoNorthRepeatedSites"
      :cairoNorthGen="cairoNorthGen" :cairoNorthSubsystem="cairoNorthSubsystem"
      :cairoNorthSubsystemCount="cairoNorthSubsystemCount" :cairoNorthAccessStatesitcs="cairoNorthAccessStatesitcs"
      :week="week" :year="year" />
    <Giza :gizaTopNUR="gizaTopNUR" :gizaRepeatedSites="gizaRepeatedSites" :gizaGen="gizaGen"
      :gizaSubsystem="gizaSubsystem" :gizaSubsystemCount="gizaSubsystemCount"
      :gizaAccessStatesitcs="gizaAccessStatesitcs" :week="week" :year="year" />
  </div>

</template>

<script>
import NodePowerModification from "../../helpers/Nur/NodePowerModification.vue";
import NUR from "../../../apis/NUR";
import TopSites from "./TopSites.vue";
import siteNURTable from "./siteNURTable.vue";
import CairoSouth from "./CairoSouth.vue";
import CairoEast from "./CairoEast.vue";
import CairoNorth from "./CairoNorth.vue";
import Giza from "./Giza.vue";
import CairoTX from "./CairoTX.vue";
import CairoYearlyAnalysis from "./CairoYearlyAnalysis.vue";
import CairoGen from "../NUR/CairoGen.vue";
import BarChart from "../../helpers/BarChart.vue";

export default {
  data() {
    return {

      notFoundErrors: [],
      isNURAvailable: false,
      zones2GNUR: null,
      zones3GNUR: null,
      zones4GNUR: null,
      zonesCombinedNUR: null,
      cairo3GNUR: null,
      cairo2GNUR: null,
      cairo4GNUR: null,
      cairoCombinedNUR: null,
      cairoSubsystem: null,
      officesNUR: null,
      cairoTopRepeated: null,
      cairoSouthSubsystem: null,
      cairoSouthSubsystemCount: null,
      cairoEastSubsystem: null,
      cairoEastSubsystemCount: null,
      cairoNorthSubsystem: null,
      cairoNorthSubsystemCount: null,
      gizaSubsystem: null,
      gizaSubsystemCount: null,
      zonesResponseWithAccess: null,
      zonesResponseWithoutAccess: null,

      cairoSouthGen: null,
      cairoEastGen: null,
      cairoNorthGen: null,
      gizaGen: null,
      cairoSouthTopNUR: null,
      cairoEastTopNUR: null,
      cairoNorthTopNUR: null,
      gizaTopNUR: null,
      cairoSouthRepeatedSites: null,
      gizaRepeatedSites: null,
      cairoNorthRepeatedSites: null,
      cairoEastRepeatedSites: null,
      cairoSouthAccessStatesitcs: null,
      cairoEastAccessStatesitcs: null,
      cairoNorthAccessStatesitcs: null,
      gizaAccessStatesitcs: null,
    };
  },
  name: "NURStatestics",
  beforeMount() {
    this.getNUR();
  },
  props: ["week", "year"],

  watch: {
    week() {
      this.getNUR();
    },
  },
  computed: {

    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  components: {
    TopSites,
    siteNURTable,
    CairoSouth,
    CairoEast,
    CairoNorth,
    Giza,
    CairoTX,
    CairoYearlyAnalysis,
    CairoGen,

    BarChart,
    NodePowerModification
  },

  methods: {
    Responses(zoneExceed, zoneWith) {
      let exceed = [];
      let withinSLA = [];
      zoneExceed.forEach((element) => {
        exceed.push(element);
      });

      zoneWith.forEach((element) => {
        withinSLA.push(element);
      });
      let response = {
        exceed: exceed,
        withinSLA: withinSLA,
      };
      return response;
    },
    setCairoTopRepeatedChart(cairoSubsystems) {
      const documentStyle = getComputedStyle(document.documentElement);
      let NUR_tickets = Object.values(cairoSubsystems)
      let currentWeek = [];
      let pastWeek = [];
      let currentWeekLabel = "";
      let pastWeekLabel = "";

      NUR_tickets.forEach((element) => {

        currentWeekLabel = Object.keys(element)[1];
        pastWeekLabel = Object.keys(element)[0];


        currentWeek.push(Object.values(element)[1])
        pastWeek.push(Object.values(element)[0])


      })
      return {
        labels: Object.keys(cairoSubsystems),

        datasets: [
          {
            label: currentWeekLabel,
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            data: currentWeek,

          },
          {
            label: pastWeekLabel,

            data: pastWeek,
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),

          },
        ],

      }



    },
    setCairoSubsystemChart(cairoSubsystems) {
      const documentStyle = getComputedStyle(document.documentElement);
      let NUR_tickets = Object.values(cairoSubsystems)
      let NUR = [];
      let tickets = [];
      let Dur=[];
      NUR_tickets.forEach((element) => {

        NUR.push(element.NUR)
        tickets.push(element.countTick)
        Dur.push(element.Avg_Dur)


      })
      return {
        labels: Object.keys(cairoSubsystems),

        datasets: [
          {
            label: "NUR",
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            data: NUR,

          },
          {
            label: "Tickets",

            data: tickets,
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),

          },
          {
            label: "Avg.Dur.Min",

            data: Dur,
            backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
            borderColor: documentStyle.getPropertyValue('--p-green-500'),

          },
        ],

      }



    },
    setZoneNURChart(zoneNUR, zoneTickets) {
      const documentStyle = getComputedStyle(document.documentElement);
      return {
        labels: Object.keys(zoneNUR),

        datasets: [
          {
            label: "2G NUR",

            data: Object.values(zoneNUR),
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),

          },
          {
            label: "No.tickets",

            data: Object.values(zoneTickets),
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),

          },
        ],
      };

    },
    goToFM() {
      this.$router.push({ path: `/FM/statestics/${this.week}/${this.year}` })

    },
    getNUR() {
      const documentStyle = getComputedStyle(document.documentElement);
      let data = {
        week: this.week,

        year: this.year,
        NUR_Type: "NUR"
      };

      NUR.getNur(data)

        .then((response) => {
          console.log(response)

          if (response.data.errors) {
            this.notFoundErrors = response.data.errors;
            this.$confirm.require({

              group: 'info',
              message: this.notFoundErrors.toString(),
              header: "Confirmation",
              icon: "pi pi-exclamation-triangle",

              acceptProps: {
                severity: 'danger',
                icon: 'pi pi-check',
                size: 'small',
                label: "OK"
              },
              accept: () => {
                this.$router.go(-1);


              },


            })


          }
          else {
            let NUR = response.data.NUR;
            this.isNURAvailable = true;
            this.zones2GNUR = this.setZoneNURChart(NUR.NUR2G.zonesNUR2G, NUR.NUR2G.zonesTotalNumTickets)

            this.cairo2GNUR = NUR.NUR2G.cairoNUR2G;
            this.zones3GNUR = this.setZoneNURChart(NUR.NUR3G.zonesNUR3G, NUR.NUR3G.zonesTotalNumTickets)

            this.cairo3GNUR = NUR.NUR3G.cairoNUR3G;

            this.zones4GNUR = this.setZoneNURChart(NUR.NUR4G.zonesNUR4G, NUR.NUR4G.zonesTotalNumTickets)

            this.cairo4GNUR = NUR.NUR4G.cairoNUR4G;
            this.zonesCombinedNUR = {
              labels: Object.keys(NUR.combined),

              datasets: [
                {
                  label: "Combined NUR",
                  backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                  borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                  data: Object.values(NUR.combined),

                },
              ],
            };
            this.cairoCombinedNUR = NUR.combined.cairo;
            this.cairoSubsystem = this.setCairoSubsystemChart(NUR.cairoSubsystem)
            this.cairoTopRepeated = this.setCairoTopRepeatedChart(NUR.cairoTopRepeated)
            this.officesNUR = this.setCairoSubsystemChart(NUR.officesNUR)

            // let zoneExceed = [
            //   NUR.zonesResponseWithAccess["CAIRO EAST"].exceedSLA,
            //   NUR.zonesResponseWithAccess["CAIRO SOUTH"].exceedSLA,
            //   NUR.zonesResponseWithAccess["CAIRO NORTH"].exceedSLA,
            //   NUR.zonesResponseWithAccess["GIZA"].exceedSLA,
            // ];
            // let zoneWith = [
            //   NUR.zonesResponseWithAccess["CAIRO EAST"].withinSLA,
            //   NUR.zonesResponseWithAccess["CAIRO SOUTH"].withinSLA,

            //   NUR.zonesResponseWithAccess["CAIRO NORTH"].withinSLA,

            //   NUR.zonesResponseWithAccess["GIZA"].withinSLA,
            // ];
            // let resp = this.Responses(zoneExceed, zoneWith);

            // this.zonesResponseWithAccess = {
            //   labels: Object.keys(NUR.zonesResponseWithoutAccess),
            //   datasets: [
            //     {
            //       data: resp.exceed,
            //       label: "exceed SLA",
            //       backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            //       borderColor: documentStyle.getPropertyValue('--p-cyan-500'),

            //     },
            //     {
            //       data: resp.withinSLA,
            //       label: "within SLA",
            //       backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            //       borderColor: documentStyle.getPropertyValue('--p-gray-500'),


            //     },
            //   ],
            // };

            // zoneExceed = [
            //   NUR.zonesResponseWithoutAccess["CAIRO EAST"].exceedSLA,
            //   NUR.zonesResponseWithoutAccess["CAIRO SOUTH"].exceedSLA,
            //   NUR.zonesResponseWithoutAccess["CAIRO NORTH"].exceedSLA,
            //   NUR.zonesResponseWithoutAccess["GIZA"].exceedSLA,
            // ];
            // zoneWith = [
            //   NUR.zonesResponseWithoutAccess["CAIRO EAST"].withinSLA,
            //   NUR.zonesResponseWithoutAccess["CAIRO SOUTH"].withinSLA,

            //   NUR.zonesResponseWithoutAccess["CAIRO NORTH"].withinSLA,

            //   NUR.zonesResponseWithoutAccess["GIZA"].withinSLA,
            // ];
            // resp = this.Responses(zoneExceed, zoneWith);

            // this.zonesResponseWithoutAccess = {
            //   labels: Object.keys(NUR.zonesResponseWithAccess),
            //   datasets: [
            //     {
            //       data: resp.exceed,
            //       label: "exceed SLA",
            //       backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            //       borderColor: documentStyle.getPropertyValue('--p-cyan-500'),

            //     },
            //     {
            //       data: resp.withinSLA,
            //       label: "within SLA",
            //       backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            //       borderColor: documentStyle.getPropertyValue('--p-gray-500'),

            //     },
            //   ],
            // };

            this.cairoSouthSubsystem = NUR.zonesSubsystem["CAIRO SOUTH"];
            this.cairoSouthSubsystemCount = NUR.zonesSubsystemCountTickts["CAIRO SOUTH"];
            this.cairoEastSubsystem = NUR.zonesSubsystem["CAIRO EAST"];
            this.cairoEastSubsystemCount = NUR.zonesSubsystemCountTickts["CAIRO EAST"];
            this.cairoNorthSubsystem = NUR.zonesSubsystem["CAIRO NORTH"];
            this.cairoNorthSubsystemCount = NUR.zonesSubsystemCountTickts["CAIRO NORTH"];
            this.gizaSubsystem = NUR.zonesSubsystem["GIZA"];
            this.gizaSubsystemCount = NUR.zonesSubsystemCountTickts["GIZA"];

            this.cairoSouthGen = NUR.zonesGeneratorStatestics["CAIRO SOUTH"];
            this.cairoEastGen = NUR.zonesGeneratorStatestics["CAIRO EAST"];
            this.cairoNorthGen = NUR.zonesGeneratorStatestics["CAIRO NORTH"];
            this.gizaGen = NUR.zonesGeneratorStatestics["GIZA"];

            this.cairoSouthTopNUR = Object.values(NUR.topNUR["CAIRO SOUTH"]);
            this.cairoEastTopNUR = Object.values(NUR.topNUR["CAIRO EAST"]);
            this.cairoNorthTopNUR = Object.values(NUR.topNUR["CAIRO NORTH"]);
            this.gizaTopNUR = Object.values(NUR.topNUR["GIZA"]);

            this.cairoSouthRepeatedSites = Object.values(
              NUR.topRepeated["CAIRO SOUTH"]
            );
            this.cairoEastRepeatedSites = Object.values(
              NUR.topRepeated["CAIRO EAST"]
            );
            this.cairoNorthRepeatedSites = Object.values(
              NUR.topRepeated["CAIRO NORTH"]
            );
            this.gizaRepeatedSites = Object.values(NUR.topRepeated["GIZA"]);

            // this.cairoSouthAccessStatesitcs = {
            //   totalTickets: NUR.NUR3G.zonesTotalNumTickets["CAIRO SOUTH"],
            //   accessTickets:
            //     NUR.NUR3G.zonesNUR3GAccessCountTickets["CAIRO SOUTH"].access,
            //   NUR: NUR.NUR3G.zonesNUR3GAccessNUR["CAIRO SOUTH"].access,
            // };
            // this.cairoNorthAccessStatesitcs = {
            //   totalTickets: NUR.NUR3G.zonesTotalNumTickets["CAIRO NORTH"],
            //   accessTickets:
            //     NUR.NUR3G.zonesNUR3GAccessCountTickets["CAIRO NORTH"].access,
            //   NUR: NUR.NUR3G.zonesNUR3GAccessNUR["CAIRO NORTH"].access,
            // };
            // this.cairoEastAccessStatesitcs = {
            //   totalTickets: NUR.NUR3G.zonesTotalNumTickets["CAIRO EAST"],
            //   accessTickets:
            //     NUR.NUR3G.zonesNUR3GAccessCountTickets["CAIRO EAST"].access,
            //   NUR: NUR.NUR3G.zonesNUR3GAccessNUR["CAIRO EAST"].access,
            // };
            // this.gizaAccessStatesitcs = {
            //   totalTickets: NUR.NUR3G.zonesTotalNumTickets["GIZA"],
            //   accessTickets:
            //     NUR.NUR3G.zonesNUR3GAccessCountTickets["GIZA"].access,
            //   NUR: NUR.NUR3G.zonesNUR3GAccessNUR["GIZA"].access,
            // };

          }


        })
        .catch((error) => {

          this.isNURAvailable = false;
          if (error.response.status == 422) {
            let errors = error.response.data.errors;
            if (errors.week) {

              errors.week.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Error",
                  detail: element,
                  life: 3000
                })
              });
            }
            if (errors.month) {

              errors.month.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Error",
                  detail: element,
                  life: 3000
                })
              });
            }
            if (errors.year) {

              errors.year.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Error",
                  detail: element,
                  life: 3000
                })
              });
            }
          }
        })

    },
    getCairoMWWeeklyNUR() {

      NUR.getCairoMWWeeklyNUR(this.week, this.year).then((response) => {

        let siteData = [];
        let sites = response.data.sites;
        sites.forEach((site) => {
          siteData.push(site.site_data);
        });
        this.$dialog.open(CairoTX, {
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
            sites: siteData,
            tickets: response.data.tickets,
            statestics: response.data.statestics,
            title: "Cairo Tx"
          },
        });
      })

    },

    getCairoGenWeeklyNUR() {


      NUR.getCairoGenWeeklyNUR(this.week, this.year)

        .then((response) => {

          let siteData = [];
          let sites = response.data.sites;
          sites.forEach((site) => {
            siteData.push(site.site_data);
          });
          this.$dialog.open(CairoGen, {
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
              sites: siteData,
              tickets: response.data.tickets,
              statestics: response.data.statestics,
            },
          });
        })
        .catch((error) => {

        })

    },

    getCairoNUR_CYearlyAnalysis() {


      NUR.cairoNUR_CYearlyAnalysis(this.year)

        .then((response) => {
          let cairo = response.data.NUR_C_yearly.cairo;
          let zones = response.data.NUR_C_yearly.zones;
          this.$dialog.open(CairoYearlyAnalysis, {
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
              cairo: cairo,
              zones: zones,
            },
          });
          console.log(response);
        })

    },
    getCairoPowerWeeklyNUR() {

      NUR.getCairoPowerWeeklyNUR(this.week, this.year)

        .then((response) => {
          console.log(response);
          let siteData = [];
          let sites = response.data.sites;
          sites.forEach((site) => {
            siteData.push(site.site_data);
          });
          this.$dialog.open(NodePowerModification, {
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
              sites: siteData,
              tickets: response.data.tickets,
              statestics: response.data.statestics,
              title: "Cairo Main Power",
              chartID: "cairoMainPower"
            },
          });
        })

    },
    getCairoNodeBWeeklyNUR() {


      NUR.getCairoNodeBWeeklyNUR(this.week, this.year)

        .then((response) => {

          let siteData = [];
          let sites = response.data.sites;
          sites.forEach((site) => {
            siteData.push(site.site_data);
          });
          this.$dialog.open(NodePowerModification, {
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
              sites: siteData,
              tickets: response.data.tickets,
              statestics: response.data.statestics,
              title: "Cairo NodeB",
              chartID: "cairoNodeB"
            },
          });
        })

    },
    getCairoModificationWeeklyNUR() {


      NUR.getCairoModificationsBWeeklyNUR(this.week, this.year)

        .then((response) => {

          let siteData = [];
          let sites = response.data.sites;
          sites.forEach((site) => {
            siteData.push(site.site_data);
          });
          this.$dialog.open(NodePowerModification, {
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
              sites: siteData,
              tickets: response.data.tickets,
              statestics: response.data.statestics,
              title: "Cairo Modifications",
              chartID: "cairoModifications"
            },
          });
        })

    }
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  position: relative;

  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba($color: #ffff, $alpha: 0.7);
  }
}

.title {
  margin-top: 50px;
  width: 100%;

  p {
    width: 100%;
    text-align: center;
    font-weight: 500;
  }
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

.fade-bounce-enter-active {
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

.transmission,
.gen,
.BTS,
.modifications,
.power {
  position: relative;
  margin-bottom: 10px;
}

.modifications,
.power {
  padding-top: 10px;
  margin: auto;
}

.BTS::after {
  content: "Node";
}

.gen::after {
  content: "Generators";
}

.modifications::after {
  content: "Modifications";
}

.power::after {
  content: "Power";
}

.gen::after,
.transmission::after,
.BTS::after,
.modifications::after,
.power::after {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);

  font-weight: 700;

  color: black;
}

// .BTS::after{
//   left: 18px;
// }
.modifications::after,
.power::after {
  bottom: -20px;
  // left: -20px;
}

.transmission::after {
  content: "Transmission";
}
</style>