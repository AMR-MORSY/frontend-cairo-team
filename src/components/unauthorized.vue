<template>
  <div class="cont">
    <div class="lock"></div>
    <div class="message">
      <h3 class="text-center">Access to this page is restricted</h3>
      <p class="text-center" style="color: black;">Please check with the site admin if you believe this is a mistake.</p>
     <h3 type="button" style="display: block; color: red;text-align: center; text-decoration:underline; padding-top: 3rem;"  @click="$router.go(-`${path}`)">Go back</h3>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "unauthorized",
  props:["path"],
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato');

$animationTime: 2s;

* {
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

.cont {
  height: 100vh;
  max-width: 400px;
 
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

h1 {
  margin: 40px 0 20px;
}

.lock {
  border-radius: 5px;
  width: 55px;
  height: 45px;
  background-color: #333;
  animation: dip 1s;
  animation-delay: ($animationTime - .5);

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-left: 5px solid #333;
    height: 20px;
    width: 15px;
    left: calc(50% - 12.5px);
  }

  &::before {
    top: -30px;
    border: 5px solid #333;
    border-bottom-color: transparent;
    border-radius: 15px 15px 0 0;
    height: 30px;
    animation: lock $animationTime, spin $animationTime;
  }

  &::after {
    top: -10px;
    border-right: 5px solid transparent;
    animation: spin $animationTime;
  }
}

@keyframes lock {
  0% {
    top: -45px;
  }

  65% {
    top: -45px;
  }

  100% {
    top: -30px;
  }
}

@keyframes spin {
  0% {
    transform: scaleX(-1);
    left: calc(50% - 30px);
  }

  65% {
    transform: scaleX(1);
    left: calc(50% - 12.5px);
  }
}

@keyframes dip {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>