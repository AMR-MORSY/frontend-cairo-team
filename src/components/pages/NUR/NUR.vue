<template>
  <!-- <div class="  w-screen-2xl px-5 py-10  ">
    <div class="max-w-sm lg:max-w-screen-2xl mx-auto ">
      <TransitionGroup class="grid grid-cols-4 gap-4 px-5 mt-20" tag="div" name="cards" appear>
        <div class="col-span-4 lg:col-span-1 mt-5" v-for="card in cards" :key="card.id">
          <div class="card" @click.self="formatElement(card.id)">
            <span class="material-symbols-rounded"> {{ card.icon }} </span>
            <p>{{ card.path }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>

  </div> -->

  <TransitionCards :cards="cards" />
</template>

<script setup>
import TransitionCards from "../../helpers/TransitionCards.vue";
import { ref } from "vue";

const cards = ref([
  { id: 1, icon: "search", path: "Search" },
  { id: 2, icon: "add_circle", path: "2G" },
  { id: 3, icon: "add_circle", path: "3G" },
  { id: 4, icon: "add_circle", path: "4G" },
]);
</script>
<!-- 
<style scoped>
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
</style> -->
