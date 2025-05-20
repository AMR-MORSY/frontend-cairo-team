<template>
  <div class="py-36 px-2">
    <Card class="max-w-4xl mx-auto" v-if="notices.length > 0">
      <template #content>
        <DataTable
          :value="notices"
          responsiveLayout="scroll"
          v-model:selection="selectedNotice"
          :rowClass="rowClass"
          scrollable
          :paginator="true"
          :rows="5"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          class="text-sm"
          tableStyle="min-width: 50rem"
        >
          <Column selectionMode="single"></Column>
          <Column field="site.site_code" header="Site Code"></Column>
          <Column field="site.site_name" header="Site Name"></Column>
          <Column field="title" header="Title" sortable></Column>
          <Column field="type.name" header="Type"></Column>
          <Column field="is_solved" header="Solved" sortable></Column>
        </DataTable>
      </template>

      <template #footer>
        <div class="flex justify-center gap-4 flex-wrap">
          <Button
            label="View"
            raised
            severity="info"
            class="block"
            @click.prevent="goToSiteDetails"
          />
        </div>
      </template>
    </Card>
    <div class="no-notifications-container mt-20" v-else>
      <div class="no-notifications-icon">
        <i class="pi pi-bell" style="font-size: 2rem"></i>
        <!-- Alternative icons: far fa-bell, far fa-inbox -->
      </div>
      <h3 class="no-notifications-title">No notices yet</h3>
      <p class="no-notifications-message">
        When you have new notices, they'll appear here. Check back later or
        explore other sections.
      </p>
      <!-- <div class="flex justify-center gap-4">
      <a href="#" class="action-button" @click="goBack">Back</a>
      <a href="#" class="action-button" @click="createSiteNotice">Create New</a>
    </div> -->
    </div>
  </div>
</template>

<script setup>
import Sites from "../../../apis/Sites";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const notices = ref([]);
const selectedNotice = ref(null);
const router = useRouter();
const rowClass = (data) => {
  return [{ "!bg-red-100": data.is_solved === 0 }];
};
const getAllNotices = () => {
  Sites.allNotices()
    .then((response) => {
      notices.value = response.data.notices;
      console.log(response);
    })
    .catch((error) => console.log(error));
};

const goToSiteDetails = () => {
  if (selectedNotice.value) {
    router.push({ path: `/sites/details/${selectedNotice.value.site.site_code}` });
  }
};
onMounted(() => {
  getAllNotices();
});
</script>
