<template>
  <div class=" w-screen-2xl px-5 py-10 ">
    <div class="max-w-sm lg:max-w-screen-2xl mx-auto ">
      <TransitionGroup class="grid grid-cols-3 gap-4 px-5 mt-20" tag="div" name="cards" appear>
        <div class="col-span-3 lg:col-span-1  mt-5" v-for="card in cards" :key="card.id">
          <div class="card px-7" @click.self="formatElement(card.id)">
            <span class="material-symbols-rounded"> {{ card.icon }} </span>
            <p>{{ card.path }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
 
</template>

<script setup>
import Sites from '../../../apis/Sites';
import { useAbility } from '@casl/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const router = useRouter();

const { can } = useAbility();

const cards = ref();
onMounted(() => {

  cards.value = [
    // { id: 1, icon: "add_circle", path: "New sites" },
    // { id: 2, icon: "add_circle", path: "Cascades" },
    // { id: 3, icon: "add_circle", path: "Nodals" },
    { id: 4, icon: "add_circle", path: "New site" },
    { id: 5, icon: "download", path: "Cairo Sites" },
    { id: 6, icon: "download", path: "Download Nodals" },
  ];

})

const formatElement = (id) => {
  let card = cards.value.filter((element) => {
    return element.id == id;
  });

  if (card[0].path == "New sites" && can('insert_New_site')) {
    router.push("/sites/storeSites");
  }

  else if (card[0].path == "New site" && can('insert_New_site')) {


    router.push({ path: "/sites/storeSite" });
  }

  else if (card[0].path == "Cascades") {
    router.push("/sites/cascades");
  }

  else if (card[0].path == "Nodals") {
    router.push("/sites/nodals");
  }

  else if (card[0].path == "Cairo Sites" ) {
    Sites.downloadAll()
      .then((response) => {

        var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileUrl;
        fileLink.setAttribute("download", "AllSites.xlsx");
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch();

  }

  else if (card[0].path == "Download Nodals") {
    Sites.downloadNodals()
      .then((response) => {
        console.log(response);
        var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileUrl;
        fileLink.setAttribute(
          "download",
          `Nodals.xlsx`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch((error) => { });

  }
  else {
    toast.add({
      severity: 'error',
      summary: "Error",
      life: 5000,
      detail: "You do not have access to this resources"



    })

  }

}



</script>

<style lang="scss" scoped>
.card span {
  text-align: center;
  font-size: 5rem;
  z-index: 1;
  color: gray;
}

.card {
  background-color: white;

  height: 250px;
  width: 100%;
  transition: all 0.5s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 15px;


}

.card p {
  text-align: center;
  font-size: 2rem;
  color: gray;
}

.card:hover {
  transform: scale(1.02);
  transition: all 0.5s ease;
}

.cards-enter-from {
  opacity: 0;

  transform: scale(0.7);
}

.cards-enter-active {
  transition: all 1s ease;
}
</style>