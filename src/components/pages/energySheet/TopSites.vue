<template>
  <div>
    <Card>
      <template #title>
        <p style="font-size: 16px; pading: 0; text-align: center">
          <slot name="header"></slot>
        </p>
      </template>
      <template #content>
        <div class="table-container" v-tooltip.right="'Get Tickets'">
        
          <slot name="dataTable">
            <DataTable
              :value="zoneAlarms.alarms"
              responsiveLayout="scroll"
              class="p-datatable-sm"
              stripedRows
              :paginator="true"
              :rows="5"
              v-model:selection="selectedSite"
              selectionMode="single"
              dataKey="siteCode"
              @row-select="onRowSelect"
            >
              <Column selectionMode="single"></Column>
              <slot name="columns"> </slot>
            </DataTable>
          </slot>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSite: null,
  
    };
  },
  name: "TopSites",
  props: ["zoneAlarms"],
 
   methods: {
    onRowSelect() {

      this.$emit("siteCode",{siteCode:this.selectedSite.siteCode,alarmsName:this.zoneAlarms.alarmsName})

     
    },
  },
};
</script>

<style lang="scss" scoped>

</style>