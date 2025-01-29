<template>
  <div class="w-screen-2xl px-5 py-10">
    <div class="max-w-sm lg:max-w-screen-2xl mx-auto">
      <TransitionGroup
        class="grid grid-cols-4 gap-4 px-5 mt-20"
        tag="div"
        name="cards"
        appear
      >
        <div
          class="col-span-4 lg:col-span-1 mt-5"
          v-for="card in cards"
          :key="card.id"
        >
          <div class="card" @click.self="formatElement(card.id)">
            <span class="material-symbols-rounded"> {{ card.icon }} </span>
            <p>{{ card.path }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps(["cards"]);

const formatElement = (id) => {
  let card = props.cards.filter((element) => {
    return element.id == id;
  });
  console.log(card);
  if (card[0].path == "2G") {
    router.push("/nur/2G");
  } else if (card[0].path == "3G") {
    router.push("/nur/3G");
  } else if (card[0].path == "4G") {
    router.push("/nur/4G");
  } else if (card[0].path == "Search") {
    router.push("/nur/index");
  } else if (card[0].path == "Category") {
    router.push("/modifications/search/category");
  } else if (card[0].path == "Date") {
    router.push("/modifications/search/date");
  } else if (card[0].path == "Work Order") {
    router.push("/modifications/search/workorder");
  } else if (card[0].path == "Price List") {
    router.push("/modifications/search/pricelist");
  }
};
</script>

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
</style>
