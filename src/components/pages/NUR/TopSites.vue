<template>
  <div>
    <Card>
      <template #title>
        <p style="font-size: 16px; padding: 0; text-align: center">
          <slot name="header"></slot>
        </p>
      </template>
      <template #content>
        <div class="table-container" v-tooltip.right="'Get Tickets'">
         
          <slot name="dataTable">
            <DataTable
              :value="zoneNUR"
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
import NUR from "../../../apis/NUR";

export default {
  data() {
    return {
      selectedSite: null,
    
    };
  },
  name: "TopSites",
  props: ["zoneNUR"],
  computed:{
      token() {
      return this.$store.getters.token;
    },
     isLogin()
    {
      return this.$store.getters.isLogin;
    }

  },
  methods: {
    onRowSelect() {
     

      let data = {
        site_code: this.selectedSite.siteCode,
      };
   
       NUR.getSiteNUR(data)
        .then((response) => {
        
          this.$emit("siteNUR",response.data)
        })
        .catch((error) => {
         
        })
    },
  },
};
</script>

<style lang="scss" scoped>

</style>