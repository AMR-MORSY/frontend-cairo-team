<template>
    <div class="toast-container" :class="{ 'display_none': !showToast,'display_flex':showToast }">
        <div id="liveToast" class="toast " role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header ">

                <strong class="me-auto">Unauthenticated</strong>


                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                <strong>Session time out......!</strong>
               
            </div>
          
        </div>
    </div>
</template>

<script>



export default {

    data() {


        return {
          
        };
    },
    name: "UnauthenticatedToast",
    computed:{
        showToast(){
            return this.$store.getters.showUnauthenticatedToast

        }

    },
   
}
</script>

<style lang="scss" scoped>
.toast-container {

    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #000000, $alpha: 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;

}
.display_none{
  display: none;
 
}

.display_flex{
  display: flex;
}
</style>