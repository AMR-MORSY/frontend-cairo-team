<template>
  <section id="intro">

  </section>

  <div id="breif" class=" w-full overflow-y-hidden">


    <div class="grid grid-cols-2 gap-4 ">
      <div class=" col-span-2 md:col-span-1 pl-16 ">

        <div class="breif-container ">

          <Transition name="NUR" appear>
            <p class=" font-Signika text-font-main-color font-extrabold text-lg py-4 lg:py-8 lg:text-2xl">NUR Analysis
            </p>

          </Transition>
          <Transition name="Alarm" appear>
            <p class=" font-Signika text-font-main-color font-extrabold text-lg py-4 lg:py-8 lg:text-2xl">Zone Site
              Alarms Analysis</p>

          </Transition>
          <Transition name="dataBase" appear>
            <p class=" font-Signika text-font-main-color font-extrabold py-4 text-lg lg:py-8 lg:text-2xl">Sites
              Equipment Database</p>

          </Transition>



        </div>


      </div>

      <div class="col-span-2 flex justify-center md:col-span-1 pr-16 ">
        <div class="image-container ">
          <img src="../../src/components/logos/04.png" alt="">
        </div>

      </div>


    </div>


  </div>



</template>

<script>




export default {
  data() {
    return {
      cards: null,
    };
  },
  methods: {},
  name: "home",
}
</script>

<style scoped>
.NUR-enter-active {
  animation: transformx 1s ease;
}

.Alarm-enter-active {
  opacity: 0;
  animation: transformx 1s ease;
  animation-delay: 1s;
}

.dataBase-enter-active {
  opacity: 0;
  animation: transformx 1s ease;
  animation-delay: 2s;
}


@keyframes transformx {
  0% {
    transform: translateX(-100%);
    opacity: 0
  }

  100% {
    transform: translateX(0);
    opacity: 1
  }

}


#intro {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1)), url("../components/logos/GTR-North-Africa-2022-Cairo_2000x500.jpg");
  background-size: cover;
  position: relative;
  overflow: hidden;

  height: 50vh;



}

#breif {


  overflow-y: hidden;
  /* padding: 2rem 2rem; */
  background-color: white;
  /* height: 50vh; */


}

.breif-container {
  opacity: 0.5;



}

/* 
.breif-container p {
  font-size: 2rem;
  font-weight: 700;

/* } */

.image-container {

  width: 70%;

  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 3rem; */


}

img {
  width: 70%;
  transform: translateY(0);
  opacity: 0.5;
  animation: animation-translate 1s linear infinite alternate;
}

@keyframes animation-translate {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(1%);
  }
}
</style>