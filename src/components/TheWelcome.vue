<template>

<nav class=" bg-purple-300 md:px-10 border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-4">
    <a  class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="./logos/icons8-cairo-85.png" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap font-Signika dark:text-white text-font-main-color">Cairo Team</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full bg-purple-300 md:block md:w-auto " id="navbar-default">
      <ul class="font-medium bg-purple-300 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <router-link v-if="isLogin" class="block py-2 px-3 font-Signika  bg-purple-300 rounded md:bg-transparent text-font-main-color md:p-0 dark:text-white md:dark:text-blue-500" to="/home" aria-current="page">Home</router-link>
       
        </li>
        <li>
          <router-link v-if="!isLogin"  class="block py-2 px-3 font-Signika bg-purple-300  text-font-main-color rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/user/login">Login</router-link>
        
        </li>
        <li>
          <router-link v-if="!isLogin"  class="block py-2 px-3 font-Signika bg-purple-300 text-font-main-color  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/user/register">Register</router-link>
        
        </li>
        
      </ul>
    </div>
  </div>
</nav>



  <div class=" max-w-full ">

    <div class=" grid grid-cols-2 gap-4 mx-auto w-11/12  ">
      <div class=" col-span-2 md:col-span-1 mt-2 flex flex-col justify-center pb-11">

        <div class="text-container  w-full flex flex-col items-center md:items-start text-font-main-color">
          <h2 class=" text-left font-Signika font-extrabold  w-full text-4xl">The Greatest Team Ever</h2>


          <div class="grid grid-cols-4 gap-x-4 mt-5  ">
        


            <div class=" item col-span-1" v-if="displayData">
              <div class="card rounded-md" style="background: transparent;">


                <h5 class=" text-xs font-bold mt-3" data-target="450" id="card-text1">
                  {{ nodals }}
                </h5>
                <p class=" text-xs font-bold">
                  Nodals</p>
              </div>
            </div>

            <div class=" item  col-span-1 " v-if="displayData">
              <div class=" card rounded-md " style="background: transparent;">

                <h5 class=" text-xs font-bold mt-3" data-target="25" id="card-text2">
                  {{ vip }}
                </h5>
                <p class="text-xs font-bold">
                  Vip</p>
              </div>

            </div>

            <div class=" item col-span-1" v-if="displayData">
              <div class="card  rounded-md" style="background: transparent;">



                <h5 class=" text-xs font-bold mt-3" data-target="550" id="card-text3">
                  {{ ldn }}

                </h5>
                <p class="text-xs font-bold">
                  LDN</p>
              </div>

            </div>

            <div class=" item col-span-1" v-if="displayData">
              <div class=" card rounded-md" style="background: transparent;">



                <h5 class=" text-xs font-bold mt-3" data-target="48" id="card-text4">
                  {{ vipNDL }}
                </h5>
                <p class="text-xs font-bold">
                  VIP+NDL</p>
              </div>

            </div>

          </div>





        </div>

      </div>
      <div class=" col-span-2 md:col-span-1 mt-2">
        <div class="image-container">
          <img style="width: 100%;" src="../components/logos/header-image-2x-8fa7b8.webp" alt="">

        </div>


      </div>

    </div>




  </div>
</template>

<script>
import Sites from "../apis/Sites";
import { initFlowbite } from 'flowbite'
export default {
  data() {


    return {
      nodals: 0,
      maxNodals: null,
      vip: 0,
      maxVip: null,
      ldn: 0,
      maxLDN: null,
      vipNDL: 0,
      maxVIPNDL: null,
      displayData: false,
      displaySpinner: true,
    };
  },
  name: "TheWelcome",
  computed: {
    isLogin() {

      return this.$store.getters.isLogin

    },

  },
  mounted() {
    initFlowbite();
    this.getData();

  },

  methods: {
    mountData(counter, target, data) {

      let works = setInterval(() => {

        if (data == "nodals") {
          if (counter < target) {
            counter++;
            this.nodals = counter;

          }


          else {
            clearInterval(works);
          }

        }
        else if (data == "vip") {
          if (counter < target) {
            counter++;
            this.vip = counter;


          }
          else {
            clearInterval(works);

          }
        }
        else if (data == "total_sites") {
          if (counter < target) {
            counter++;
            this.vipNDL = counter;

          }
          else {
            clearInterval(works);

          }
        }
        else if (data == "LDN") {
          if (counter < target) {
            counter++;
            this.ldn = counter;

          }
          else {
            clearInterval(works);

          }
        }

      }, 0.5);


    },





    getData() {


      Sites.index().then((response) => {
      
        this.maxVIPNDL = response.data.statestics.VIP_NDL;
        this.maxNodals = response.data.statestics.NDL;
        this.maxLDN = response.data.statestics.LDN;
        this.maxVip = response.data.statestics.VIP;

        this.mountData(this.nodals, this.maxNodals, "nodals");
        this.mountData(this.vipNDL, this.maxVIPNDL, "total_sites");
        this.mountData(this.vip, this.maxVip, "vip");
        this.mountData(this.ldn, this.maxLDN, "LDN");






      }).catch((error) => {

      }).finally(() => {
        this.displaySpinner = false;
        this.displayData = true;


      });

    }

  },
}
</script>

<style  scoped>
.text-container,
.image-container {

  margin-top: 6rem;





}
/* 
.text-container{
   max-width: 500px; 

   width: 100%;
   padding-left: 2rem; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  
}  */

.me-auto {
  margin-left: auto !important;
}

.navbar-brand {
  color: #673EE6 !important;
  font-weight: bolder;
  font-size: 2rem;
}

.nav-link {
  color: #673EE6 !important;
  font-weight: bolder;

}

.navbar-collapse {

  flex-grow: unset !important;

}


.card {
  height: 60px;
  width: 60px;
  border: 2px #673EE6 solid;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>